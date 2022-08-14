const createPeople = (name, children = []) => {
    const tempPeople = {
        name: name,
        children: children
    }
    createObj(tempPeople);
}

const createChildren = (people, children) => {
    const dbPeople = getLocalStorage();
    for(let i = 0; i < dbPeople.length; i++){
        if(getLocalStorage()[i].name === people){
            let arrey_children = getLocalStorage()[i].children;
            arrey_children.push(children);
            const tempChildren = {
                name: people,
                children: arrey_children
            }
            updateObj(i,tempChildren);
        }
    }
}


const getLocalStorage = () => JSON.parse(localStorage.getItem('db_people')) ?? []; 
const setLocalStorage = (dbPeople) => localStorage.setItem("db_people", JSON.stringify(dbPeople));
const getLocalStorageString = (dbPeople) => localStorage.getItem("db_people", JSON.stringify(dbPeople));

const createObj = (users) => {
    let dbPeople = getLocalStorage();
    dbPeople.push(users);
    setLocalStorage(dbPeople);
    showObj(dbPeople);
    //let teste = getLocalStorageString(dbPeople)
    //console.log(typeof(teste));
}

let readObj = () => getLocalStorage();

const updateObj = (index, users) => {
    let dbPeople = readObj();
    dbPeople[index] = users;
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
    button.addEventListener('click', () => {
        let insert = insertChildren(input_name);
        tbody.appendChild(insert);
    });
    table.appendChild(tfoot);
    tfoot.appendChild(button);
}

const createTr = (input_name) => {
    dbPeople = getLocalStorage();

    let tbody = createElement("tbody");
    let tr_body = createElement("tr");
    
    tbody.appendChild(tr_body);

    let td_body_name = createElement("td");
    td_body_name.innerHTML = input_name;
    td_body_name.setAttribute("id", input_name);
    tr_body.appendChild(td_body_name);

    let td_body_trash = createElement("td");
    let trash = createElement("i");
    trash.classList = "bi bi-trash-fill";
    trash = trash;
    tr_body.setAttribute("id", dbPeople.length);
    let i = dbPeople.length;
    td_body_trash.onclick=function(){deleteObj(i)};

    tr_body.appendChild(td_body_trash);
    td_body_trash.appendChild(trash);

    return tr_body;
}

const insertChildren = (input_people) => {
    let input_children = prompt("Digite o nome do(a) filho(a):");
    if (input_children !== null || input_children !== "") {
        let tr_body = createTr(input_children);
        createChildren(input_people, input_children);
        return tr_body;
    }
}

const save = () => {
    let dbPeople = getLocalStorageString();
    console.log(dbPeople);
    $.ajax({
        url: '/',
        type: 'POST',
        data: {data: dbPeople},
        success: function(result){
          console.log(result);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log(jqXHR, textStatus, errorThrown);
        }
    });
}