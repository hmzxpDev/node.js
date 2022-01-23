const http = require('http');
const fs = require('fs');
const path = require('path');
const html = require('./html'); // кастомный файл для создания html



http.createServer((req, res) => {
    const filePath = path.join(__dirname + req.url);
    // если указанный путь есть - выведет страницу
    try {
        if (fs.lstatSync(filePath).isDirectory()) {
            let render = '';
            fs.readdirSync(filePath).forEach(item => {
                // для иконок в засивимости от типа файла
                if (fs.lstatSync(filePath + '/' + item).isDirectory()) {
                    render += `
                    <div class="item">
                        <div class="dirImg"></div>
                        <div class="fileName"><a href="http://localhost:5555${req.url + item + '/'}">${item}</a></div >
                    </div > `
                }
                else {
                    render += `
                    <div class="item">
                        <div class="fileImg"></div>
                        <div class="fileName"><a href="http://localhost:5555${req.url + item + '/'}">${item}</a></div >
                    </div> `
                }
            })

            res.writeHead(200, 'OK', { "Content-type": "text/html" });
            res.end(html.htmlCreator(render));
        }
        else {
            const readStream = fs.createReadStream(filePath);
            readStream.pipe(res);
        }
    }
    // если путь неправильный - 404
    catch {
        res.end('page not found 404');
    }
}).listen(5555);