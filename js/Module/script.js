function getGQL(url) {
    function gql(query, variables = {}) {
        return fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                ...("token" in store.getState().auth ? { Authorization: `Bearer ${store.getState().auth.token}` } : null)
            },
            body: JSON.stringify({ query, variables })
        })
            .then(res => res.json())
            .then(r => {
                if (r.data) {
                    const result = Object.values(r.data)[0]
                    return result
                }
                throw new Error(r.data.errors[0].message)
            })
            .catch(error => console.log(error))
    }
    return gql
}

const gql = getGQL("http://shop-roles.node.ed.asmer.org.ua/graphql")

function createStore(reducer){
    let state       = reducer(undefined, {}) //стартовая инициализация состояния, запуск редьюсера со state === undefined
    let cbs         = []                     //массив подписчиков
    
    const getState  = () => state            //функция, возвращающая переменную из замыкания
    const subscribe = cb => (cbs.push(cb),   //запоминаем подписчиков в массиве
                             () => cbs = cbs.filter(c => c !== cb)) //возвращаем функцию unsubscribe, которая удаляет подписчика из списка
                             
    const dispatch  = action => { 
        if (typeof action === 'function'){ //если action - не объект, а функция
            return action(dispatch, getState) //запускаем эту функцию и даем ей dispatch и getState для работы
        }
        const newState = reducer(state, action) //пробуем запустить редьюсер
        if (newState !== state){ //проверяем, смог ли редьюсер обработать action
            state = newState //если смог, то обновляем state 
            for (let cb of cbs)  cb(state) //и запускаем подписчиков
        }
    }
    
    return {
        getState, //добавление функции getState в результирующий объект
        dispatch,
        subscribe //добавление subscribe в объект
    }
}

const jwtDecode = (token) => {
    try {
        return JSON.parse(atob((token.split('.'))[1]))
    }
    catch {
        return undefined
    }
}

function localStoredReducer(originalReducer, localStorageKey){
    function wrapper(state, action){
        if (state === undefined){
            try{
                return JSON.parse(localStorage[localStorageKey]) 
            }
            catch{}
        }

        const newState = originalReducer(state, action)
        localStorage[localStorageKey] = JSON.stringify(newState)
        return newState
    }
    return wrapper
}

function combineReducers(reducers){
    function totalReducer(state={}, action){
        const newTotalState = {}
        for (const [reducerName, reducer] of Object.entries(reducers)){
            const newSubState = reducer(state[reducerName], action)
            if (newSubState !== state[reducerName]){
                newTotalState[reducerName] = newSubState
            }
        }
        if (Object.keys(newTotalState).length){
            return {...state, ...newTotalState}
        }
        return state
    }

    return totalReducer
}

const reducers = {
    promise: promiseReducer,
    auth: localStoredReducer(authReducer, 'auth'),
    cart: localStoredReducer(cartReducer, 'cart'),
}

const totalReducer = combineReducers(reducers) 

function promiseReducer(state={}, action){
    const {namePromise, type, status, payload, error} = action
    if (type === 'PROMISE'){
        return {
            ... state,
            [namePromise]: {
                type,
                status,
                payload,
                error
            }
        }

    }
    return state
}

const actionPending = namePromise => ({namePromise, type: 'PROMISE', status: 'PENDING'})
const actionFulfilled = (namePromise ,payload) => ({namePromise, type: 'PROMISE', status: 'FULFILLED', payload})
const actionRejected = (namePromise ,error) => ({namePromise, type: 'PROMISE', status: 'REJECTED',  error})

const actionPromise = (namePromise, promise) => async dispatch => {
    dispatch(actionPending(namePromise))

    try {
        const payload = await promise
        dispatch(actionFulfilled(namePromise, payload))
        return payload
    } catch(error) {
        dispatch(actionRejected(namePromise, error))
    }
}

function authReducer(state={}, action){
    const {type, token} = action
    if (type === 'AUTH_LOGIN'){
        try{
            const payload = jwtDecode(token)
            return {
                token,
                payload
            }
        }
        catch(error){
            console.log('authReducer error: ', error)
            return {}
        }
    }
    if (type === 'AUTH_LOGOUT'){
        return {}
    }

    return state
}

const actionAuthLogin  = token => ({type: 'AUTH_LOGIN', token})
const actionAuthLogout = ()    => ({type: 'AUTH_LOGOUT'})

function cartReducer(state = {}, action) {
    const { type, count, good } = action

    if (type === 'CART_ADD') {
        if (state[good._id]) {
            return {
                ...state,
                [good._id]: {
                    ...state[good._id],
                    count: state[good._id].count + count,
                    good
                }
            }
        }
        return {
            ...state,
            [good._id]: { count, good }
        }
    }

    if (type === 'CART_SUB' && state[good._id]) {
        if (state[good._id].count > count) {
            return {
                ...state,
                [good._id]: {
                    ...state[good._id],
                    count: state[good._id].count - count,
                    good
                }
            }
        }
        const newState = { ...state }
        delete newState[good._id]
        return newState
    }

    if (type === 'CART_DEL' && state[good._id]) {
        const newState = { ...state }
        delete newState[good._id]
        return newState
    }

    if (type === 'CART_SET') {
        if (count > 0) {
            return {
                ...state,
                [good._id]: {
                    count,
                    good
                }
            }
        }
        const newState = { ...state }
        delete newState[good._id]
        return newState
    }

    if (type === 'CART_CLEAR') {
        return {}
    }

    return state
}

const actionCartAdd = (good, count=1) => ({type: 'CART_ADD', count, good})
const actionCartSub = (good, count=1) => ({type: 'CART_SUB', count, good})
const actionCartDel = (good) => ({type: 'CART_DEL', good})
const actionCartSet = (good, count=1) => ({type: 'CART_SET', count, good})
const actionCartClear = () => ({type: 'CART_CLEAR'})



const store = createStore(totalReducer) //не забудьте combineReducers если он у вас уже есть
store.subscribe(() => console.log(store.getState()))

const drawCategory = () => {
    const [,route] = location.hash.split('/')
    if (route !== 'category') return

    const {status, payload, error} = store.getState().promise.categoryById || {}
    if (status === 'PENDING'){
        main.innerHTML = `<img src='https://cdn.dribbble.com/users/63485/screenshots/1309731/infinite-gif-preloader.gif' />`
    }
    if (status === 'FULFILLED'){
        const {name, goods} = payload
        main.innerHTML = `<h1>${name}</h1>`
        for (const {_id, name, price, images} of goods) {
            const good = document.createElement('div')
            main.append(good)

            good.innerHTML = `
            <a href = "#/good/${_id}">${name}</a>
            <div><img style= "max-width:50vw" src="http://shop-roles.node.ed.asmer.org.ua/${images && images[0] && images[0].url}"></div>
            <p>Цена: ${price}</p>
            `

            const buyBtn = document.createElement('button')
            buyBtn.textContent = 'Купити'
            
            buyBtn.addEventListener('click', () => {
                store.dispatch(actionCartAdd({_id, name, price, images}))
            })

            good.append(buyBtn)
        }
    }
}

store.subscribe(drawCategory)

store.subscribe(() => {
    const [,route] = location.hash.split('/')
    if (route !== 'good') return

    const {status, payload, error} = store.getState().promise.goodById || {}
    if (status === 'PENDING'){
        main.innerHTML = `<img src='https://cdn.dribbble.com/users/63485/screenshots/1309731/infinite-gif-preloader.gif' />`
    }
    if (status === 'FULFILLED'){
        const {name, price, _id, description, images} = payload
        main.innerHTML = `
        <h3>${name}</h3>
        `
        for (const {url} of images || [] ) {
            main.innerHTML += `<div><img style= "max-width:20vw" src="http://shop-roles.node.ed.asmer.org.ua/${url}"></div>`
        }

        main.innerHTML += `
        <p>${description}</p>
        <p>Цена: ${price}</p>
        `
        const buyBtn = document.createElement('button')
        buyBtn.textContent = 'Купити'

        buyBtn.addEventListener('click', () => {
            store.dispatch(actionCartAdd({_id, name, price, images}))
        })

        main.append(buyBtn)
    }
})

const drawLoginForm = () => {
    const [,route] = location.hash.split('/')
    if (route !== 'login') return

    main.innerHTML = `
    <h2>Вхід</h2>
    <a>Логін: </a><input id="loginInput" type="text" placeholder="user1"></br>
    <a>Пароль: </a><input id="passwordInput" type="password" placeholder="qwerty123">
    <input id="passwordCheckbox" type="checkbox"><a>Показати пароль</a></br>
    <button id="loginBtn" style="height: 30px; margin-top: 10px">Увійти</button>
    <p id = "loginInfo"></p>
    `

    document.getElementById('passwordCheckbox').addEventListener('change', () => passwordInput.setAttribute('type', (passwordCheckbox.checked ? 'text' : 'password')))

    document.getElementById('loginBtn').addEventListener('click', () => {
        const login = document.getElementById('loginInput').value
        const password = document.getElementById('passwordInput').value

        store.dispatch(actionFullLogin(login, password))
    })
}

const drawRegistrationForm = () => {
    const [,route] = location.hash.split('/')
    if (route !== 'register') return
    
    main.innerHTML = `
    <h2>Реєстрація</h2>
    <a>Логін: </a><input id="loginInput" type="text" placeholder="user1"></br>
    <a>Пароль: </a><input id="passwordInput" type="password" placeholder="qwerty123">
    <input id="passwordCheckbox" type="checkbox"><a>Показати пароль</a></br>
    <a>Пароль ще раз: </a><input id="passwordInput2" type="password" placeholder="qwerty123"></br>
    <button id="loginBtn" style="height: 30px; margin-top: 10px">Зареєструватися</button>
    <p id = "loginInfo"></p>
    `

    passwordCheckbox.addEventListener('change', () => passwordInput.setAttribute('type', (passwordCheckbox.checked ? 'text' : 'password')))

    document.getElementById('loginBtn').addEventListener('click', () => {
        const login = document.getElementById('loginInput').value
        const password = document.getElementById('passwordInput')
        const password2 = document.getElementById('passwordInput2')

        password.style.borderColor = ""
        password2.style.borderColor = ""

        if(password.value === password2.value){
            password.style.borderColor = ""
            password2.style.borderColor = ""

            store.dispatch(actionFullRegister(login, password.value))
        }
        else{
            password.style.borderColor = "red"
            password2.style.borderColor = "red"
        }
    })
}

const drawCart = () => {
    const [,route] = location.hash.split('/')
    if (route !== 'cart') return

    main.innerHTML = `
    <h2>Кошик</h2>
    <div id="cartGoods"></id>
    `

    let total = 0

    for (const [_id, goods] of Object.entries(store.getState().cart)) {
        const { count, good } = goods
        const { name, price, images } = good

        const cartGood = document.createElement('div')
        cartGood.style.marginBottom = '20px'

        const goodName = document.createElement('a')
        goodName.innerHTML = name
        goodName.style.display = 'block'
        goodName.href = `#/good/${_id}`

        const goodImg = document.createElement("img")
        goodImg.style = "max-width: 15vw; max-height: 15vw;"
        goodImg.src = images && images[0] && `http://shop-roles.node.ed.asmer.org.ua/${images[0].url}`

        const goodPrice = document.createElement("div")
        goodPrice.innerHTML = "Ціна: " + price * count

        const goodCountSub = document.createElement("button")
        goodCountSub.innerText = '-'

        goodCountSub.addEventListener('click', () => {
            if(goodCount.value > 1){
                goodCount.value -= 1
                store.dispatch(actionCartSub(good))
            }
            else{
                goodCount.value = 1
            }
            drawCart()
        })

        const goodCount = document.createElement("input")
        goodCount.style.maxWidth = "2em"
        goodCount.style.textAlign = 'center'
        goodCount.type = "number"
        goodCount.value = count

        goodCount.addEventListener('input', () => {
            if (goodCount.value < 1) {
                goodCount.value = 1
            }
            store.dispatch(actionCartSet(good, +goodCount.value))
            drawCart()
        })

        const goodCountAdd = document.createElement("button")
        goodCountAdd.innerText = '+'

        goodCountAdd.addEventListener('click', () => {
                goodCount.value = +goodCount.value + 1
                store.dispatch(actionCartAdd(good))
                drawCart()
        })

        const goodCountBtnDel = document.createElement("button")
        goodCountBtnDel.innerHTML = '&#x1F5F5;'
        goodCountBtnDel.style = 'padding: 0 0 0 20px; font-size: 30px; border: none; cursor: pointer; color: red; line-height: 0px; vertical-align: middle;'

        goodCountBtnDel.addEventListener('click', () => {
            store.dispatch(actionCartDel({_id}))
            drawCart()
        })

        cartGood.append(goodName)
        cartGood.append(goodImg)
        cartGood.append(goodPrice)
        cartGood.append(goodCountSub)
        cartGood.append(goodCount)
        cartGood.append(goodCountAdd)
        cartGood.append(goodCountBtnDel)
        cartGood.append(document.createElement('a').innerHTML = 'Видалити товар')

        cartGoods.append(cartGood)

        total += price * count
    }

    if (cartGoods.children.length !== 0) {
        cartGoods.append(document.createElement('a').innerHTML = `Загалом: ${total}`)
        cartGoods.append(document.createElement('br'))

        const checkoutBtn = document.createElement("button")
        checkoutBtn.innerText = "Оформити замовлення"
        checkoutBtn.style = "width: 8em; height: 3em; margin-right: 1em;"
        cartGoods.append(checkoutBtn)

        const cartClear = document.createElement("button")
        cartClear.innerText = "Очистити кошик"
        cartClear.style = "width: 8em; height: 3em;"
        cartGoods.append(cartClear)
            
        checkoutBtn.addEventListener("click", () => {
            if ('token' in store.getState().auth){
                store.dispatch(actionFullOrder())
                cartGoods.innerHTML = `<h4 style="color: green;">Замовлення оформлено!</h3>`
            }
            else{
                location.hash = '/login'
            }
        })

        cartClear.addEventListener("click", () => {
            store.dispatch(actionCartClear())
            drawCart()
        })
    }
    else{
        cartGoods.innerHTML = `<p>Додайте товар до кошика.</p>`
    }
}

const drawHistory = async () => {
    const [, route] = location.hash.split('/');
    if (route !== 'history') return;

    const main = document.getElementById('main');
    main.innerHTML = '';

    const h2 = document.createElement('h2');
    h2.textContent = 'Історія замовлень';
    main.appendChild(h2);

    await store.dispatch(actionOrderFind());

    const {status, payload, error } = store.getState().promise.orderFind;

    if (status === 'FULFILLED' && payload && payload.length > 0) {
        for (let i = payload.length - 1; i >= 0; i--) {
            const order = payload[i];
            const orderContainer = document.createElement('div');
            orderContainer.style.marginBottom = '30px'
            orderContainer.classList.add('order');

            const orderId = document.createElement('h3');
            orderId.textContent = `Замовлення: ${order._id}`;
            orderContainer.appendChild(orderId);

            const orderDate = document.createElement('p');
            const createdAt = new Date(parseInt(order.createdAt));
            orderDate.textContent = `Дата: ${createdAt.toLocaleString()}`;
            orderContainer.appendChild(orderDate);

            const orderTotal = document.createElement('p');
            orderTotal.textContent = `Загальна сума: ${order.total}`;
            orderContainer.appendChild(orderTotal);

            for (let j = 0; j < order.orderGoods.length; j++) {
                const orderGood = order.orderGoods[j];
                const orderGoodContainer = document.createElement('div');
                orderGoodContainer.classList.add('order-good');

                orderGoodContainer.appendChild(document.createElement('hr'));

                const goodName = document.createElement('p');
                goodName.textContent = `Товар: ${orderGood.goodName}`;
                orderGoodContainer.appendChild(goodName);

                const goodImg = document.createElement('img');
                goodImg.src = order.orderGoods[j].good.images && order.orderGoods[j].good.images[0] ? `http://shop-roles.node.ed.asmer.org.ua/${order.orderGoods[j].good.images[0].url}` : ''
                goodImg.style = "max-width: 15vw; max-height: 15vw;"
                orderGoodContainer.appendChild(goodImg);

                const price = document.createElement('p');
                price.textContent = `Ціна: ${orderGood.price}`;
                orderGoodContainer.appendChild(price);

                const count = document.createElement('p');
                count.textContent = `Кількість: ${orderGood.count}`;
                orderGoodContainer.appendChild(count);

                const total = document.createElement('p');
                total.textContent = `Сума: ${orderGood.total}`;
                orderGoodContainer.appendChild(total);

                orderContainer.appendChild(orderGoodContainer);
            }
            main.appendChild(orderContainer);
        }
    }
    else{
        main.innerHTML += '<p>У Вас ще немає замовлень.</p>';
    }
}

store.subscribe(() => {
    const {status, payload, error} = store.getState().promise.rootCats || {}
    if (status === 'FULFILLED' && payload){
        aside.innerHTML = ''
        for (const { _id, name} of payload){
            aside.innerHTML += `<a href="#/category/${_id}">${name}</a>`
        }
    }
})

store.subscribe(() => {
    const {payload, token} = store.getState().auth

    nick.textContent = 'Користувач: ' + (payload && payload.sub && payload.sub.login ? payload.sub.login : 'Anon')
    userDiv.style.display = (payload !== undefined ? 'block' : 'none')
    loginLink.style.display = (payload !== undefined ? 'none' : 'block')
    registerLink.style.display = (payload !== undefined ? 'none' : 'block')
    logoutLink.style.display = (payload !== undefined ? 'block' : 'none')
})

store.subscribe(() => {
    let totalCount = 0
    for(const good in store.getState().cart){
        totalCount += store.getState().cart[good].count
    }
    cartIcon.textContent = 'Кошик: ' + totalCount
})



const gqlRootCats = () =>
gql(
    `
    query roots{
        CategoryFind(query: "[{\\"main\\": null}]") {
            _id
            name
        }
    }
`)

const gqlCategoryById = (_id) => 
gql(
    `
    query roots1($q1: String) {
    CategoryFindOne(query: $q1) {
      _id
      name
      goods {
        _id
        name
        price
        images {
          _id
          text
          url
          originalFileName
        }
      }
      image {
        _id
        text
        url
        originalFileName
      }
    }
  }
`,
{q1: JSON.stringify([{_id}])}
)

const gqlGoodById = (_id) => 
gql(
    `
    query roots1($q1: String) {
    GoodFindOne(query: $q1) {
        _id
        name
        price
        description
        createdAt
        categories {
            _id
            createdAt
            name
        }
        images {
            _id
            createdAt
            text
            url
            originalFileName
        }
    }
  }
`,
{q1: JSON.stringify([{_id}])}
)

const gqlLogin = (login, password) => 
gql(
    `
    query login($login: String, $password: String){
        login(login: $login, password: $password)
    }
    `,
    {
        "login": login,
        "password": password
    }
)

const gqlRegister = (login, password) => 
gql(
    `
    mutation register($newUser: UserInput){
        UserUpsert(user: $newUser){
            _id
            login
        }
    }
    `,
    {
        "newUser": {
            "login": login,
            "password": password
        }
    }
)

const gqlOrderFind = () => 
    gql(
        `
        query orderFind{
            OrderFind(query: "[{}]"){
                _id
                total
                createdAt
                orderGoods{
                    _id
                    createdAt
                    price
                    count
                    goodName
                    good{
                        _id
                        images{
                            _id
                            text
                            url
                            originalFileName
                        }
                    }
                    total
                }
            }
        }
        `
    )

    const gqlOrderUpsert = (orderInput) => 
    gql(
        `
        mutation orderUpsert($orderInput: [OrderGoodInput]){
        OrderUpsert(order: {orderGoods: $orderInput}){
                _id
                total
                orderGoods{
                    good{
                        _id
                        name
                    }
                    count
                    total
                }
            }
        }
        `,
        {
            "orderInput": orderInput
        }
    )



const actionRootCats = () =>
    actionPromise('rootCats', gqlRootCats())

store.dispatch(actionRootCats())

const actionCategoryById = (_id) =>
    actionPromise('categoryById', gqlCategoryById(_id))

const actionGoodById = (_id) =>
    actionPromise('goodById', gqlGoodById(_id))

const actionLogin = (login, password) => 
    actionPromise('auth', gqlLogin(login, password))

const actionFullLogin = (login, password) =>
    async dispatch => {
            const token = await dispatch(actionLogin(login, password))

            if(typeof token === 'string'){
                dispatch(actionAuthLogin(token))
                location.hash = "#/category/6262ca7dbf8b206433f5b3d1"
            }
            else{
                document.getElementById('loginInfo').innerHTML = '<p style="color: red">Невірний логін або пароль!</p>'
            }
    }

const actionRegister = (login, password) =>
    actionPromise('register', gqlRegister(login, password))

const actionFullRegister = (login, password) =>
    async dispatch => {
        const data = await dispatch(actionRegister(login, password))

        if(data !== null){
            await dispatch(actionFullLogin(login, password))
        }
        else{
            document.getElementById('loginInfo').innerHTML = '<p style="color: red">Користувач з таким ім\'ям вже існує!</p>'
        }
    }

const actionOrderFind = () => actionPromise('orderFind', gqlOrderFind())

const actionFullOrder = () =>
    async (dispatch, getState) => {
        const cartContent = getState().cart;

        const orderGoods = [];

        for (const key in cartContent){
            const good = {
                _id: key,
            };
            const count = cartContent[key].count;
            orderGoods.push({ good: good, count: count });
        }

        try{
            dispatch(actionPromise('order', gqlOrderUpsert(orderGoods)))

            dispatch(actionCartClear())
        }
        catch(error){
            console.log(error)
        }
    }



window.onhashchange = () => {
    const [,route, _id] = location.hash.split('/')

    const routes = {
        category() {
            store.dispatch(actionCategoryById(_id))
        },
        good(){
            store.dispatch(actionGoodById(_id))
        },
        login(){
            drawLoginForm()
        },
        register(){
            drawRegistrationForm()
        },
        logout(){
            store.dispatch(actionAuthLogout())
            store.dispatch(actionCartClear())
            location.hash = '/category/6262ca7dbf8b206433f5b3d1'
        },
        cart(){
            drawCart()
        },
        history(){
            drawHistory()
        }
    }

    if (route in routes){
        routes[route]()
    }
}

window.onhashchange()