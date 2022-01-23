const fs = require('fs');

const input = fs.createReadStream('./access.log');

const rl = require('readline').createInterface({ input: input });

rl.on('line', (line) => {
    if (/89.123.1.41/.test(line)) {
        fs.writeFile(`./89.123.1.41_requests.log`, line + '\n', { flag: 'a' }, () => { })
    };
    if (/34.48.240.111/.test(line)) {
        fs.writeFile(`./34.48.240.111_requests.log`, line + '\n', { flag: 'a' }, () => { })
    };
});