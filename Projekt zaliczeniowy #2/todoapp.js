let $questList, $questTitle, $questAdd, $questDelete, $questEdit, $questDone, $pop, $popCancel, $popAdd, $popExit, $popTitle, $text;

let counterElement = 0;
let list = [];

let date;
n =  new Date();
y = n.getFullYear();
var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";
m = month[n.getMonth() + 1];
d = n.getDate();

const intList = ['Dodawaj, edytuj, usuwaj, oznaczaj zadania'];

function maintodo() {
  pickDOMEelements();
  listenerDOMEvents();
  initialList();
}

function pickDOMEelements() {
  $questList = document.getElementById('list');
  $questTitle = document.getElementById('headtitle');
  $questAdd = document.getElementById('headadd');
  $questDelete = document.getElementsByClassName('deleteLi-()')
  $popExit = document.querySelector('.exitpopup');
  document.getElementById("date").innerHTML = d + " / " + m + " / " + y;
  $text = document.getElementById('text');
}

function listenerDOMEvents() {
  $questAdd.addEventListener('click', addButton);
  // $questDelete.addEventListener('click', deleteElement);
  // document.addEventListener("keyup", pressEnter);
}

// function pressEnter(event) {
//   if (event.keyCode == 13) {
//     const toDo = $questTitle.value;
//       if(toDo) {
//         newQuest(toDo, id, false, false);
//         list.push(
//           {
//             name: toDo,
//             id: id,
//             done: false,
//             trash: false
//           }
//         );
//         $questTitle.value = "";
//         id++;
//       }
//   }
// }

function initialList() {
  intList.forEach(todo => {
    newQuest(todo);
  });
}

function addButton() {
  newQuest($questTitle.value);
  $questTitle.value = "";
}

function newQuest(title) {
  const newElement = createElement(title);
  $questList.appendChild(newElement);
}

function createElement(title) {
  const newElement = document.createElement('li');
  newElement.classList.add('newLi-' + ++counterElement);
  const textElement = document.createTextNode(counterElement + ". " + title);
  const spamElement = document.createElement('spam');
  spamElement.classList.add('textLi-' + counterElement);
  newElement.appendChild(spamElement);
  spamElement.appendChild(textElement);
  const divElement = document.createElement('div');
  spamElement.after(divElement);
  const deleteElement = document.createElement('button');
  deleteElement.classList.add('deleteLi-' + counterElement);
  deleteElement.innerText = "Delete";
  divElement.appendChild(deleteElement);
  const editElement = document.createElement('button');
  editElement.classList.add('editLi-' + counterElement);
  editElement.innerText = "Edit";
  deleteElement.after(editElement);
  const doneElement = document.createElement('button');
  doneElement.classList.add('doneLi-' + counterElement);
  doneElement.innerText = "Mark as Done";
  editElement.after(doneElement);
  // const text = '<li class="item">
  //               <p class="text      "> ${toDo}
  return newElement;
}

function delte(eventObject){
  if (eventObject.target = deleteElement){
    $questList.parentNode.removeChild(newElement);
  }
}

function done(doneElement) {
  doneElement.classList.toggle(check);
}

// function listClickManager(eventObject) {
//   if(eventObject.target = sendNewQuest) {
//     $questList
//   }

//   else{console.log('nie dziala');}
// };

document.addEventListener('DOMContentLoaded', maintodo);