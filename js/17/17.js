// Світлофор

{
    async function trafficLight(domElement, greenTime, yellowTime, redTime){
        const redLight = document.createElement('div')
        redLight.style = 'width: 100px; height: 100px; border: 1px solid black; border-radius: 50%; background-color: red'
        domElement.append(redLight)
        
        const yellowLight = document.createElement('div')
        yellowLight.style = 'width: 100px; height: 100px; border: 1px solid black; border-radius: 50%; background-color: yellow'
        domElement.append(yellowLight)
        
        const greenLight = document.createElement('div')
        greenLight.style = 'width: 100px; height: 100px; border: 1px solid black; border-radius: 50%; background-color: green'
        domElement.append(greenLight)
        
        const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms))

        while (true){
            redLight.style.opacity = 0.2
            yellowLight.style.opacity = 0.2
            greenLight.style.opacity = 1
            await delay(greenTime)
            redLight.style.opacity = 0.2
            yellowLight.style.opacity = 1
            greenLight.style.opacity = 0.2
            await delay(yellowTime)
            redLight.style.opacity = 1
            yellowLight.style.opacity = 0.2
            greenLight.style.opacity = 0.2
            await delay(redTime)
        }
    }
    trafficLight(document.body, 5000, 2000, 3500)
}

// PedestrianTrafficLight

{
    async function pedestrianTrafficLight(domElement, greenTime, yellowTime, redTime, buttonDelay){
        // Traffic light
        const redLight = document.createElement('div')
        redLight.style = 'width: 100px; height: 100px; border: 1px solid black; border-radius: 50%; background-color: red'
        domElement.append(redLight)
        
        const yellowLight = document.createElement('div')
        yellowLight.style = 'width: 100px; height: 100px; border: 1px solid black; border-radius: 50%; background-color: yellow'
        domElement.append(yellowLight)
        
        const greenLight = document.createElement('div')
        greenLight.style = 'width: 100px; height: 100px; border: 1px solid black; border-radius: 50%; background-color: green'
        domElement.append(greenLight)

        domElement.append(document.createElement('br'))
        // Pedestrian traffic light
        const pedestrianRedLight = document.createElement('div')
        pedestrianRedLight.style = 'width: 80px; height: 80px; border: 1px solid black; border-radius: 50%; background-color: red'
        domElement.append(pedestrianRedLight)

        const pedestrianGreenLight = document.createElement('div')
        pedestrianGreenLight.style = 'width: 80px; height: 80px; border: 1px solid black; border-radius: 50%; background-color: green'
        domElement.append(pedestrianGreenLight)

        const button = document.createElement('button')
        button.textContent = 'press me'
        domElement.append(button)

        const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms))

        let buttonPressTime = 0
        let currentTime = 0

        function domEventPromise(element, eventName){
            function executor(resolve){
                currentTime = Date.now()
                if (currentTime - buttonPressTime > buttonDelay) {
                    element.addEventListener(eventName, onEvent)
                    function onEvent(event){
                        buttonPressTime = Date.now()
                        element.removeEventListener(eventName, onEvent)
                        resolve(event)
                    }
                }
                else {
                    resolve(delay(buttonDelay))
                }
            }
            return new Promise(executor)
        }

        while (true){
            redLight.style.opacity = 0.2
            yellowLight.style.opacity = 0.2
            greenLight.style.opacity = 1

            pedestrianRedLight.style.opacity = 1
            pedestrianGreenLight.style.opacity = 0.2

            await Promise.race([delay(greenTime), domEventPromise(button, 'click')])

            redLight.style.opacity = 0.2
            yellowLight.style.opacity = 1
            greenLight.style.opacity = 0.2

            await delay(yellowTime)

            redLight.style.opacity = 1
            yellowLight.style.opacity = 0.2
            greenLight.style.opacity = 0.2

            pedestrianRedLight.style.opacity = 0.2
            pedestrianGreenLight.style.opacity = 1

            await delay(redTime)

            redLight.style.opacity = 0.2
            yellowLight.style.opacity = 1
            greenLight.style.opacity = 0.2

            pedestrianRedLight.style.opacity = 1
            pedestrianGreenLight.style.opacity = 0.2

            await delay(yellowTime)
        }
    }

    pedestrianTrafficLight(document.body, 5000, 1000, 5000, 15000)
}

// speedtest

{
    async function speedtest(getPromise, count,parallel=1){
        const startTime = Date.now()
        let totalQueryDuration = 0

        for (let i = 0; i < count; i++){
            const startQueryTime = Date.now()
            const promises = []

            for (let j = 0; j < parallel; j++) {
                promises.push(getPromise())
            }

            await Promise.all(promises)

            const endQueryTime = Date.now()
            totalQueryDuration += endQueryTime - startQueryTime
        }

        const endTime = Date.now()

        const duration = endTime - startTime
        const querySpeed = count / totalQueryDuration
        const queryDuration = totalQueryDuration / count
        const parallelSpeed = (count*parallel) / duration
        const parallelDuration = duration / (count*parallel)

        return {
            duration,
            querySpeed,
            queryDuration,
            parallelSpeed,
            parallelDuration
        }
    }
}

// gql

{
    function gql(url, query, variables){
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        }).then(res => res.json())
    }
}

// jwtDecode

{
    function jwtDecode(token){
        try {
            return JSON.parse(atob((token.split('.'))[1]))
        }
        catch {
            return undefined
        }
    }
}
