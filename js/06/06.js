// Literals

{
    const cat = {
        color: 'white',
        tail: 'long',
        fur: 'fluffy'
    }

    const car = {
        brand: "Toyota",
        model: "Mark II",
        engine: '2JZ'
    }

    const beer = {
        taste: 'good',
        prise: 'cheep',
    }
}

// Literals expand

{
    const userInput = {
        [prompt('input key')]: prompt('input property'),
        [prompt('input key')]: prompt('input property')
    }
}

// Literals copy

{
    const userInput = {
        [prompt('input key')]: prompt('input property'),
        [prompt('input key')]: prompt('input property')
    }


    const userKey = prompt('input key');

    const obj = {
        userKey: 123,
        ...userInput
    }
}

// Html tree

{
    const body = {
        tagName: 'body',
        children: [
            {
                tagName: 'div',
                children: [
                    {
                        tagName: 'span',
                        children: ['Enter a data please:']
                    },
                    {
                        tagName: 'br/'
                    },
                    {
                        tagName: 'input',
                        attrs: {
                            type: 'text',
                            id: 'name'
                        }
                    },
                    {
                        tagName: 'input',
                        attrs: {
                            type: 'text',
                            id: 'surname'
                        },
                    },
                ],
            },
            {
                tagName: 'div',
                children: [
                    {
                        tagName: 'button',
                        attrs: {
                            id: 'ok'
                        },
                        children: ['OK']
                    },
                    {
                        tagName: 'button',
                        attrs: {
                            id: 'cancel'
                        },
                        children: ['Cancel']
                    }
                ]
            }
        ] 
    }

    {
        console.log(body.children[1].children[1].children[0]);
        console.log(body['children'][1]['children'][1]['children'][0]);

        console.log(body.children[0].children[3].attrs.id);
        console.log(body['children'][0]['children'][3]['attrs']['id']);
    }

    // Parent

    {
        body.children[0].parent = body.children;
        body.children[0].children[0].parent = body.children[0].children;
        body.children[0].children[1].parent = body.children[0].children;
        body.children[0].children[2].parent = body.children[0].children;
        body.children[0].children[3].parent = body.children[0].children;
    
        body.children[1].parent = body.children;
        body.children[1].children[0].parent = body.children[1].children;
        body.children[1].children[1].parent = body.children[1].children;
    }

    // Change OK

    {
        body.children[1].children[0].attrs[prompt("input attribute")] = prompt("input value");
    }

    // Destructure

    {
        const {children: [{children: [{children : [spanText]}]}]} = body; 
        const {children: [,{children: [,{children : [button2Text]}]}]} = body;
        const {children: [{children: [,,,{attrs: {id : input2Id}}]}]} = body;
    }
}

// Destruct array

{
    // let arr = [1,2,3,4,5, "a", "b", "c"];
    // let {0: odd1, 1: even1, 2: odd2, 3: even2, 4: odd3, ...letters} = arr;
    // letters = Object.values(letters);

    let arr = [1,2,3,4,5, "a", "b", "c"];
    const [odd1, even1, odd2, even2, odd3, ...letters] = arr;
}

// Destruct string

{
    let arr = [1, "abc"];
    const [number, [s1, s2, s3]] = arr;
}

// Destruct 2

{
    let obj = {name: 'Ivan',
            surname: 'Petrov',
            children: [{name: 'Maria'}, {name: 'Nikolay'}]};
    const {children: [{name : name1}, {name: name2}]} = obj;
}

// Destruct 3

{
    let arr = [1,2,3,4, 5,6,7,10];
    const {0: a, 1: b, length} = arr;
}

// Copy delete

{
    const beer = {
        taste: 'good',
        prise: 'cheep'
    }

    const {[confirm("Що для вас важливіше в пиві?\n(Ok - Смак, Cancel - ціна)") ? "prise" : "taste"]: userChoise, ...another} = beer;

    const userPreferences = {...another};
    console.log(userPreferences);
}

// Currency real rate

{
    const fromCurrency = prompt("Введіть вхідну валюту (Наприклад: USD)").toUpperCase();
    const toCurrency = prompt("Введіть валюту, в яку відбувається конвертація (Наприклад: UAH)").toUpperCase();
    const Amount = +prompt("Введіть суму у вхідній валюті");

    fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json())
    .then(data => {
        const result = Amount / (data.rates[fromCurrency] / data.rates[toCurrency]);
        alert(result.toFixed(2) || "Error");
    })
}

// Currency drop down

{
    fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json())
    .then(data => {
        let str = '<select>'
        for (const options in data.rates) {
            str += `<option>${options}</option>`;
        }
        str += '</select>'
        document.write(str);
    })
}

// Currency table

{
    fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json())
    .then(data => {

        let table = '<table><tr><td>&nbsp;</td>'
        const currencies = Object.keys(data.rates);

        currencies.forEach(currency => {
            table += `<td style="border: solid 1px; background: gray;"><b>${currency}</b></td>`;
        })
        table += '</tr>'

        currencies.forEach(fromCurrency => {
            table += `<tr style="border: solid 1px;"><td style="border: solid 1px; background: gray;"><b>${fromCurrency}</b></td>`;
            currencies.forEach(toCurrency => {
                const rate = data.rates[toCurrency] / data.rates[fromCurrency];
                table += `<td style="border: solid 1px;">${rate.toFixed(3)}</td>`;
            })
            table += '</tr>'
        })
        table += '</table>'
        
        document.write(table);
    })
}

// Form

{
    const car = {
        "Name":"chevrolet chevelle malibu",
        "Cylinders":8,
        "Displacement":307,
        "Horsepower":130,
        "Weight_in_lbs":3504,
        "Origin":"USA",
        "in_production": false
    }

    let form = "<form>";

    Object.entries(car).forEach(([key, value]) => {
        let checkboxValue, typeOfValue;

        if (typeof value === 'number') {
            typeOfValue = 'number';
        }   else if (typeof value === 'boolean') {
            typeOfValue = 'checkbox';
            checkboxValue = value ? "checked" : ""
          } else {
            typeOfValue = 'text';
          }

        form += `<label>${key}: <input type ="${typeOfValue}" value="${value}" ${checkboxValue}/></label></br>`;
    })
    form += "</form>";

    document.write(form);
}

// Table

{
    const persons = [
        {
            name: 'Марія',
            fatherName: 'Іванівна',
            surname: 'Іванова',
            sex: 'female'
        },
        {
            name: 'Миколай',
            fatherName: 'Іванович',
            surname: 'Іванов',
            age: 15
        },
        {
            name: 'Петро',
            fatherName: 'Іванович',
            surname: 'Іванов',
            married: true
        },
    ]

    let collumns = [];
    persons.forEach(person => {
        Object.keys(person).forEach(key => {
            if (!collumns.includes(key)) {
                collumns.push(key);
            }
        })
    })

    let tableHeader = '<tr>'
    for (const key of collumns)
        tableHeader += `<th>${key}</th>`
    tableHeader += '</tr>'

    let tableBody = '';
    for (const person of persons) {
        tableBody += '<tr>';
        for (const key of collumns) {
            tableBody += `<td>${person[key] === undefined ? "" : person[key]}</td>`;
        }
        tableBody += '</tr>';
    };

    const table = `<table>${tableHeader}${tableBody}</table>`
    document.write(table);
}