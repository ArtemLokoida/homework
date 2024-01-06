// Temperature

{
    const celToFahr = (degrees) => (degrees * 9/5) + 32;
    const fahrToCel = (degrees) => (degrees - 32) * 5/9;
}

// RGB

{
    const rgb = (r, g, b) => ('#' + 
        (r < 16 ? '0' + r.toString(16) : r.toString(16)) + 
        (g < 16 ? '0' + g.toString(16) : g.toString(16)) + 
        (b < 16 ? '0' + b.toString(16) : b.toString(16))).toUpperCase()
}

// Flats

{
    const flats = (floors, flats, flatNumber) => ({
        entrance : Math.ceil(flatNumber / (floors * flats)),
        floor : Math.ceil((flatNumber % (floors * flats)) / flats)
    })
}

// Credentials

{
    const capitalize = str => {
        let result = str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
        return result;
    }

    const credentials = () => {
    const name = capitalize(prompt("Ваше ім'я?").trim());
    const surname = capitalize(prompt("Ваше призвіще?").trim());
    const fatherName = capitalize(prompt("Ваше ім'я по батькові?").trim());
    const fullName = (`${surname} ${name} ${fatherName}`);
    
    return {name, surname, fatherName, fullName}
    }
}

// New line

{
    const newLine = str => {
        const strArr = str.split("\n");
        const result = strArr.join("\n");
        return result;
    }
}

// Prompt OR

{
    const userAge = (a, b) => prompt(a) || b
}

// Login And Password

{
    // const authorization = (login, password) => login === prompt("Input login") && password === prompt("Input password");

    const authorization = (login, password) => {
        if (login === prompt("Input login")) {
            if (password == prompt("Input password")) {
                alert("Success");
                return true;
            }
            else {
                alert("Error");
                return false;
            }
        }
        else {
            alert("Error");
            return false;
        }
    }
}

// For Table

{
    const table = arr => {
        let str = "<table>";
        let i = 1;

        for (const numbers of arr) {
            let background = (i++ % 2) ? "gray" : "white";
            str += `<tr style="background-color: ${background};">`;

            for (const number of numbers) {
                str += `<td>${number}</td>`;
            }
            
            str += `</tr>`;
        }
        str += "</table>";
        document.write(str);
        return str;
    }
}

// Filter Lexics

{
    const lexFilter = str => {
        const banWords = ['бляха', 'муха', "пляшка", "шабля"];
        const words = str.split(" ");
        const result = words.filter(ban => !banWords.includes(ban)).join(" ");
        return result;
    }
}

// Currency Table

{
    const table = arr => {
        let str = "<table>";
        let i = 1;

        for (const numbers of arr) {
            let background = (i++ % 2) ? "gray" : "white";
            str += `<tr style="background-color: ${background};">`;

            for (const number of numbers) {
                str += `<td>${number}</td>`;
            }
            
            str += `</tr>`;
        }
        str += "</table>";
        document.write(str);
        return str;
    }

    const currencyTable = () => {
        fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json())
        .then(data => {
            const currencies = Object.keys(data.rates);
            const resultArray = [['']];

            currencies.forEach(currency => resultArray[0].push(currency));

            currencies.forEach(fromCurrency => {
                const row = [fromCurrency];
                currencies.forEach(toCurrency => {
                    const rate = data.rates[toCurrency] / data.rates[fromCurrency];
                    row.push(rate.toFixed(3));
                });
                resultArray.push(row);
            });
            
            table(resultArray);
        });
    }
}

// Form

{
    const formFunc = obj => {
        let form = "<form>";

        Object.entries(obj).forEach(([key, value]) => {
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
}

// Array of objects sort

{
    const sortArr = (arr, property, ascending = true) => {
        const upOrDown = ascending ? 1 : -1;

        arr.sort((a, b) => {
            const aValue = a[property];
            const bValue = b[property];
    
            if (aValue < bValue) {
                return -1 * upOrDown;
            } else if (aValue > bValue) {
                return 1 * upOrDown;
            } else {
                return 0;
            }
        });
    }
}

// Table

{
    const sortArr = (arr, property, ascending = true) => {
        const upOrDown = ascending ? 1 : -1;

        arr.sort((a, b) => {
            const aValue = a[property];
            const bValue = b[property];
    
            if (aValue < bValue) {
                return -1 * upOrDown;
            } else if (aValue > bValue) {
                return 1 * upOrDown;
            } else {
                return 0;
            }
        });
    }

    
    const tableSort = (arr, field, ascending) => {
        let copyArr = [...arr];
        sortArr(copyArr, field, ascending);

        let collumns = [];
        copyArr.forEach(person => {
            Object.keys(person).forEach(key => {
                if (!collumns.includes(key)) {
                    collumns.push(key);
                }
            })
        })

        let tableHeader = '<tr>'
        for (const key of collumns) {
            tableHeader += `<th>${key}</th>`
        }
        tableHeader += '</tr>'

        let tableBody = '';
        for (const person of copyArr) {
            tableBody += '<tr>';
            for (const key of collumns) {
                tableBody += `<td>${person[key] === undefined ? "" : person[key]}</td>`;
            }
            tableBody += '</tr>';
        };

        const table = `<table>${tableHeader}${tableBody}</table>`
        document.write(table);
    }
}

// Divide

{
    // ./divide.html
}

// Calc Func

{
    function calc(operator, num1, num2) {
        if (operator === "+") {
                return num1 + num2;
        }
        else if (operator === "-") {
                return num1 - num2;
        }
        else if (operator === "*") {
            return num1 * num2;
        }
        else if (operator === "/") {
            return num1 / num2;
        }
    }
}

// Calc Live

{
    // ./calc-live.html
}