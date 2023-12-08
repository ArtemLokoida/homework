// greeting

{
    let name = prompt("Ваше ім'я?");
    alert(`Привіт ${name}!`);
}

// gopni4ek

{
    let quote = prompt('Ваша улюблена цитата?');
    let split = quote.split(',');
    let join = split.join(", блин,")
    console.log(join);
}

// capitalize

{
    let str = prompt('Введіть щось.');
    let result = str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
    console.log(result);
}

// word count

{
    let str = "Word word word word word.";
    let strArr = str.split(" ");
    let lengthArr = strArr.length;
    console.log(lengthArr);
}

// credentials

{
    let surname = prompt("Ваше призвіще?").trim();
    let name = prompt("Ваше ім'я?").trim();
    let fatherName = prompt("Ваше ім'я по батькові?").trim();

    let resultSurname = surname.slice(0, 1).toUpperCase() + surname.slice(1).toLowerCase();
    let resultName = name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase();
    let resultFatherName = fatherName.slice(0, 1).toUpperCase() + fatherName.slice(1).toLowerCase();

    let fullName = (`${resultSurname} ${resultName} ${resultFatherName}`);
    console.log(fullName);
}

// beer

{
    let str = "Було жарко. Василь пив пиво вприкуску з креветками";
    let strArr = str.split(" ");
    let beerIndex = strArr.indexOf("пиво");
    strArr[beerIndex] = "чай";

    let result = strArr.join(" ");
    console.log(result); //"Було жарко. Василь пив чай уприкуску з креветками"
}

// no tag
{
    let str = "якийсь текст, в якому є один тег <br /> і всяке інше";
    let tagStart = str.indexOf("<");
    let tagEnd = str.indexOf(">");

    let result = str.slice(0, tagStart) + str.slice(tagEnd+1);
    console.log(result); //якийсь текст, в якому є один тег і всяке інше
}

// big tag

{
    let str = "якийсь текст, в якому є один тег <br /> і всяке інше";
    let tagStart = str.indexOf("<");
    let tagEnd = str.indexOf(">");

    let result = str.slice(0, tagStart) + str.slice(tagStart, tagEnd+1).toUpperCase() + str.slice(tagEnd+1);
    console.log(result); //якийсь текст, в якому є один тег <BR /> і всяке інше
}

// new line

{
    let str = prompt("Введіть щось (можно вводити \\n як маркер нового рядка).");
    let strArr = str.split("\\n ");
    let result = strArr.join("\n");

    alert(result);
}

// youtube

{
    let inputLink = prompt("Введіть посилання на Youtube-відео.");
    let regularExp = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;
    let identificator = inputLink.match(regularExp);

    document.write(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${identificator[1]}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`);
}