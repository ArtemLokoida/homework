const credentials = {
    login: 'admin',
    password: 'qwerty',
};

function login() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    const enteredUsername = usernameInput.value;
    const enteredPassword = passwordInput.value;

    if (enteredUsername === credentials.login && enteredPassword === credentials.password) {
        displayResult('success', 'Success!');
    } else {
        displayResult('error', 'Error!');
    }
}

function displayResult(type, message) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = message;
    resultDiv.className = type;
}