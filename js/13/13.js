// Person Constructor

{
    function Person(name, surname){
        this.name = name
        this.surname = surname
        this.getFullName = () => `${this.name} ${this.fatherName ? this.fatherName + " " : ""}${this.surname}`
        return this
    }
}

// Person Prototype

{
    function Person(name, surname){
        this.name = name
        this.surname = surname
        return this
    }

    Person.prototype.getFullName = function(){
        return `${this.name} ${this.fatherName ? this.fatherName + " " : ""}${this.surname}`
    }
}

// Store

{
    function Store(reducer){
        let state = reducer(undefined, {}) //стартова ініціалізація стану, запуск редьюсера зі state === undefined
        let cbs = [] //масив пiдписникiв

        this.getState = function(){
            return state
        }
        this.subscribe = function(cb){
            cbs.push(cb)
            return function(){
                cbs = cbs.filter(c => c !== cb)
            }
        }
        this.dispatch = function(action){ 
            const newState = reducer(state, action) //пробуємо запустити редьюсер
            if (newState !== state){ //перевіряємо, чи зміг ред'юсер обробити action
                state = newState //якщо зміг, то оновлюємо state 
                for (let cb of cbs)  cb() //та запускаємо пiдписникiв
            }
        }
    }
}

// Password

{
    function Password(parent, open){
        const passwordInput = document.createElement("input")
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
            this.onChange(passwordInput.value)
        })
        passwordCheckbox.addEventListener("change", () => {
            isOpen = !isOpen
            swichMode()
            this.onOpenChange(isOpen)
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

    let p = new Password(document.body, true)

    p.onChange = data => console.log(data)
    p.onOpenChange = open => console.log(open)
}

// LoginForm

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

    const parent = document.body

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
}

// LoginForm Constructor

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
}

// Password Verify

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

    const parent = document.body

    const password = new Password(parent, false)

    parent.appendChild(document.createElement("br"))

    const passwordVerifyInput = document.createElement("input")
    passwordVerifyInput.placeholder = "Verify password"
    passwordVerifyInput.type = "password"
    passwordVerifyInput.style.visibility = password.getOpen() ? "hidden" : "visible"
    parent.appendChild(passwordVerifyInput)

    password.onOpenChange = function(){
        passwordVerifyInput.style.visibility = password.getOpen() ? "hidden" : "visible"
    }

    passwordVerifyInput.oninput = password.onChange = function(){
        if (passwordVerifyInput.value !== password.getValue()){
            password.setStyle("border: solid 1px red")
            passwordVerifyInput.style = "border: solid 1px red"
        }
        else{
            password.setStyle("")
            passwordVerifyInput.style = ""
        }
    }
}