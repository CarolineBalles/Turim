function getElementDom(element) {
    elementList = document.querySelectorAll(element)
    if (elementList.length > 1) {
        return elementList
    } else {
        return elementList[0]
    }
}
const db = []

function addFather(name) {
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
function createTable(db) {
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
function addChildren(value) {
    const children = prompt('Nome do filho')
    if(!children) return
    db[value].children.push({name: children})
    createTable(db)
}

function createElement(tag, innerHTML, attributes){
    const element = document.createElement(tag)
    for(const att in attributes){
        element.setAttribute(att,attributes[att] )
    }
    element.innerHTML = innerHTML
    return element
}
function deleteRow(_id) {
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

function sendDb(){
    for(let i = 0; i < db.length; i++){
        let iFather = i;
        let id = i
        let fatherId = ++id
        let fatherName = db[i].name
        let count_children = db[i].children.length
        fathers.push({id: fatherId, name: fatherName})
        for(let i = 0; i < count_children; i++){
            id = i
            let childrenId = ++id
            let childrenFatherId = fatherId
            let childrenName = db[iFather].children[i].name
            children.push({id: childrenId, fatherId: childrenFatherId, name: childrenName})
        }

    }
    for(let i = 0; i < fathers.length; i++){
        let fatherId = fathers[i].id
        let fatherName = fathers[i].name
        const payload = {
            fatherName: fatherName
        }
        console.log(payload)
    }

    for(let i = 0; i < children.length; i++){
        let childrenId = children[i].id
        let childrenFatherId = children[i].fatherId
        let childrenName = children[i].name
        const payload = {
            childrenFatherId: childrenFatherId,
            childrenName: childrenName
        }
        console.log(payload)
    }

    
}

function ajax(payload){
    $.ajax({
        url: `/`,
        data: payload,
        type: "post",
        dataType: 'json',
        success: function (response) {
            //console.log(response)
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

function readDb(){
    console.log("readDb")
    $.ajax({
        url: `/`,
        success: function (response) {
            console.log(response)
            if (response) {
                console.log(response)
                $("#everybody").html(response);
            } else{
                alert("Code: " + response)
            }
        },
        error: function (response) {
            alert("Ocorreu um erro - Mensagem: " + response.responseText)
        }
    })
}