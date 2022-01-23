#!/usr/bin/env node

// Пример команды : reader 123123 -p C:\Users\hmzxp\Desktop\GitHub\node.js\lesson4 -t console.log



const fs = require("fs"); // File System
const path = require("path"); // Работа с путями
const inquirer = require("inquirer"); // Для предастовления выбора
const yargs = require("yargs"); // для работы с аргументами
const currentDirectory = process.cwd(); // актуальная директория

// если пользователь захочет - то сможет передать директорию через -p
const options = yargs
    .usage("Для передачи пути используйте: -p <path>, для передачи поиска ключевого слова: -t <text>")
    .option("t", { alias: 'text', describe: "ключевые слова", type: 'string', demandOption: false })
    .option("p", { alias: "path", describe: "Путь к файлу", type: "string", demandOption: false })
    .argv;

// для удобства
const optionsPath = options.path;
const optionsText = options.text;
const regExp = new RegExp(optionsText, 'g');

// Выбор нужно файла в cli
const promptFile = (optionsPath = currentDirectory) => {
    console.log(optionsPath);
    const list = fs.readdirSync(optionsPath); // список файлов в директории
    inquirer
        .prompt([{
            name: "fileName",
            type: "list",
            message: "Выберите файл:",
            choices: list,
        }])
        .then((answer) => {
            const filePath = path.join(optionsPath, answer.fileName);;
            // Проверка на файл
            const dirCheck = fs.lstatSync(`${optionsPath}/${answer.fileName}`).isFile();
            // Если это файл - то прочитает, если директория - то провалится
            if (dirCheck) {
                fs.readFile(filePath, "utf8", (err, data) => {
                    // для поиска ключевого слова
                    if (optionsText === undefined) {
                        console.log(data);
                    }
                    else if (regExp.test(data)) {
                        const items = data.matchAll(regExp);
                        for (let val of items) {
                            console.log(val.index);
                        }
                    }
                    else {
                        console.log("Значение не найдено");
                    }
                });
            }
            else {
                promptFile(`${optionsPath}/${answer.fileName}`);
            }
        })
};

promptFile(optionsPath);

