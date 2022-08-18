const getElementDom = (element) => {
    elementList = document.querySelectorAll(element)
    if (elementList.length > 1) {
        return elementList
    } else {
        return elementList[0]
    }
}
const db = []

const addFather = (name) => {
    const nameFather = getElementDom('#input_father')
    if(!nameFather.value) return
    const father = {
        name: nameFather.value,
        children: []
    }
    db.push(father)
    //função enviar ajax sendDb()
    nameFather.value = ''
    createTable(db)
}
const createTable = (db) => {
    const table_container = getElementDom('.table_container')
    table_container.innerHTML = ''
    db.map((f, index) => {
        const table = createElement('div', '',{class: '_table', id:`tb_${index}`})
        const row = createElement('div', '', {class: '_row', id:`rw_${index}`})
        row.appendChild(createElement('span', f.name))
        row.appendChild(createElement('span', 'delete', {id: `spnTb_${index}`, onclick:'deleteRow(id)', class:'material-symbols-outlined'}))
        table.appendChild(row)
        f.children.map((c, ind) => {
            const row = createElement('div', '', {class: '_row'})
            row.appendChild(createElement('span', c.name, {id: 1, value: 's'}))
            row.appendChild(createElement('span', 'delete', {id: `spn_${index}_${ind}`, onclick:`deleteRow(id)`, class:'material-symbols-outlined'}))
            table.appendChild(row)
        })
        table.appendChild(createElement('button', 'Adicionar filho', {id: 2, class:'_btn', value: index, onclick:'addChildren(value)'}))
        table_container.appendChild(table)
    })
    getElementDom('#everybody').value = db.length?JSON.stringify(db):''
}
const addChildren = (value) => {
    const children = prompt('Nome do filho')
    if(!children) return
    db[value].children.push({name: children})
    createTable(db)
}

const createElement = (tag, innerHTML, attributes) => {
    const element = document.createElement(tag)
    for(const att in attributes){
        element.setAttribute(att,attributes[att] )
    }
    element.innerHTML = innerHTML
    return element
}
const deleteRow = (_id) => {
    const id = _id.split('_')
    if(id[0] === 'spnTb'){
        db.splice(id[1], 1)
    }
    if(id[0] === 'spn'){
        db[id[1]].children.splice(id[2], 1)
    }
    createTable(db)
}

const fathers = []
const children = []

const sendDb = () => {
    db.map((f, i) => {
        let id = i
        let fatherId = ++id
        let fatherName = f.name
        fathers.push({id: fatherId, name: fatherName})
        f.children.map((c, ind) => {
            let id = ind
            let childrenId = ++id
            let childrenFatherId = fatherId
            let childrenName = c.name
            children.push({id: childrenId, fatherId: childrenFatherId, name: childrenName})
        })
    })

    fathers.map((f, i) => {
        let fatherId = f.id
        let fatherName = f.name
        const payload = {
            fatherName: fatherName
        }
        ajax(payload)
    })

    children.map((c, i) => {
        let childrenId = c.id
        let childrenFatherId = c.fatherId
        let childrenName = c.name
        const payload = {
            childrenFatherId: childrenFatherId,
            childrenName: childrenName
        }
        ajax(payload)
    })
}

const ajax = (payload) => {

    $.ajax({
        url: `/`,
        data: payload,
        type: "post",
        // dataType: 'json',
        success: function (response) {
            if (response) {
                console.log(response)
            } else {
                alert("Code: " + response)
            }
        },
        error: function (response) {
            alert("Ocorreu um erro - Mensagem: " + response.responseText)
        }
    })
}

const readDb = () => {
    $.ajax({
        url: `/read`,
        //data: payload,
        type: "post",
        //dataType: 'json',
        success: function (response) {
            let html = ''
            if(response.fatherName){
                html = "<th>" + response.fatherName + "</th>"
                $("#table").html(html)
                $("#everybody").html(response)
            }else if(response.childrenFatherId){
                html += "<th>" + response.childrenFatherId + "</th>"
                html += "<th>" + response.childrenName + "</th>"
                $("#table").html(html)
                $("#everybody").html(response)
            }else{
                alert("Code: " + response)
            }            
        },
        error: function (response) {
            alert("Ocorreu um erro - Mensagem: " + response.responseText)
        }
    })
}