// Number: odd
{
    let userInput = +prompt("Введіть число.");

    if (!isNaN(userInput)) {
        if (userInput % 2 === 0) {
            alert("Число парне.");
        }
        else {
            alert("Число непарне.");
        }
    }
    else {
        alert("Помилка!");
    }
}

// String: lexics

{
    let inputString = prompt("Введіть щось.");
    let badWord = inputString.includes("блін");
    if (badWord) {
        alert("Введено некоректне слово!");
    }
}

// Boolean

{
    let answer = confirm("Ви людина?");
    console.log(answer);
}

// Boolean: if

{
    let userSex = confirm("Ваша стать? (Оk - чоловік, Cancel - жінка)");
    if (userSex) {
        alert("Ви чоловік");
    }
    else {
        alert("Ви жінка");
    }
}

// Comparison: sizes

{
    let userSize = +prompt("Введіть ваш розмір одягу (Від 40 до 54).");
    if (userSize >= 40 && userSize <= 54) {   
        if (userSize == 40) {
            alert("Ваш розмір у США - 6");
        }
        if (userSize == 42) {
            alert("Ваш розмір у США - 8");
        }
        if (userSize == 44) {
            alert("Ваш розмір у США - 10");
        }
        if (userSize == 46) {
            alert("Ваш розмір у США - 12");
        }
        if (userSize == 48) {
            alert("Ваш розмір у США - 14");
        }
        if (userSize == 50) {
            alert("Ваш розмір у США - 16");
        }
        if (userSize == 52) {
            alert("Ваш розмір у США - 18");
        }
        if (userSize == 54) {
            alert("Ваш розмір у США - 20");
        }
    }
    else {
        alert("Помилка!");
    }
}

// Ternary

{
    let userSex = confirm("Ваша стать? (Оk - чоловік, Cancel - жінка)");
    alert(userSex ? "Ви чоловік" : "Ви жінка")
}

// Prompt: or

{
    let Age = prompt("Ваш вік?") || "Помилка!";
    let answer = (2023 - Age) || Age;
    alert(`Ваш рік народження - ${answer}`);
}

// Confirm: or this days

{
    confirm("Шопінг?") || alert("ти - бяка");
}

// Confirm: if this days

{
    if (!confirm("Шопінг?")) {
        alert("ти - бяка");
    }
}

// Default: or

{
    let surname = prompt("Ваше призвіще?") || "Іванов";
    let name = prompt("Ваше ім'я?") || "Іван";
    let fatherName = prompt("Ваше ім'я по батькові?") || "Іванович";

    alert(`${surname} ${name} ${fatherName}`);
}

// Default: if

{
    let surname = prompt("Ваше призвіще?");
    let name = prompt("Ваше ім'я?");
    let fatherName = prompt("Ваше ім'я по батькові?");

    if (!surname) {
        surname = "Іванов";
    }
    if (!name) {
        name = "Іван";
    }
    if (!fatherName) {
        fatherName = "Іванович";
    }

    alert(`${surname} ${name} ${fatherName}`);
}

// Login and password

{
    let login, password;
    
    login = prompt("Введіть логін.");
    if (login == "admin") {
        password = prompt("Введіть пароль.");
        if (password == "qwerty") {
            alert("Успішно.");
        }
        else {
            alert("Помилка.");
        }
    }
    else {
        alert("Помилка.");
    }
}

// Currency exchange

{
    const currency = prompt("Яка валюта? (usd/eur/gbp)").toLowerCase();

    if (currency == "usd") {
        const action = confirm("Купити чи продати? (Ok - купити, Cancel - продати)");
        const amount = prompt("Введіть суму на обмін");
        let rate = action ? 37.8 : 37.2;
        if (action) {
            let result = (amount / rate).toFixed(2);
            alert(`${result} usd.`);
        }
        else {
            let result = (amount * rate).toFixed(2);
            alert(`${result} грн.`);
        }
    }
    if (currency == "eur") {
        const action = confirm("Купити чи продати? (Ok - купити, Cancel - продати)");
        const amount = prompt("Введіть суму на обмін");
        let rate = action ? 40.8 : 40.2;
        if (action) {
            let result = (amount / rate).toFixed(2);
            alert(`${result} eur.`);
        }
        else {
            let result = (amount * rate).toFixed(2);
            alert(`${result} uah.`);
        }
    }
    if (currency == "gbp") {
        const action = confirm("Купити чи продати? (Ok - купити, Cancel - продати)");
        const amount = prompt("Введіть суму на обмін");
        let rate = action ? 47.3 : 46.0;
        if (action) {
            let result = (amount / rate).toFixed(2);
            alert(`${result} gbp.`);
        }
        else {
            let result = (amount * rate).toFixed(2);
            alert(`${result} uah.`);
        }
    }
    else {
        alert("Некоректна валюта!")
    }
}

// Scissors

{
    const userMove = prompt("Камінь / Ножиці / Папір?").toLowerCase();
    const random = Math.random();
    // const computerMove = random > 0.33 ? (random > 0.66 ? alert("Камінь") : alert("Ножиці")) : alert("Папір");

    if (userMove == "камінь") {
        if (random > 0.33) {
            if (random > 0.66) {
                alert("Комп'ютер обрав: Камінь");
                alert("Нічія!");
            }
            else {
                alert("Комп'ютер обрав: Ножиці");
                alert("Перемога!");
            }
        }
        else {
            alert("Комп'ютер обрав: Папір");
            alert("Поразка!");
        }
    }

    if (userMove == "ножиці") {
        if (random > 0.33) {
            if (random > 0.66) {
                alert("Комп'ютер обрав: Камінь");
                alert("Поразка!");
            }
            else {
                alert("Комп'ютер обрав: Ножиці");
                alert("Нічія!");
            }
        }
        else {
            alert("Комп'ютер обрав: Папір");
            alert("Перемога!");
        }
    }

    if (userMove == "папір") {
        if (random > 0.33) {
            if (random > 0.66) {
                alert("Камінь");
                alert("Перемога!");
            }
            else {
                alert("Ножиці");
                alert("Поразка!");
            }
        }
        else {
            alert("Папір");
            alert("Нічія!");
        }
    }
}

// Додаткове завдання

{
    const taskName = prompt("Task name?");
    
    if (taskName == "Number: odd") {
        let userInput = +prompt("Введіть число.");

        if (!isNaN(userInput)) {
            if (userInput % 2 === 0) {
                alert("Число парне.");
            }
            else {
                alert("Число непарне.");
            }
        }
        else {
            alert("Помилка!");
        }
    }

    if (taskName == "String: lexics") {
        let inputString = prompt("Введіть щось.");
        let badWord = inputString.includes("блін");
        if (badWord) {
            alert("Введено некоректне слово!");
        }
    }

    if (taskName == "Boolean") {
        let answer = confirm("Ви людина?");
        console.log(answer);
    }

    if (taskName == "Boolean: if") {
        let userSex = confirm("Ваша стать? (Оk - чоловік, Cancel - жінка)");
        if (userSex) {
            alert("Ви чоловік");
        }
        else {
            alert("Ви жінка");
        }
    }

    if (taskName == "Comparison: sizes") {
        let userSize = +prompt("Введіть ваш розмір одягу (Від 40 до 54).");
        if (userSize >= 40 && userSize <= 54) {   
            if (userSize == 40) {
                alert("Ваш розмір у США - 6");
            }
            if (userSize == 42) {
                alert("Ваш розмір у США - 8");
            }
            if (userSize == 44) {
                alert("Ваш розмір у США - 10");
            }
            if (userSize == 46) {
                alert("Ваш розмір у США - 12");
            }
            if (userSize == 48) {
                alert("Ваш розмір у США - 14");
            }
            if (userSize == 50) {
                alert("Ваш розмір у США - 16");
            }
            if (userSize == 52) {
                alert("Ваш розмір у США - 18");
            }
            if (userSize == 54) {
                alert("Ваш розмір у США - 20");
            }
        }
        else {
            alert("Помилка!");
        }
    }

    if (taskName == "Ternary") {
        let userSex = confirm("Ваша стать? (Оk - чоловік, Cancel - жінка)");
        alert(userSex ? "Ви чоловік" : "Ви жінка")
    }

    if (taskName == "Prompt: or") {
        let Age = prompt("Ваш вік?") || "Помилка!";
        let answer = (2023 - Age) || Age;
        alert(`Ваш рік народження - ${answer}`);
    }

    if (taskName == "Confirm: or this days") {
        confirm("Шопінг?") || alert("ти - бяка");
    }

    if (taskName == "Confirm: if this days") {
        if (!confirm("Шопінг?")) {
            alert("ти - бяка");
        }
    }

    if (taskName == "Default: or") {
        let surname = prompt("Ваше призвіще?") || "Іванов";
        let name = prompt("Ваше ім'я?") || "Іван";
        let fatherName = prompt("Ваше ім'я по батькові?") || "Іванович";
    
        alert(`${surname} ${name} ${fatherName}`);
    }
    
    if (taskName == "Default: if") {
        let surname = prompt("Ваше призвіще?");
        let name = prompt("Ваше ім'я?");
        let fatherName = prompt("Ваше ім'я по батькові?");
    
        if (!surname) {
            surname = "Іванов";
        }
        if (!name) {
            name = "Іван";
        }
        if (!fatherName) {
            fatherName = "Іванович";
        }
    
        alert(`${surname} ${name} ${fatherName}`);
    }
    
    if (taskName == "Login and password") {
        let login, password;
    
        login = prompt("Введіть логін.");
        if (login == "admin") {
            password = prompt("Введіть пароль.");
            if (password == "qwerty") {
                alert("Успішно.");
            }
            else {
                alert("Помилка.");
            }
        }
        else {
            alert("Помилка.");
        }
    }

    if (taskName == "Currency exchange") {
        const currency = prompt("Яка валюта? (usd/eur/gbp)").toLowerCase();

        if (currency == "usd") {
            const action = confirm("Купити чи продати? (Ok - купити, Cancel - продати)");
            const amount = prompt("Введіть суму на обмін");
            let rate = action ? 37.8 : 37.2;
            if (action) {
                let result = (amount / rate).toFixed(2);
                alert(`${result} usd.`);
            }
            else {
                let result = (amount * rate).toFixed(2);
                alert(`${result} грн.`);
            }
        }
        if (currency == "eur") {
            const action = confirm("Купити чи продати? (Ok - купити, Cancel - продати)");
            const amount = prompt("Введіть суму на обмін");
            let rate = action ? 40.8 : 40.2;
            if (action) {
                let result = (amount / rate).toFixed(2);
                alert(`${result} eur.`);
            }
            else {
                let result = (amount * rate).toFixed(2);
                alert(`${result} uah.`);
            }
        }
        if (currency == "gbp") {
            const action = confirm("Купити чи продати? (Ok - купити, Cancel - продати)");
            const amount = prompt("Введіть суму на обмін");
            let rate = action ? 47.3 : 46.0;
            if (action) {
                let result = (amount / rate).toFixed(2);
                alert(`${result} gbp.`);
            }
            else {
                let result = (amount * rate).toFixed(2);
                alert(`${result} uah.`);
            }
        }
        else {
            alert("Некоректна валюта!")
        }
    }

    if (taskName == "Scissors") {
        const userMove = prompt("Камінь / Ножиці / Папір?").toLowerCase();
        const random = Math.random();
    
        if (userMove == "камінь") {
            if (random > 0.33) {
                if (random > 0.66) {
                    alert("Комп'ютер обрав: Камінь");
                    alert("Нічія!");
                }
                else {
                    alert("Комп'ютер обрав: Ножиці");
                    alert("Перемога!");
                }
            }
            else {
                alert("Комп'ютер обрав: Папір");
                alert("Поразка!");
            }
        }
    
        if (userMove == "ножиці") {
            if (random > 0.33) {
                if (random > 0.66) {
                    alert("Комп'ютер обрав: Камінь");
                    alert("Поразка!");
                }
                else {
                    alert("Комп'ютер обрав: Ножиці");
                    alert("Нічія!");
                }
            }
            else {
                alert("Комп'ютер обрав: Папір");
                alert("Перемога!");
            }
        }
    
        if (userMove == "папір") {
            if (random > 0.33) {
                if (random > 0.66) {
                    alert("Комп'ютер обрав: Камінь");
                    alert("Перемога!");
                }
                else {
                    alert("Комп'ютер обрав: Ножиці");
                    alert("Поразка!");
                }
            }
            else {
                alert("Комп'ютер обрав: Папір");
                alert("Нічія!");
            }
        }
    }
}

// Завдання на чорний пояс

{
    const userMove = prompt("Камінь / Ножиці / Папір?").toLowerCase();
    const computerMove = ["камінь", "ножиці", "папір"][Math.floor(Math.random() * 3)];
    
    alert(`Комп'ютер обрав: ${computerMove}`);
    alert(
      (userMove === "камінь" && computerMove === "ножиці") ||
      (userMove === "ножиці" && computerMove === "папір") ||
      (userMove === "папір" && computerMove === "камінь") ? "Ви перемогли!" : userMove === computerMove ? "Нічия!": "Ви програли!"
    );
}