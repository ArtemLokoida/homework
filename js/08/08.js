// comparison if

{
    const age = +prompt("Скільки вам років?", "");

    if (age < 0) {
        alert("О, Ви з майбутнього?");
    } else if (age < 18) {
        alert("школяр");
    } else if (age < 30) {
        alert("молодь");
    } else if (age < 45) {
        alert("зрілість");
    } else if (age < 60) {
        alert("захід сонця");
    } else if (age >= 60 && age < 100) {
        alert("як пенсія?");
    } else {
        alert("чи кіборг, чи KERNESS");
    }
}

// switch: sizes

{
    const userSize = +prompt("Введіть ваш розмір одягу (Від 40 до 54).");

    switch (userSize) {
        case 40:
            alert("Ваш розмір у США - 6");
            break;
        case 42:
            alert("Ваш розмір у США - 8");
            break;
        case 44:
            alert("Ваш розмір у США - 10");
            break;
        case 46:
            alert("Ваш розмір у США - 12");
            break;
        case 48:
            alert("Ваш розмір у США - 14");
            break;
        case 50:
            alert("Ваш розмір у США - 16");
            break;
        case 52:
            alert("Ваш розмір у США - 18");
            break;
        case 54:
            alert("Ваш розмір у США - 20");
            break;
        default:
            alert("Помилка!");
    }
}

// switch: if

{
    let color = prompt("Введіть колір","");
    if (color === "red") {
        document.write("<div style='background-color: red;'>червоний</div>");
        document.write("<div style='background-color: black; color: white;'>чорний</div>");
    }
    else if (color === "black") {
        document.write("<div style='background-color: black; color: white;'>чорний</div>");
    }
    else if (color === "blue") {
        document.write("<div style='background-color: blue;'>синій</div>");
        document.write("<div style='background-color: green;'>зелений</div>");
    }
    else if (color === "green") {
        document.write("<div style='background-color: green;'>зелений</div>");
    }
    else {
        document.write("<div style='background-color: gray;'>Я не зрозумів</div>");
    }
}

// noswitch

{
    const noSwitch = (key, cases, defaultKey='default') => {
        if (key in cases) {
            return cases[key]()
        }
        else {
            return cases[defaultKey]()
        }
    }
    
    const drink = prompt("Що ви любите пити")
    noSwitch(drink, {
        воду: () => console.log('Найздоровіший вибір!'),
        чай(){
            console.log('Смачна та корисна штука. Не перестарайтеся з цукром')
        },
        "пиво": () => console.log('Добре влітку, та в міру'),
        віскі: function(){
            console.log('Та ви, батечку, естет! Не забудьте лід і сигару')
        },
        default(){
            console.log('шото я не зрозумів')
        }
    })
}

// closure calc

{ // ./closure-calc.html
    fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json())
    .then(data => {
        for (const currency in data.rates) {
            const button = document.createElement('button');
            button.innerText = currency;
            button.onclick = () => {
                const amount = +prompt(`Input amount in ${currency}`)
                const result = amount / data.rates[currency]
                alert(`${result.toFixed(2)} USD`)
            }
            container.append(button);
        }
    })
}

// closure calc 2

{ // ./closure-calc-2.html
    fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json())
    .then(data => {
        for (const currency in data.rates) {
            const selectOptFrom = document.createElement('option');
            selectOptFrom.innerText = currency;
            from.append(selectOptFrom);
            const selectOptTo = document.createElement('option');
            selectOptTo.innerText = currency;
            to.append(selectOptTo);
        }

        const exchange = () => {
            const crossRate = 1 / (data.rates[from.value] / data.rates[to.value])
            const resultAmount = +amount.value / (data.rates[from.value] / data.rates[to.value])

            rate.innerText = `Rate: 1 ${from.value} = ${(crossRate).toFixed(2)} ${to.value}`
            result.innerText = `Result: ${resultAmount.toFixed(2)} ${to.value}`
        }

        from.onchange = to.onchange = amount.oninput = exchange;
    })
}

// countries and cities

{ // ./countries-and-cities.html
    fetch('https://raw.githubusercontent.com/russ666/all-countries-and-cities-json/master/countries.min.json').then(res => res.json())
    .then(data => {
        for (const country in data) {
            const countryOption = document.createElement('option');
            countryOption.innerText = country;
            countries.append(countryOption);
        }

        const cityFunc = () => {
        cities.innerText = "";
        for (const city of data[countries.value]) {
                const cityOption = document.createElement('option');
                cityOption.innerText = city;
                cities.append(cityOption);
            }
        }
        cityFunc();
        countries.onchange = cityFunc;
     })
}