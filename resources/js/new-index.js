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
    const nameFather = getElementDom('#input_people')
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
    getElementDom('#people').value = db.length?JSON.stringify(db):''
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
function sendDb (){
    $(document).ready(function () {

        const father_name = $("#description").val();
        const children_name = $("#price").val();
        const amount = $("#amount").val();
        const client_name = $("#client_name").val();
        const cpf = $("#cpf").val();
        const phone_number = $("#phone_number").val();
        const email = $("#email").val();
        const expire_at = $("#expire_at").val();
        const payload = {
            description: description,
            price: price,
            amount: amount,
            client_name: client_name,
            cpf: cpf,
            phone_number: phone_number,
            email: email,
            expire_at: expire_at
        }

        $.ajax({
            url: `/`,
            data: payload,
            type: "post",
            dataType: 'json',
            success: function (response) {
                console.log(response)
                if (response/*.charge_id > 0*/) {
                    alert("Response: " + response)
                    // var html = "<th>" + response.charge_id + "</th>"
                    // html += "<th>" + response.barcode + "</th>"
                    // html += `<th><a target="_blank" href="${response.link}">${response.link}</a></th>`
                    // html += "<th>" + response.expire_at + "</th>"
                    // html += "<th>" + response.status + "</th>"
                    // html += "<th>" + response.price + "</th>"
                    // html += "<th>" + response.payment + "</th>";
                    // $("#result_table").html(html);

                } else {
                    alert("Code: " + response)
                }
            },
            error: function (response) {
                alert("Ocorreu um erro - Mensagem: " + response.responseText)
            }
        });
    })
}