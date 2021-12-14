// импортируем цвета
const colors = require('colors');

// начало диапазона
const startRange = +process.argv[2];
// конец диапазона
const endRange = +process.argv[3];


const productionPrimeNumber = () => {

    // массив простых чисел
    const arr = [];

    // добавление в массив всех простых чисел до конца диапазона
    nextPrime:
    for (let i = 1; i < endRange + 1; i++) {
        for (let j = 2; j < i; j++) {
            if (i % j == 0) continue nextPrime
        }
        arr.push(i);
    }

    // вывод чисел в консоль
    let colorId = 0
    const arrayBeggin = arr.findIndex(item => item >= startRange);
    if (arrayBeggin >= 0) {
        for (let i = arrayBeggin; i < arr.length; i++) {
            colorId++;
            if (colorId === 1) {
                console.log(colors.green(arr[i]));
            }
            if (colorId === 2) {
                console.log(colors.yellow(arr[i]));
            }
            if (colorId === 3) {
                console.log(colors.red(arr[i]));
                colorId = 0;
            }
        }
    }
    else {
        console.log(colors.red('Простых чисел в диапазоне нет'));
    }
}

// валидация корректного диапазона
if (Number.isInteger(startRange) && Number.isInteger(endRange) && startRange <= endRange && startRange >= 0 && endRange >= 0) {
    productionPrimeNumber();
}
else {
    console.log(colors.red('Введите корректный диапазон в формате (node index.js 1 14)'));
}