// while confirm

{
    while (!confirm()){}
}

// array fill

{
    let arr = []
    let userValue
    while (userValue = prompt("fill array")) {
        arr.push(userValue)
    }
    console.log(arr)
}

// array fill nopush

{
    let arr = []
    let userValue
    let i = 0
    while (userValue = prompt("fill array")) {
        arr[i] = (userValue)
        i++
    }
    console.log(arr)
}

// infinite probability

{
    let i = 0
    while (true) {
        console.log(i)
        i++
        if (Math.random() > 0.9) {
            break
        }
    }
}

// empty loop

{
    while (prompt() === null){}
}

// progression sum

{
    const n = +prompt('Input N')
    let sum = 0;
    for (let i = 1; i <= n; i += 3) {
        sum += i
    }
    console.log("Progression sum = " + sum)
}

// chess one line

{
    const length = 5
    let chessLine = ""
    for (let i = 0; i < length; i++) {
        chessLine += (i % 2 === 0) ? "#" : "."
    }
    console.log(chessLine)
}

// numbers

{
    let line = ""
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            line += j
        }
        line += "\n"
    }
    console.log(line)
}

// chess

{
    const rows = 10
    const collums = 12
    let chessBoard = ""
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < collums; j++) {
            if ((i + j)%2 === 0)
                chessBoard += "."
            else
                chessBoard += "#"
        }
        chessBoard += "\n"
    }
    console.log(chessBoard)
}

// cubes

{
    let arr = []
    const arrayLength = prompt("array length")
    for (let i = 0; i < arrayLength; i++) {
        arr[i] = Math.pow(i, 3)
    }
    console.log(arr)
}

// multiply table

{
    let arr = []
    for (let i = 0; i < 10; i++) {
        arr[i] = []
        for (let j = 0; j < 10; j++) {
            arr[i][j] = i * j
        }
    }
    console.log(arr)
}

// read array of objects

{
    const readArrayOfObjects = () => {
        const arr = []
        while (true) {
            const obj = {}
            while (true) {
                const key = prompt("Input key") 
                if (!key)
                    break
                const value = prompt("Input value")
                obj[key] = value
            }
            arr.push(obj)
            if (!confirm("Continue?"))
              break;
        }
        return arr
    }
}

// Ромбік

{
    const size = 10
    let romb = ""

    for (let i = 1; i <= size; i++) {
        let dots = ""
        let hashes = ""

        for (let j = 1; j <= size - i; j++) {
            dots += "."
        }
        for (let k = 1; k <= 2 * i - 1; k++) {
            hashes += "#"
        }

        romb += dots + hashes + dots + "\n"
    }

    for (let i = size - 1; i >= 1; i--) {
        let dots = ""
        let hashes = ""

        for (let j = 1; j <= size - i; j++) {
            dots += "."
        }
        for (let k = 1; k <= 2 * i - 1; k++) {
            hashes += "#"
        }

        romb += dots + hashes + dots + "\n"
    }
    console.log(romb)
}

// DOM: multiply table

{
    let table = document.createElement("table")
    document.body.append(table)

    for (let i = 0; i < 10; i++) {
        let tr = document.createElement("tr")
        table.append(tr)

        for (let j = 0; j < 10; j++) {
            let td = document.createElement("td")
            td.style.border = "solid 1px"
            td.innerText = i * j
            tr.append(td)
        }
    }
}

// DOM: highlight cell

{
    let table = document.createElement("table")
    document.body.append(table)

    for (let i = 0; i < 10; i++) {
        let tr = document.createElement("tr")
        table.append(tr)

        for (let j = 0; j < 10; j++) {
            let td = document.createElement("td")
            td.style.border = "solid 1px"
            td.innerText = i * j
            tr.append(td)

            td.onmouseover = () => td.style.backgroundColor = "grey"
            td.onmouseout = () => td.style.backgroundColor = ""
        }
    }
}

// DOM: Highlight cross

{
    let table = document.createElement("table")
    document.body.append(table)

    for (let i = 0; i < 10; i++) {
        let tr = document.createElement("tr")
        table.append(tr)

        for (let j = 0; j < 10; j++) {
            let td = document.createElement("td")
            td.style.border = "solid 1px"
            td.innerText = i * j
            tr.append(td)

            td.onmouseover = () => {
                table.rows[i].style.backgroundColor = "grey"
                for (let k = 0; k < 10; k++) {
                    table.rows[k].cells[j].style.backgroundColor = "grey"
                }
            } 

            td.onmouseout = () => {
                table.rows[i].style.backgroundColor = ""
                for (let k = 0; k < 10; k++) {
                    table.rows[k].cells[j].style.backgroundColor = ""
                }
            }
        }
    }
}