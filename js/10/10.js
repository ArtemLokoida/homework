// Arrow to Functions

{
{
    function rgb(r, g, b){
        return ('#' + 
        (r < 16 ? '0' + r.toString(16) : r.toString(16)) + 
        (g < 16 ? '0' + g.toString(16) : g.toString(16)) + 
        (b < 16 ? '0' + b.toString(16) : b.toString(16))).toUpperCase()
    }
}

{
    function flats(floors, flats, flatNumber){
        const obj = {
            entrance : Math.ceil(flatNumber / (floors * flats)),
            floor : Math.ceil((flatNumber % (floors * flats)) / flats)
        }
        return obj
    }
}

{
    function capitalize(str){
        let result = str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
        return result;
    }

    function credentials(){
    const name = capitalize(prompt("Ваше ім'я?").trim());
    const surname = capitalize(prompt("Ваше призвіще?").trim());
    const fatherName = capitalize(prompt("Ваше ім'я по батькові?").trim());
    const fullName = (`${surname} ${name} ${fatherName}`);
    
    return {name, surname, fatherName, fullName}
    }
}

{
    function authorization(login, password){
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

{
    function table(arr){
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
}

// createPerson

{
    function createPerson(name, surname){
        const obj = {
            name: name,
            surname: surname,
            getFullName: function(){
                return `${this.name} ${this.fatherName ? this.fatherName + " " : ""}${this.surname}`
            }
        }
        return obj
    }
}

// createPersonClosure

{
    function createPersonClosure(name, surname){
        let age
        let fatherName

        const validation = /^[А-ЯІЇЄҐ][а-яіїєґ']{0,}$/

        function getName(){
            return name
        }
        function getSurname(){
            return surname
        }
        function getFatherName(){
            return fatherName
        }
        function getAge(){
            return age
        }
        function getFullName(){
            return `${surname} ${name}${fatherName ? " " + fatherName : ""}`
        }

        function setName(newName){
            if (validation.test(newName)){
                name = newName
            }
            return getName()
        }
        function setSurname(newSurname){
            if (validation.test(newSurname)){
                surname = newSurname
            }
            return getSurname()
        }
        function setFatherName(newFatherName){
            if (validation.test(newFatherName)){
                fatherName = newFatherName
            }
            return getFatherName()
        }
        function setAge(newAge){
            if (newAge >= 0 && 100 >= newAge) {
                age = newAge
            }
            return getAge()
        }
        function setFullName(newFullName){
            const splitedFN = newFullName.split(" ")
            setSurname(splitedFN[0])
            setName(splitedFN[1])
            setFatherName(splitedFN[2])
            
            return getFullName()
        }

        return {
            getName,
            getSurname,
            getFatherName,
            getAge,
            getFullName,
            setName,
            setSurname,
            setFatherName,
            setAge,
            setFullName,
          }
    }
}

// createPersonClosureDestruct

{
    function createPersonClosureDestruct({name = "Кирило", surname = "Буданов", fatherName = "Олексійович", age = 38} = {}){
        const validation = /^[А-ЯІЇЄҐ][а-яіїєґ']{0,}$/

        function getName(){
            return name
        }
        function getSurname(){
            return surname
        }
        function getFatherName(){
            return fatherName
        }
        function getAge(){
            return age
        }
        function getFullName(){
            return `${surname} ${name}${fatherName ? " " + fatherName : ""}`
        }

        function setName(newName){
            if (validation.test(newName)){
                name = newName
            }
            return getName()
        }
        function setSurname(newSurname){
            if (validation.test(newSurname)){
                surname = newSurname
            }
            return getSurname()
        }
        function setFatherName(newFatherName){
            if (validation.test(newFatherName)){
                fatherName = newFatherName
            }
            return getFatherName()
        }
        function setAge(newAge){
            if (newAge >= 0 && 100 >= newAge) {
                age = newAge
            }
            return getAge()
        }
        function setFullName(newFullName){
            const splitedFN = newFullName.split(" ")
            setSurname(splitedFN[0])
            setName(splitedFN[1])
            setFatherName(splitedFN[2])
            
            return getFullName()
        }

        return {
            getName,
            getSurname,
            getFatherName,
            getAge,
            getFullName,
            setName,
            setSurname,
            setFatherName,
            setAge,
            setFullName,
          }
    }

    function createPerson(name, surname){
        const obj = {
            name: name,
            surname: surname,
            getFullName: function(){
                return `${this.name} ${this.fatherName ? this.fatherName + " " : ""}${this.surname}`
            }
        }
        return obj
    }
}

// isSorted

{
    function isSorted(...params){
        for (let i = 0; i < params.length; i++){
            if (!(typeof params[i] === "number")){
                return false
            }
            else if (params[i] >= params[i + 1]) {
                return false
            }
        }
        return true
    }
}

// Test isSorted

{
    function isSorted(...params){
        for (let i = 0; i < params.length; i++){
            if (!(typeof params[i] === "number")){
                return false
            }
            else if (params[i] >= params[i + 1]) {
                return false
            }
        }
        return true
    }

    let arr = []
    let userValue
    while (userValue = +prompt("fill array")) {
        arr.push(userValue)
        console.log(arr)
        console.log("Array is sorted - " + isSorted(...arr))
    }
    console.log(arr)
}

// personForm

{
    function personForm(parent, person){
        nameInput = document.createElement("input")
        nameInput.value = person.getName()
        parent.append(nameInput)
        nameInput.oninput = () => {
            nameInput.value = person.setName(nameInput.value)
            fullNameInput.value = person.getFullName()
        }

        surnameInput = document.createElement("input")
        surnameInput.value = person.getSurname()
        parent.append(surnameInput)
        surnameInput.oninput = () => {
            surnameInput.value = person.setSurname(surnameInput.value)
            fullNameInput.value = person.getFullName()
        }

        fatherNameInput = document.createElement("input")
        fatherNameInput.value = person.getFatherName()
        parent.append(fatherNameInput)
        fatherNameInput.oninput = () => {
            fatherNameInput.value = person.setFatherName(fatherNameInput.value)
            fullNameInput.value = person.getFullName()
        }

        ageInput = document.createElement("input")
        ageInput.value = person.getAge()
        parent.append(ageInput)
        ageInput.oninput = () => {
            ageInput.value = person.setAge(ageInput.value)
        }

        fullNameInput = document.createElement("input")
        fullNameInput.value = person.getFullName()
        parent.append(fullNameInput)
        fullNameInput.oninput = () => {
            person.setFullName(fullNameInput.value)
            nameInput.value = person.getName()
            surnameInput.value = person.getSurname()
            fatherNameInput.value = person.getFatherName()
        }
    }
}

// getSetForm

{
    let car;
    {
        let brand = 'BMW', model = 'X5', volume = 2.4
        car = {
            getBrand(){
                return brand
            },
            setBrand(newBrand){
                if (newBrand && typeof newBrand === 'string'){
                    brand = newBrand
                }
                return brand
            },
            
            getModel(){
                return model
            },
            setModel(newModel){
                if (newModel && typeof newModel === 'string'){
                    model = newModel
                }
                return model
            },
            
            getVolume(){
                return volume
            },
            setVolume(newVolume){
                newVolume = +newVolume
                if (newVolume && newVolume > 0 && newVolume < 20){
                    volume = newVolume
                }
                return volume
            },
            
            getTax(){
                return volume * 100
            }
        }
    }

    function getSetForm(parent, getSet){
        const inputs = {} //реєстр
        
        const updateInputs = () => { //функція оновлення полів введення відповідно до будь-яких get....
            for (const fieldName in inputs) {
                const getKey = 'get' + fieldName;
                if (getSet[getKey]) {
                    inputs[fieldName].value = getSet[getKey]();
                }
            }
        }
        
        for (const getSetName in getSet){
            if (getSetName.startsWith("get")) {
                const fieldName = getSetName.slice(3)
                const setKey = `set` + fieldName
                const input = document.createElement("input")
                input.placeholder = fieldName
                input.oninput = () => {
                    if (getSet[setKey]) {
                        getSet[setKey](input.value)
                        updateInputs()
                    }
                }
                inputs[fieldName] = input;
                parent.appendChild(input);
            }
        }
        updateInputs()
    }
}