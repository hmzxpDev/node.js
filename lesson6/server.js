const io = require('socket.io');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, 'chat.html')
    fs.readFile(filePath, 'utf8', (err, data) => {
        res.end(data);
    })
    res.writeHead(200, 'Ok!', 'Content:type-text/html');
}).listen(5555);

const socket = io(server);

socket.on('connection', client => {
    let nickname = ''
    client.on('userName', (name) => {
        nickname = name;
        client.broadcast.emit('newUser', nickname); // событие подключения нового пользователя
    })

    client.on('disconnect', () => {
        client.broadcast.emit('userDisc', nickname); // событие отключения пользователя
    })

    const filePath = path.join(__dirname, 'chatHistory.json');
    // считываем историю сообщений
    fs.readFile(filePath, 'utf8', (err, data) => {
        client.emit('chatHistLoading', JSON.parse(data)); // отсылаем на клиент один раз при подключении
    })

    // событие получения сообщений с клиента
    client.on('clientMsg', (clientMsg) => {
        // получаем массив сообщений из бд
        fs.readFile(filePath, 'utf8', (err, data) => {
            let chatHistory = JSON.parse(data);
            chatHistory.push(clientMsg);// дополняем новым сообщением
            // записываем новый массив
            fs.writeFile(filePath, JSON.stringify(chatHistory), err => {
                if (err) {
                    console.log(err);
                }
            })
        });

        // отсылаем сообщение на клиент
        client.emit('serverAnswer', clientMsg);
        client.broadcast.emit('serverAnswer', clientMsg);
    })
})
