let $questList, $questTitle, $questAdd, $questDelete, $questEdit, $questDone, $pop, $popCancel, $popAdd, $popExit, $popTitle, $buttonList, $questValue;

let id = 0;
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
  document.getElementById("date").innerHTML = d + " / " + m + " / " + y;
  $questList = document.getElementById('list');
  $questTitle = document.getElementById('headtitle');
  $questAdd = document.getElementById('headadd');
  $popExit = document.querySelector('.exitpopup');
  $pop = document.querySelector('.popup');
  $buttonList = document.querySelector('button');
  $questValue = document.querySelectorAll('text');
  console.log($questValue.innerHTML);
}

function listenerDOMEvents() {
  $questAdd.addEventListener('click', addButton);
  document.addEventListener("keyup", pressEnter);
  $questList.addEventListener('click', listClickManager);
  document.addEventListener('click', popupExit);
}

function pressEnter(event) {
  if (event.keyCode == 13) {
    const title = $questTitle.value;
      if(title) {
        newQuest(title)
      };
        $questTitle.value = "";
  };
}

function initialList() {
  intList.forEach(todo => {
    newQuest(todo);
  });
}

function addButton() {
  var isEmpty = false,
    tname = $questTitle.value;
  if (tname === "") {
    alert ("Title cannot by empty");
    isEmpty = true;
  }
  else if (isEmpty === false) {
    newQuest($questTitle.value);
    $questTitle.value = "";
  }
}

function newQuest(title) {
  const newElement = createElement(title);
  $questList.appendChild(newElement);
}

function createElement(title) {
  const newElement = document.createElement('li');
  newElement.classList.add('newLi-' + ++id);
  const textElement = document.createTextNode(title);
  const spanElement = document.createElement('span');
  // spanElement.classList.add('textLi-' + counterElement);
  spanElement.classList.add('text');
  newElement.appendChild(spanElement);
  spanElement.appendChild(textElement);
  const divElement = document.createElement('div');
  divElement.classList.add('buttons');
  spanElement.after(divElement);
  const deleteElement = document.createElement('button');
  // deleteElement.classList.add('deleteLi-' + counterElement);
  deleteElement.classList.add('delete');
  deleteElement.innerText = "Delete";
  divElement.appendChild(deleteElement);
  const editElement = document.createElement('button');
  // editElement.classList.add('editLi-' + counterElement);
  editElement.classList.add('edit');
  editElement.innerText = "Edit";
  deleteElement.after(editElement);
  const doneElement = document.createElement('button');
  // doneElement.classList.add('doneLi-' + counterElement);
  doneElement.classList.add('done');
  doneElement.innerText = "Mark as Done";
  editElement.after(doneElement);
        
  return newElement;
}
  
  function removeItem(eventObject){
    let delBtn = eventObject.target.classList.contains('delete');
      if( delBtn === true ){
        var parent = eventObject.target.parentElement.parentElement;
        parent.remove(this);
        console.log('delete');
      };
  }
  
  function doneItem(e) {
  let doneBtn = e.target.classList.contains('done');
  var parents = e.target.parentElement.parentElement;
  console.log(parents);
    if(doneBtn === true && parents.style.textDecoration !== 'line-through'){
      parents.style.textDecoration = 'line-through';
      console.log('line-through');
      }
      else if(parents.style.textDecoration == 'line-through'){
        parents.style.textDecoration = 'none';
        console.log('not-line-through');
      };
  }
  
  function editItem(e) {
  let editBtn = e.target.classList.contains('edit');
  var editElement = e.currentTarget.parentElement;
  console.log(editBtn);
  console.log(editElement);
  console.log(e);
  
  if(editBtn === true){
    $pop.style.display = 'block'
    $popExit.style.display = 'block';
    console.log('edit');
    var nodeTitle = $questValue.getElementsByClassName('text').innerHTML
    // nodeTitle.textContent ? nodeTitle.textContent : nodeTitle.innerText;
    // document.getElementById('popuptitle').value = nodeTitle.value;
    console.log(nodeTitle);
  };
}

function popupExit(eventObject) {
  if (eventObject.target.className === 'exitpopup'){
    $pop.style.display = 'none'
    $popExit.style.display = 'none';
    console.log('exit');
  }
}
  
function listClickManager(eventObject) {
  if (eventObject.target.className === 'delete') {
    removeItem(eventObject);
  };
  if (eventObject.target.className === 'edit') {
    editItem(eventObject);
  };
  if (eventObject.target.className === 'done') {
    doneItem(eventObject);
  };
}
console.log('dziala');
document.addEventListener('DOMContentLoaded', maintodo);