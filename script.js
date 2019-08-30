'use strict';

let money,
    start = function() {
        do{
            money = prompt('Ваш месячный доход?', 50000); // Доход в месяц
        }
        while(isNaN(money) || money === '' || money === null);
    };

start();

let appData = {
    income: {}, // Дополнительные доходы
    addIncome: [],
    expenses: {}, // Дополнительные расходы
    addExpenses: [],
    deposit: false,
    mission: 3000000,
    period: 12,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,

    asking: function() {

        let addExpenses = prompt('Перечислите возможные расходы', 'Еда, Машина, Учеба');
            appData.addExpenses = addExpenses.toLowerCase().split(',');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');

        let expenses1,
            expenses2;

        for (let i = 0; i < 2; i++) {

            expenses1 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Кварплата');

            do {
                expenses2 = +prompt('Во сколько это обойдется?', 2500);
            }     
            // Проверка на неверные значения
            while(isNaN(expenses2) || expenses2 == '' || expenses2 === null);

            appData.expenses[expenses1] = +expenses2;
        }
    },

    // Расходы за месяц
    getExpensesMonth: function() {
        for (let key in appData.expenses) {                 // перебор ключей в объекте
            appData.expensesMonth += appData.expenses[key]; // суммирование и запись
        }
    },
    
    // Чистая прибыль
    getBudget: function() {
        appData.budgetMonth =  appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },

    // Функция возвращающаяя период достижения цели
    getTargetMonth: function() {

        let capital =  Math.floor(appData.mission / appData.budgetMonth);

        if (capital > 0) {
            return ('Цель будет достигнута за: ' + capital + ' месяцев!');
        } else {
            return ('Цель не будет достигнута');
        }
    },

    // Функции getStatusIncome
    getStatusIncome: function() {
        if (appData.budgetDay > 800) {
            return ('Высокий уровень дохода');
        } else if (appData.budgetDay > 300 && appData.budgetDay <= 800) {
            return ('Средний уровень дохода');
        } else if (appData.budgetDay > 0 && appData.budgetDay <= 300) {
            return ('Низкий уровень дохода');
        } else {
            return ('Что то пошло не так');
        }
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();


console.log('Расходы за месяц: ' + appData.expensesMonth);
console.log(appData.getTargetMonth()); 
console.log(appData.getStatusIncome());

for (let key in appData) {
    console.log('Напи программа включает в себя данные: ', key);
}