const htmlCreator = (render) => {

    return `
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
            </html>`
}

module.exports.htmlCreator = htmlCreator;