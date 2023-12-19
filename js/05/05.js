// Confirms

{
    let arr = [confirm("Так чи ні?"), confirm("Так чи ні?"), confirm("Так чи ні?")];
    console.log(arr);
}

// Prompts

{
    let arr = [];
    arr[0] = prompt("Введіть щось.");
    arr[1] = prompt("Введіть щось.");
    arr[2] = prompt("Введіть щось.");
}

// Item access

{
    let arr = ["q", "w", "e", "r", "t", "y"];
    arr [arr.length] = 123;
    console.log(arr[prompt("Введіть індекс масиву. (0-6)")]);
}

// Item change

{
    let arr = ["q", "w", "e", "r", "t", "y"];
    arr [arr.length] = 123;
    console.log(arr, arr[prompt("Введіть індекс масиву. (0-6)")]=prompt("Введіть значення елемента."));
}

// Multiply table

{
    const arr = [[0, 0, 0, 0, 0],
                [0, 1, 2, 3, 4],
                [0, 2, 4, 6, 8],
                [0, 3, 6, 9, 12],
                [0, 4, 8, 12, 16]];
    console.log(arr);
}

// Multiply table slice

{
    const arr = [[0, 0, 0, 0, 0],
                [0, 1, 2, 3, 4],
                [0, 2, 4, 6, 8],
                [0, 3, 6, 9, 12],
                [0, 4, 8, 12, 16]];
    let newArr = [];
    newArr[0] = arr[1].slice(1);
    newArr[1] = arr[2].slice(1);
    newArr[2] = arr[3].slice(1);
    newArr[3] = arr[4].slice(1);
    console.log(newArr);
}

// IndexOf Word

{
    let arr = prompt('Введіть рядок із кількох слів в якому буде "пиво"').split(" ");
    let answer = arr.indexOf("пиво");
    alert(++answer ? `Слово "пиво" є ${answer} за рахунком` : "Cлово не знайдено")
}

// Reverse

{
    let arr1 = [];
    arr1.push(prompt("input smth"));
    arr1.push(prompt("input smth"));
    arr1.push(prompt("input smth"));
    arr1.push(prompt("input smth"));
    arr1.push(prompt("input smth"));

    let arr2 = [];
    arr2.push(arr1.pop());
    arr2.push(arr1.pop());
    arr2.push(arr1.pop());
    arr2.push(arr1.pop());
    arr2.push(arr1.pop());
}

// Reverse 2

{
    let arr1 = [];
    arr1.push(prompt("input smth"));
    arr1.push(prompt("input smth"));
    arr1.push(prompt("input smth"));
    arr1.push(prompt("input smth"));
    arr1.push(prompt("input smth"));

    let arr2 = [];
    arr2.push(arr1.pop());
    arr2.push(arr1.pop());
    arr2.push(arr1.pop());
    arr2.push(arr1.pop());
    arr2.push(arr1.pop());

    let arr3 = [];
    arr3.unshift(arr2.shift());
    arr3.unshift(arr2.shift())
    arr3.unshift(arr2.shift())
    arr3.unshift(arr2.shift())
    arr3.unshift(arr2.shift())
}

// Copy

{
    const arr = [[0, 0, 0, 0, 0],
                [0, 1, 2, 3, 4],
                [0, 2, 4, 6, 8],
                [0, 3, 6, 9, 12],
                [0, 4, 8, 12, 16]];
    console.log(arr);

    const Copy = arr.slice();
    console.log(Copy);
}

// Deep Copy

{
    const arr = [[0, 0, 0, 0, 0],
                [0, 1, 2, 3, 4],
                [0, 2, 4, 6, 8],
                [0, 3, 6, 9, 12],
                [0, 4, 8, 12, 16]];
    console.log(arr);

    const DeepCopy = [[...arr[0]], [...arr[1]], [...arr[2]], [...arr[3]], [...arr[4]]];
    console.log(DeepCopy);
}

// Array Equals

{
    const arr = [1, 2 ,3];
    const arr2 = arr;
    console.log(arr === arr2);
}

// Flat

{
    const arr = [[0, 0, 0, 0, 0],
                [0, 1, 2, 3, 4],
                [0, 2, 4, 6, 8],
                [0, 3, 6, 9, 12],
                [0, 4, 8, 12, 16]];
    console.log(arr);

    const flatArr = [...arr[0], ...arr[1], ...arr[2], ...arr[3], ...arr[4]];
    console.log(flatArr);
}

// Destruct

{
    let userStr = prompt('input smth');
    let [first,,,,fifth,,,,ninth] = userStr;
    console.log(first, fifth, ninth);
}

// Destruct default

{
    let userStr = prompt('input smth');
    let [,second="!",,fourth="!",fifth="!"] = userStr;
    console.log(second, fourth, fifth);
}

// Multiply table rest

{
    const arr = [[0, 0, 0, 0, 0],
                [0, 1, 2, 3, 4],
                [0, 2, 4, 6, 8],
                [0, 3, 6, 9, 12],
                [0, 4, 8, 12, 16]];
    let [,[,...a],[,...b],[,...c],[,...d]] = arr;
    let newArr = [a, b, c, d];
    console.log(newArr);
}

// For Alert

{
    const names = ["John", "Paul", "George", "Ringo"];
    for (const name of names) {
        alert(name);
    }
}

// For Select Option

{
    const currencies = ["USD", "EUR", "GBP", "UAH"];
    let str = "<select>";
    for (const currency of currencies){
        str += `<option>${currency}</option>`;
    }
    str += "</select>";
    document.write(str); //document.write відобразить ваш HTML на сторінці
}

// For Table Horizontal

{
    const names = ["John", "Paul", "George", "Ringo"]
    let str = "<table><tr>"
    for (const name of names){
        str += `<td>${name}</td>`
    }
    str += "</tr></table>"
    document.write(str) //document.write отобразит ваш HTML на странице
}

// For Table Vertical

{
    const names = ["John", "Paul", "George", "Ringo"]
    let str = "<table>"
    for (const name of names){
        str += `<tr><td>${name}</td></tr>`
    }
    str += "</table>"
    document.write(str) //document.write отобразит ваш HTML на странице
}

// For Table Letters

{
    const currencies = ["USD", "EUR", "GBP", "UAH"]
    let str = "<table>"
    for (const currency of currencies){ //цикл створює рядки
        str += `<tr>`
        console.log(currency)
        for (const letter of currency){ //цикл створює осередки в одному рядку
            str += `<td>${letter}</td>`
            console.log(letter)
        }
        str += `</tr>`
    }
    str += "</table>"
    document.write(str) //document.write відобразить ваш HTML на сторінці
}

// For Multiply Table

{
    const arr = [[0, 0, 0, 0, 0],
                [0, 1, 2, 3, 4],
                [0, 2, 4, 6, 8],
                [0, 3, 6, 9, 12],
                [0, 4, 8, 12, 16]];
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
}

// Function Capitalize

{
    const capitalize = str => {
        let result = str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
        return result //саме цей код забезпечить повернення результату функції
    }
   console.log(capitalize("cANBerRa")) //Canberra
}

// Map Capitalize

{
    const capitalize = str => {
        let result = str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
        return result //саме цей код забезпечить повернення результату функції
    }

    let userStr = prompt("input smth").split(" ");
    let result = userStr.map(capitalize).join(" ");
    console.log(result);
}

// Filter Lexics

{
    let userStr = prompt("input smth").split(" ");
    const banWords = ["пиво", "горілка", "вино"];
    let result = userStr.filter(ban => !banWords.includes(ban)).join(" ");
    console.log(result);
}

// Beep Lexics

{
    let userStr = prompt("input smth").split(" ");
    const banWords = ["пиво", "горілка", "вино"];
    let result = userStr.map(ban => banWords.includes(ban) ? "BEEP" : ban).join(" ");
    console.log(result);
}

// Reduce HTML

{
    const currencies = ["USD", "EUR", "GBP", "UAH"];
    let str = "<select>";
    str += currencies.reduce((a,b) => a + `<option>${b}</option>`, "");
    str += "</select>";
    document.write(str);
}

// For Brackets Hell Check

{
    const line = prompt();
    const bracketsStack = [];
    let i = 0;

    for (const character of line) {
        // Ігноруємо всі символи, крім трьох видів дужок
        if (character === '[' || character === '(' || character === '{') {
            bracketsStack.push({ character, index: i });
        }
        else if (character === ']' || character === ')' || character === '}') {
            // Перевіряємо відповідність закриваючих дужок
            if (bracketsStack.length === 0) {
                console.log(`Помилка на позиції ${i}`);
                break;
            }

            const lastOpeningBracket = bracketsStack.pop();

            if (
                (character === ']' && lastOpeningBracket.character !== '[') ||
                (character === ')' && lastOpeningBracket.character !== '(') ||
                (character === '}' && lastOpeningBracket.character !== '{')
            ) {
                console.log(`Помилка на позиції ${i}`);
                break;
            }
        }
        i++;
    }
}