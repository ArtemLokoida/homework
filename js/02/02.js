// evaluation

var a = (5);  
var b, c;

b = ((a) * (5));  
b = ((c) = ((b)/(2)));

// age

var Age = prompt("Ваш вік?");
alert("Ваш рік народження - " + (2023 - Age));

// temperature

var CelDegrees = prompt("Вкажіть температуру в градусах Цельсія.");
alert("Температура в градусах Фаренгейта - " + ((CelDegrees * 9/5) + 32));

var FahrDegrees = prompt("Вкажіть температуру в градусах Фаренгейта.");
alert("Температура в градусах Цельсія - " + ((FahrDegrees - 32) * 5/9));

// divide

var FirstNumber = prompt("Вкажіть перше число.");
var SecondNumber = prompt("Вкажіть друге число.");

alert("Результат поділу націло - "  + Math.floor(FirstNumber / SecondNumber));

// currency

const rate = 36.24;
var uah = prompt("Вкажіть суму в гривнях.");

alert(uah + " грн. - " + (uah/rate).toFixed(2) + "$");

// RGB

var red = prompt("Вкажіть значення червоного (від 0 до 255).");
var green = prompt("Вкажіть значення зеленого (від 0 до 255).");
var blue = prompt("Вкажіть значення синього (від 0 до 255).");

red = parseFloat(red).toString(16);
green = parseFloat(green).toString(16);
blue = parseFloat(blue).toString(16);

var CssColor = ("#" + red + green + blue);
alert("Css-color: " + CssColor);

// flats

var Floors = prompt("Яка кількість поверхів?");
var Flats = prompt("Яка кількість квартир на поверсі?");
var FlatNumber = prompt("Який номер квартири?");

var AnswerPadik = Math.ceil(FlatNumber / (Floors * Flats));
var AnswerFloor = Math.ceil((FlatNumber % (Floors * Flats)) / Flats);

alert("Квартира знаходиться на " + AnswerFloor + "-му поверсі " + AnswerPadik + "-го під'їзду.");