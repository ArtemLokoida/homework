// makeProfileTimer

{
    function makeProfileTimer(){
        const startTime = performance.now()
        
        return function(){
            const endTime = performance.now()
            return endTime - startTime
        }
    }
}

// makeSaver

{
    function makeSaver(func){
        let result
        return function(){
            if (result === undefined){
                result = func()
            }
            return result
        }
    }
}

// myBind

{
    function myBind(func, context, defaultValues){
        return function(...params){
            const finalParams = []
            let paramIndex = 0;

            for(let i = 0; i < defaultValues.length; i++){
                finalParams.push(defaultValues[i] === undefined ? params[paramIndex++] : defaultValues[i])
            }
            return func.apply(context, finalParams)
        }
    }
}

// checkResult

{
    function checkResult(original, validator) {
        function wrapper(...params) {
            let result;
            do {
                result = original.call(this, ...params);
            } while (!validator(result));
            return result;
        }
        return wrapper;
    }

    const RandomHigh = checkResult(() => Math.random(), x => x >= 0.5 && x <= 1)
    const AlwaysSayYes = checkResult(confirm, x => x)
    const respectMe = checkResult(credentials, credentials => credentials.name && credentials.surname && credentials.fatherName)
    
    const credentials = () => {
        const capitalize = str => result = str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();

        const name = capitalize(prompt("Ваше ім'я?").trim());
        const surname = capitalize(prompt("Ваше призвіще?").trim());
        const fatherName = capitalize(prompt("Ваше ім'я по батькові?").trim());
        const fullName = (`${surname} ${name} ${fatherName}`);
        
        return {name, surname, fatherName, fullName}
    }
}