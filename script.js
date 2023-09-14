"use strict";
let myArr = [];

//sørger for at første id starter med 1
let idGenerator = 1;

window.addEventListener("DOMContentLoaded", start);

//START - hiver og data fra localStorage, og viser liste
function start() {
  console.log("ready");

  let retString = localStorage.getItem("myArr");
  myArr = JSON.parse(retString) || [];

  displayList(myArr);
}


//TILFØJELSE AF NY OPGAVE
const addButton = document.querySelector("#button");
const text = document.querySelector('#textfield');

addButton.addEventListener("click", addTask);

function addTask() {
  let myObj = {};
  let priority = document.getElementById("priority").value;
  myObj.indhold = text.value;
  myObj.id = idGenerator;
  myObj.done = false;
  myObj.priority = priority;

  //Sørger for at id'et stiger én, pr id der bliver generet
  idGenerator++;

  myArr.push(myObj);

  let string = JSON.stringify(myArr);
  localStorage.setItem("myArr", string);

  console.log("array", myArr);
  displayList(myArr);

  //nulstiller tekstfeltet, når opgave er tilføjet
  document.getElementById('textfield').value='';
  
  //nulstiller prioritet, når opgave er tilføjet
  document.getElementById('priority').value='disabled';

}


//Gør det muligt at trykke enter for at sætte sin opgave på todo listen
let input = document.getElementById("textfield");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("button").click();
  }
});


//VISNING AF LISTER
function displayList(array) {
  console.log(array)
  document.querySelector("#todolist").innerHTML = "";
  document.querySelector("#donelist").innerHTML = "";
  
  //filtrerer donelisten med objekter der har done som true
  const doneItems = array.filter(task => task.done);
  //filtrerer todolisten med objekter der har done som false, samt sorterer efter prioritet
  const toDoItems = array.filter(task => !task.done).sort((first, second) => first.priority > second.priority);
 
  //gennemgår hver objekt på todolisten, viser den på listen, udskriver dens indhold samt gør det muligt at klikke på den slet og tjek felt. Den gemmer også data på localStorage
  toDoItems.forEach((item) => {
    const clone = document.querySelector("#task").firstElementChild.cloneNode(true);
    clone.querySelector("p").textContent = item.indhold;
    document.querySelector("#todolist").appendChild(clone);
    clone.querySelector(".checkfield").addEventListener('click', toggleTask(item));
    clone.querySelector(".delete").addEventListener("click", () => removeTask(item));
  })
   //gennemgår hver objekt på donelisten, viser den på listen, udskriver dens indhold samt gør det muligt at klikke på den slet og tjek felt. Den gemmer også data på localStorage
  doneItems.forEach((item) => {
    const clone = document.querySelector("#task").firstElementChild.cloneNode(true);
    clone.querySelector("p").textContent = item.indhold;
    document.querySelector("#donelist").appendChild(clone);
    clone.querySelector(".checkfield").addEventListener('click', toggleTask(item));
    clone.querySelector(".delete").addEventListener("click", () => removeTask(item));
  })

  let string = JSON.stringify(myArr);
  localStorage.setItem("myArr", string);

}




//Fjerner opgaven ved at filtrere objektet fra arrayet, samt gemmer det nye i localStorage og viser listen
function removeTask(itemToRemove) {
  myArr = myArr.filter(task => task !== itemToRemove);
  localStorage.setItem('myArr', JSON.stringify(myArr));
  console.log(myArr);
  displayList(myArr);
}


  

//Retter objektets done status fra true til false eller omvendt, og viser opdateret listen
function toggleTask(obj) {
  return (target) => {
    console.log(obj, target)
    obj.done = !obj.done;
    displayList(myArr);
  }
}





