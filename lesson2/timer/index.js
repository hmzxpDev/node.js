const { DateTime } = require("luxon");
const EventEmitter = require('events');
const colors = require('colors');


// получаем данные
const [, , years = 2022, months = 1, days = 1, hours = 0, minutes = 0, seconds = 0] = process.argv;

// регистрация события
const event = new EventEmitter();

event.on('updateTime', (diff) => {
    console.log(
        colors.blue('До наступления указанной даты осталось'),
        'лет', diff.years,
        'месяцев', diff.months,
        'дней', diff.days,
        'часов', diff.hours,
        'минут', diff.minutes,
        'секунд', Math.floor(diff.seconds) + 1,
    );
});

event.on('timerStop', (text) => {
    clearInterval(timer);
    console.log(colors.red(text));
});


function calculationDiff([year, month, day, hour, minute, second] = date) {
    // начальная, финальая дата
    const start = DateTime.now();
    const end = DateTime.local(year, month, day, hour, minute, second);

    // разница между ними
    const diff = end.diff(start, ['years', 'months', 'days', 'hours', 'minutes', 'seconds', 'milliseconds']).toObject();

    // вызываем событие обновления времени
    if (diff.milliseconds > 0) {
        event.emit('updateTime', diff);
    }
    else {
        event.emit('timerStop', 'Дата наступила!');
    }
};

// запускаем таймер
const timer = setInterval(() => {
    calculationDiff([+years, +months, +days, +hours, +minutes, +seconds]);
}, 1000);

