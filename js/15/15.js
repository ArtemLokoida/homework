 // fetch basic

{
    function displayJSON(domElement, jsonData){
        const table = document.createElement('table')
        table.style.border = '1px solid black';
        table.style.borderCollapse = 'collapse';

        for (const key in jsonData){
            const tr = document.createElement('tr')

            const tdKey = document.createElement('td')
            tdKey.textContent = key
            tdKey.style.border = '1px solid black';
            tr.append(tdKey)

            const tdValue = document.createElement('td')
            tdValue.textContent = jsonData[key]
            tdValue.style.border = '1px solid black';
            tr.append(tdValue)

            table.append(tr)
        }
        domElement.append(table)
    }

    fetch('https://swapi.dev/api/people/1/')
        .then(res => res.json())
        .then(data => displayJSON(document.body, data))
}

// fetch improved

{
    function displayJSON(domElement, jsonData){
        const table = document.createElement('table')
        table.style.border = '1px solid black';
        table.style.borderCollapse = 'collapse';

        for (const key in jsonData){
            const tr = document.createElement('tr')

            const tdKey = document.createElement('td')
            tdKey.textContent = key
            tdKey.style.border = '1px solid black';
            tr.append(tdKey)

            if (typeof jsonData[key] === 'string' && jsonData[key].includes('https://swapi.dev/api/')){
                const button = document.createElement('button')
                button.textContent = 'Load data'
                button.onclick = () => {
                    fetch(jsonData[key])
                    .then(res => res.json())
                    .then(data => displayJSON(domElement, data))
                }
                tr.append(button)
            }
            else if(Array.isArray(jsonData[key])){
                for (const value of jsonData[key]){
                    const button = document.createElement('button')
                    button.textContent = 'Load data'
                    button.onclick = () => {
                        fetch(value)
                        .then(res => res.json())
                        .then(data => displayJSON(domElement, data))
                    }
                    tr.append(button)
                }
            }
            else{
                const tdValue = document.createElement('td')
                tdValue.textContent = jsonData[key]
                tdValue.style.border = '1px solid black';
                tr.append(tdValue)
            }
            table.append(tr)
            domElement.append(table)
        }
    }

    fetch('https://swapi.dev/api/people/1/')
        .then(res => res.json())
        .then(data => displayJSON(document.body, data))
}

// race

{
    function delay(ms){ 
        function executor(fulfill, reject){
            setTimeout(() => fulfill(`Delay: ${ms} ms`), ms);
        }
        return new Promise(executor);
    }

    function fetchFunc(){
        return fetch('https://swapi.dev/api/people/1/')
          .then(res => res.json());
      }

    Promise.race([fetchFunc(), delay(Math.random() * 500)])
        .then(result => console.log(result))
}

// Promisify: confirm

{
    function confirmPromise(text){
        return new Promise((resolve, reject) => {
             const userConfirm = confirm(text)
            if (userConfirm){
                resolve()
            }
            else {
                reject()
            }
        }) 
   }
   
   confirmPromise('Проміси це складно?').then(() => console.log('не так вже й складно'))
                                        .catch(() => console.log('respect за посидючість і уважність'))
}

// Promisify: prompt

{
    function promptPromise(text){
        return new Promise((resolve, reject) => {
            const userPrompt = prompt(text)
            if (userPrompt){
                resolve(userPrompt)
            }
            else {
                reject()
            }
        }) 
   }
   
    promptPromise("Як тебе звуть?").then(name => console.log(`Тебе звуть ${name}`))
                                    .catch(() => console.log('Ну навіщо морозитися, нормально ж спілкувалися'))
}

// Promisify: LoginForm

{
    function Password(parent, open){
        const passwordInput = document.createElement("input")
        passwordInput.placeholder = "Input password"
        passwordInput.type = open ? "text" : "password"
        parent.appendChild(passwordInput)

        const passwordCheckbox = document.createElement("input")
        passwordCheckbox.type = "checkbox"
        passwordCheckbox.checked = open ? true : false;
        parent.appendChild(passwordCheckbox)

        let isOpen = open

        function swichMode(){
            if (isOpen) {
                passwordInput.type = "text"
                passwordCheckbox.checked = true
            }
            else {
                passwordInput.type = "password"
                passwordCheckbox.checked = false
            }
        }

        passwordInput.addEventListener("input", () => {
            if (typeof this.onChange === "function"){
                this.onChange(passwordInput.value)
            }
        })
        passwordCheckbox.addEventListener("change", () => {
            isOpen = !isOpen
            swichMode()
            if (typeof this.onOpenChange === "function"){
                this.onOpenChange(isOpen)
            }
        })

        this.setValue = function(value){
            passwordInput.value = value
        }
        this.getValue = function(){
            return passwordInput.value
        }
        this.setOpen = function(boolean){
            isOpen = boolean
            swichMode()
        }
        this.getOpen = function(){
            return isOpen
        }
        this.setStyle = function(style){
            passwordInput.style = style
        }
    }

    function LoginForm(parent){
        const loginInput = document.createElement("input")
        loginInput.placeholder = "Input login"
        parent.appendChild(loginInput)

        const password = new Password(parent, false)

        const loginButton = document.createElement("button")
        loginButton.disabled = true
        loginButton.textContent = "Login"
        parent.appendChild(loginButton)

        function checkInput(){
            loginButton.disabled = loginInput.value.trim() === "" || password.getValue().trim() === ""
        }
        loginInput.addEventListener("input", checkInput)
        password.onChange = checkInput

        loginButton.onclick = () => {
            if (typeof this.onLoginClick === "function"){
                this.onLoginClick()
            }
        }

        this.setLogin = function(value){
            loginInput.value = value
        }
        this.getLogin = function(){
            return loginInput.value
        }
        this.setPassword = function(value){
            password.setValue(value)
        }
        this.getPassword = function(){
            return password.getValue()
        }
        this.setOpen = function(boolean){
            password.setOpen(boolean)
        }
        this.getOpen = function(){
            return password.getOpen()
        }
        this.setPasswordStyle = function(style){
            password.setStyle(style)
        }
    }

    function loginPromise(parent){
        function executor(resolve, reject){
            const form = new LoginForm(parent)
            form.onLoginClick = function(){
                const login = form.getLogin()
                const password = form.getPassword()
                resolve({login, password})
            }
        }
        
        return new Promise(executor)
    }
    
    loginPromise(document.body).then(({login, password}) => console.log(`Ви ввели ${login} та ${password}`))
}