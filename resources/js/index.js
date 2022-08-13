function onloadFunction(){
    let enter_sons = document.querySelector("#enter_sons");
    enter_sons.classList.add("d-none");
}

let array_people = [];
let array_sons = [];
function myFunction() {
    let input_name = document.querySelector("#input_people").value;
    array_people.push(input_name);
    document.querySelector("#people").innerHTML = array_people;
}
