const createPeople = (people) => {
    const tempPeople = {
        name: people,
        children: []
    }
    createObj(tempPeople);
}

const createChildren = (people_name, children_name) => {
    console.log("createChildren", children_name)
    const dbPeople = getLocalStorage();
    // const i = dbPeople.length - 1;
    const index = dbPeople.findIndex( (i) => i.name === people_name);
    
    const tempChildren = {
        name: children_name
    }

    dbPeople[index].children.push(tempChildren);
    //console.log(dbPeople);
    updateObj(dbPeople);
}


const getLocalStorage = () => JSON.parse(localStorage.getItem('db_people')) ?? []; 
const setLocalStorage = (dbPeople) => localStorage.setItem("db_people", JSON.stringify(dbPeople));
const getLocalStorageString = (dbPeople) => localStorage.getItem("db_people", JSON.stringify(dbPeople));

const createObj = (users) => {
    let dbPeople = getLocalStorage();
    dbPeople.push(users);
    setLocalStorage(dbPeople);
    showObj(dbPeople);
}

let readObj = () => getLocalStorage();

const updateObj = (dbPeople) => {
    //let dbPeople = readObj();
    //bPeople[index] = users;
    setLocalStorage(dbPeople);
    showObj(dbPeople);
} 

const deleteObj = (index) => {
    let dbPeople = readObj();
    dbPeople.splice(index,1);
    setLocalStorage(dbPeople);
    showObj(dbPeople);
    removeElement(index);
}

const include = () => {
    const input_name = document.querySelector("#input_people").value;
    createTable(input_name);
    createPeople(input_name);
}

const createElement = (element) => {
    return document.createElement(element);
}

const removeElement = (index) => {
    document.getElementById(index).remove();
}

const showObj = (dbPeople) => {
    dbPeople = getLocalStorageString(dbPeople);
    document.querySelector("#people").innerHTML = dbPeople;
}

const createTable = (input_name) => {
    let create_table = document.querySelector("#create_table");
    let table = createElement("table");
    table.classList = "table table-striped";
    let thead = createElement("thead");
    create_table.append(table);
    table.appendChild(thead);
    
    let tr_head = createElement("tr");
    let index_th = ["Nome", "Excluir"];
    for(let i = 0; i < index_th.length; i++){
        let th_head = createElement("th");
        th_head.textContent = index_th[i];
        th_head.setAttribute("scope", "col");
        tr_head.appendChild(th_head);
    }
    table.appendChild(tr_head);
    thead.append(tr_head);

    let tbody = createElement("tbody");
    table.appendChild(tbody);
    
    let tr_body = createTr(input_name);
    tbody.appendChild(tr_body);

    let tfoot = createElement("tfoot");
    let button = createElement("button");
    button.textContent = "Adicionar Filho";
    button.setAttribute("class", "btn btn-success mt-1");
    console.log("Antes do envento click do botao: ", input_name);
    button.addEventListener('click', () => {
        let insert = insertChildren(input_name);
        tbody.appendChild(insert);
    });
    table.appendChild(tfoot);
    tfoot.appendChild(button);
}

const createTr = (input_name) => {
    console.log("createTR: ",input_name)
    dbPeople = getLocalStorage();

    let tbody = createElement("tbody");
    let tr_body = createElement("tr");
    tr_body.setAttribute("id", input_name);
    
    tbody.appendChild(tr_body);

    let td_body_name = createElement("td");
    td_body_name.innerHTML = input_name;
    
    tr_body.appendChild(td_body_name);

    let td_body_trash = createElement("td");
    let trash = createElement("i");
    trash.classList = "bi bi-trash-fill";
    trash.setAttribute("name", input_name);
    let i = dbPeople.length;
    trash.onclick=function(){console.log(tr_body.id)};
    // td_body_trash.onclick=function(){deleteObj(i)};

    tr_body.appendChild(td_body_trash);
    td_body_trash.appendChild(trash);

    return tr_body;
}

const insertChildren = (input_people) => {
    console.log("insertChildren: ", input_people)
    let input_children = prompt("Digite o nome do(a) filho(a):");
    if (input_children !== null || input_children !== "") {
        let tr_body = createTr(input_children);
        createChildren(input_people, input_children);
        return tr_body;
    }
}

const save = () => {
    let dbPeople = getLocalStorageString();
    $.ajax({
        url: '/',
        type: 'POST',
        data: {data: dbPeople},
        success: function(result){
        },
        error: function(jqXHR, textStatus, errorThrown) {
        }
    });
}