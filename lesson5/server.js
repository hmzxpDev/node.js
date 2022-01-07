const http = require('http');
const fs = require('fs');
const path = require('path');



const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname + req.url)
    try {
        if (fs.lstatSync(filePath).isDirectory()) {
            let render = '';
            fs.readdirSync(filePath).forEach(item => {
                if (fs.lstatSync(filePath + '/' + item).isDirectory()) {
                    render += `
                    <div class="item">
                        <div class="dirImg"></div>
                        <div class="fileName"><a href="http://localhost:5555${req.url + '/' + item}">${item}</a></div >
                    </div >`
                }
                else {
                    render += `
                    <div class="item">
                        <div class="fileImg"></div>
                        <div class="fileName"><a href="http://localhost:5555${req.url + '/' + item}">${item}</a></div >
                    </div >`
                }
            })

            res.writeHead(200, 'OK', { "Content-type": "text/html" })
            res.end(`
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                    <style>
                    .item {
                        width: 100%;
                        height: 35px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-top:10px;
                    }
            
                    .dirImg {
                        width: 32px;
                        height: 32px;
                        background-image: url('/img/folder_103595.png');
                        background-repeat: no-repeat;
                    }
            
                    .fileName {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: flex-start;
                        margin-left: 10px;
                    }
            
                    .fileImg {
                        width: 32px;
                        height: 32px;
                        background-image: url('/img/fileinterfacesymboloftextpapersheet_79740.png');
                        background-repeat: no-repeat;
                    }
                    </style>
                    </head>
                <body>
                <a href="/">Home Page</a>              
                        ${render}
                </body>
            </html>`)
        }
        else {
            const readStream = fs.createReadStream(filePath);
            readStream.pipe(res);
        }
    }
    catch {
        res.end('page not found')
    }
})


server.listen(5555);