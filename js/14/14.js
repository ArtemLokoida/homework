// Рекурсія: HTML tree

{
    const body = {
        tagName: 'body',
        children: [
            {
                tagName: 'div',
                children: [
                    {
                        tagName: 'span',
                        children: ['Enter a data please:']
                    },
                    {
                        tagName: 'br'
                    },
                    {
                        tagName: 'input',
                        attrs: {
                            type: 'text',
                            id: 'name'
                        }
                    },
                    {
                        tagName: 'input',
                        attrs: {
                            type: 'text',
                            id: 'surname'
                        },
                    },
                ],
            },
            {
                tagName: 'div',
                children: [
                    {
                        tagName: 'button',
                        attrs: {
                            id: 'ok'
                        },
                        children: ['OK']
                    },
                    {
                        tagName: 'button',
                        attrs: {
                            id: 'cancel'
                        },
                        children: ['Cancel']
                    }
                ]
            }
        ] 
    }

    function htmlTree(tree){
        let html = `<${tree.tagName}`

        if (tree.attrs){
            for(const attr in tree.attrs){
                html += ` ${attr}='${tree.attrs[attr]}'`
            }
        }

        html += '>'

        if (tree.children){
            for (const child of tree.children){
                if (typeof child === 'string'){
                    html += child
                }
                else if (typeof child === 'object'){
                    html += htmlTree(child)
                }
            }
        }

        html += `</${tree.tagName}>`

        return html
    }

    document.write(htmlTree(body))
}

// Рекурсія: DOM tree

{
    const body = {
        tagName: 'body',
        children: [
            {
                tagName: 'div',
                children: [
                    {
                        tagName: 'span',
                        children: ['Enter a data please:']
                    },
                    {
                        tagName: 'br'
                    },
                    {
                        tagName: 'input',
                        attrs: {
                            type: 'text',
                            id: 'name'
                        }
                    },
                    {
                        tagName: 'input',
                        attrs: {
                            type: 'text',
                            id: 'surname'
                        },
                    },
                ],
            },
            {
                tagName: 'div',
                children: [
                    {
                        tagName: 'button',
                        attrs: {
                            id: 'ok'
                        },
                        children: ['OK']
                    },
                    {
                        tagName: 'button',
                        attrs: {
                            id: 'cancel'
                        },
                        children: ['Cancel']
                    }
                ]
            }
        ] 
    }

    function domTree(parent, tree){
        const tag = document.createElement(tree.tagName)

        if (tree.attrs){
            for(const attr in tree.attrs){
                tag.setAttribute(attr, tree.attrs[attr])
            }
        }

        if (tree.children){
            for (const child of tree.children){
                if (typeof child === 'string'){
                    tag.textContent += child
                }
                else if (typeof child === 'object'){
                    domTree(tag, child)
                }
            }
        }

        parent.appendChild(tag)
    }

    domTree(document.body, body)
}

// Рекурсія: Deep Copy

{
    function deepCopy(obj){
        if (Array.isArray(obj)){
            let copy = []
            for(let i = 0; i < obj.length; i++){
                copy[i] = deepCopy(obj[i])
            }
            return copy
        }

        if (obj && typeof obj === 'object'){
            let copy = {}
            for(const key in obj){
                copy[key] = deepCopy(obj[key])
            }
            return copy
        }
        
        return obj
    }
}

// Рекурсия: My Stringify

{
    function stringify(object){
        if (object === null) {
            return 'null'
        }

        if (typeof object === 'undefined') {
            return 'null'
        }

        if (typeof object === 'string') {
            return '"' + object + '"'
        }

        if (typeof object !== 'object') {
            return object.toString()
        }

        if (Array.isArray(object)) {
            const arr = object.map(value => stringify(value))
            return '[' + arr.join(',') + ']'
        }
        else {
            const obj = Object.keys(object).map(key => {
                const value = stringify(object[key])
                if (value !== 'null') {
                    return '"' + key + '"' + ':' + value
                }
            }).filter(value => value !== undefined)
            return '{' + (obj !== "" ? obj.join(',') : '') + '}' 
        }
    }
}

// Рекурсія: getElementById throw

{
    function getElementById(idToFind){
        function walker(parent = document.body){
            for (const child of parent.children){
                if (child.id === idToFind){
                    throw child
                }
                walker(child)
            }
        }
        try{
            walker()
        }
        catch (found){
            return found
        }
        return null
    }
}