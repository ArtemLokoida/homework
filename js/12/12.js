function reducer(state, {type, ЩО, СКОКА, кошти}){ //об'єкт action деструктуризується на три змінні
    if (!state){ //початкове прибирання в кіоску:
        return {
            пиво: {count: 100, price: 40},
            чіпси: {count: 100, price: 60},
            сіги: {count: 100, price: 90},
            каса: 0
        }
    }
    if (type === 'КУПИТИ' && state[ЩО].price * СКОКА <= кошти && state[ЩО].count >= СКОКА && СКОКА > 0){ //якщо тип action - КУПИТИ, то:
        return {
            ...state, //беремо все що було з асортименту
            [ЩО]: {count: state[ЩО].count - СКОКА, price: state[ЩО].price}, //і зменшуємо те, що купується на кількість
            каса: state.каса + (state[ЩО].price * СКОКА)
        }
    }
    return state //якщо ми не зрозуміли, що від нас просять в `action` - залишаємо все як є
}

function createStore(reducer){
    let state = reducer(undefined, {}) //стартова ініціалізація стану, запуск редьюсера зі state === undefined
    let cbs = [] //масив пiдписникiв
    
    const getState = () => state //функція, що повертає змінну із замикання
    const subscribe = cb => (cbs.push(cb), //запам'ятовуємо пiдписника у масиві
                            () => cbs = cbs.filter(c => c !== cb)) //повертаємо функцію unsubscribe, яка видаляє пiдписника зі списку
                             
    const dispatch = action => { 
        const newState = reducer(state, action) //пробуємо запустити редьюсер
        if (newState !== state){ //перевіряємо, чи зміг ред'юсер обробити action
            state = newState //якщо зміг, то оновлюємо state 
            for (let cb of cbs)  cb() //та запускаємо пiдписникiв
        }
    }
    
    return {
        getState, //додавання функції getState в результуючий об'єкт
        dispatch,
        subscribe //додавання subscribe в об'єкт
    }
}

const store = createStore(reducer)

function updateStore(){
    const state = store.getState()
    cash.innerText = `Каса: ${state.каса} грн.`
    document.title = `Каса: ${state.каса} грн.`

    const productsList = document.getElementById("productsList")
    productsList.innerText = ""

    for (const product in state){
        if (product !== "каса"){
            const productsItem = document.createElement("li")
            productsItem.innerText = `${product}: ${state[product].count} шт.`
            productsList.appendChild(productsItem)
        }
    }
}

store.subscribe(updateStore)

const selectElement = document.getElementById("productSelect")
const amountInput = document.getElementById("amountInput")
const buyButton = document.getElementById("buyButton")
const moneyInput = document.getElementById("moneyInput")

buyButton.onclick = () => {
    const selectedProduct = selectElement.value
    const amount = parseInt(amountInput.value)
    const money = moneyInput.value

    store.dispatch({
        type: "КУПИТИ",
        ЩО: selectedProduct,
        СКОКА: amount,
        кошти: money
    })
}

updateStore()