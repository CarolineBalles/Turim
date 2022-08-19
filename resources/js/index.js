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
    if (!nameFather.value) return
    const father = {
        name: nameFather.value,
        children: []
    }
    db.push(father)
    nameFather.value = ''
    createTable(db)
}
const createTable = (db) => {
    const table_container = getElementDom('.table_container')
    table_container.innerHTML = ''
    db.map((f, index) => {
        const table = createElement('div', '', { class: '_table', id: `tb_${index}` })
        const row = createElement('div', '', { class: '_row', id: `rw_${index}` })
        row.appendChild(createElement('span', f.name))
        row.appendChild(createElement('span', 'delete', { id: `spnTb_${index}`, onclick: 'deleteRow(id)', class: 'material-symbols-outlined' }))
        table.appendChild(row)
        f.children.map((c, ind) => {
            const row = createElement('div', '', { class: '_row' })
            row.appendChild(createElement('span', c.name, { id: 1, value: 's' }))
            row.appendChild(createElement('span', 'delete', { id: `spn_${index}_${ind}`, onclick: `deleteRow(id)`, class: 'material-symbols-outlined' }))
            table.appendChild(row)
        })
        table.appendChild(createElement('button', 'Adicionar filho', { id: 2, class: '_btn', value: index, onclick: 'addChildren(value)' }))
        table_container.appendChild(table)
    })
    getElementDom('#everybody').value = db.length ? JSON.stringify(db) : ''
}
const addChildren = (value) => {
    const children = prompt('Nome do filho')
    if (!children) return
    db[value].children.push({ name: children })
    createTable(db)
}

const createElement = (tag, innerHTML, attributes) => {
    const element = document.createElement(tag)
    for (const att in attributes) {
        element.setAttribute(att, attributes[att])
    }
    element.innerHTML = innerHTML
    return element
}
const deleteRow = (_id) => {
    const id = _id.split('_')
    if (id[0] === 'spnTb') {
        db.splice(id[1], 1)
    }
    if (id[0] === 'spn') {
        db[id[1]].children.splice(id[2], 1)
    }
    createTable(db)
}

const sendDb = () => {
    const payload = db.map((father, i) => {
        const id = ++i
        return {
        ...father,
        id,
        children: father.children.map((child, ind) => ({
            ...child,
            id: ++ind + 1,
            father_id: id
            }))
        }
    })
    saveDB(payload)
}

const saveDB = (payload) => {
    $.ajax({
        url: `/store`,
        data: JSON.stringify(payload),
        type: "POST",
        contentType: "application/json",
        success: function (response) {
            if (response) {
                alert("Criado com Sucesso.")
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
        type: "post",
        success: function (response) {
            createTable(response)
        },
        error: function (response) {
            alert("Ocorreu um erro - Mensagem: " + response.responseText)
        }
    })
}