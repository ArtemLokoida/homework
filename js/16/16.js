// Chat

{
    const parent = document.body

    const nick = document.createElement('input')
    nick.placeholder = 'nick'
    nick.style = 'width: 100%; font-size: 2em;'
    parent.append(nick)

    const message = document.createElement('input')
    message.placeholder = 'message'
    message.style = 'width: 100%; font-size: 2em;'
    parent.append(message)

    const sendButton = document.createElement('button')
    sendButton.textContent = 'Send'
    sendButton.style = 'width: 100%; font-size: 2em;'
    parent.append(sendButton)

    const chat = document.createElement('div')
    parent.append(chat)

    async function jsonPost(url, data){
        try{
            const res = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(data)
            })

            return await res.json()
        }
        catch(error){
            throw new Error(`jsonPostError: ${error}`)
        }
    }

    async function sendMessage(nick, message){
            const res = await jsonPost('http://students.a-level.com.ua:10012', {func: 'addMessage', nick: nick, message: message})
    }

    let nextMessageId = 0

    async function getMessages(){
        const res = await jsonPost('http://students.a-level.com.ua:10012', {func: 'getMessages', messageId: nextMessageId})
        
        const messages = res.data

        for(const message of messages){
            const div = document.createElement('div')
            div.innerHTML = `<b>${message.nick}</b>:${message.message}`
            chat.prepend(div)
        }

        nextMessageId = res.nextMessageId
    }

    getMessages()
    setInterval(getMessages, 2000)

    sendButton.onclick = async function(){
        await sendMessage(nick.value, message.value)
        await getMessages()
    }
}

// SWAPI Links

{
    async function swapiLinks(url){
        const res = await fetch(url)
        const data = await res.json()

        async function createObject(object){
            for(const key in object){
                if (typeof object[key] === 'string' && object[key].includes('https://swapi.dev/api/')){
                    const res = await fetch(object[key])
                    const data = await res.json()

                    object[key] = data
                }
                else if(Array.isArray(object[key])){
                    for (const value in object[key]){
                        const res = await fetch(object[key][value])
                        const data = await res.json()

                        object[key][value] = data
                    }
                }
            }

            return object
        }

        return createObject(data)
    }

    swapiLinks("https://swapi.dev/api/people/20/")
     .then(yodaWithLinks => console.log(JSON.stringify(yodaWithLinks, null, 4)))
}

// domEventPromise

{
    function domEventPromise(element, eventName){
        function executor(resolve){
            element.addEventListener(eventName, onEvent)

            function onEvent(event){
                element.removeEventListener(eventName, onEvent)
                resolve(event)
            }
        }

        return new Promise(executor)
    }
    
    const knopka = document.createElement('button')
    knopka.textContent = 'press me'
    document.body.append(knopka)

    domEventPromise(knopka, 'click').then( e => console.log('event click happens', e))
}