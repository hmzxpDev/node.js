
console.log('Record 1'); // 1 синхронный код

setTimeout(() => {
    console.log('Record 2'); // 4 первый синхронный код внутри сет таймаута
    Promise.resolve().then(() => {
        setTimeout(() => {
            console.log('Record 3'); // 5 первый синхронный код внутри сет таймаута
            Promise.resolve().then(() => {
                console.log('Record 4'); // 6 после синхронного идет промис
            });
        });
    });
});

console.log('Record 5');  // 2 синхронный код

Promise.resolve().then(() => Promise.resolve().then(() => console.log('Record 6'))); // 3 выполняются промисы