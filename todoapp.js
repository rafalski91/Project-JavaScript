let $questList, $questTitle, $questAdd, $pop, $popExit, $popOverlay;

let id = 0;
let saveText = "";
let saveLi = "";

let date;
n =  new Date();
y = n.getFullYear();
var month = new Array();
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
m = monthNames[n.getMonth() + 1];
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
  $questAdd = document.querySelector('.headinput');
  $pop = document.querySelector('.popup');
  $popExit = document.querySelector('.exitpopup');
  $popOverlay = document.querySelector('.popupOverlay');
}

function listenerDOMEvents() {
  $questAdd.addEventListener('click', listClickManager);
  $questAdd.addEventListener('keyup', listClickManager);
  $questList.addEventListener('click', listClickManager);
  $pop.addEventListener('click', listClickManager);
  $popExit.addEventListener('click', listClickManager);
  // window.addEventListener('resize', listClickManager);
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
  };
  if(isEmpty === false) {
    newQuest($questTitle.value);
    $questTitle.value = "";
  };
}

function newQuest(title) {
  const newElement = createElement(title);
  $questList.appendChild(newElement);
}

function createElement(title) {
  const newElement = document.createElement('li');
  newElement.classList.add('newLi-' + ++id);
  let dateElement = d + " / " + m + " / " + y;
  const textElement = document.createTextNode(dateElement + " - " + title);
  const spanElement = document.createElement('span');
  spanElement.classList.add('text');
  newElement.appendChild(spanElement);
  spanElement.appendChild(textElement);
    const divElement = document.createElement('div');
    divElement.classList.add('buttons');
    spanElement.after(divElement);
      const deleteElement = document.createElement('button');
      deleteElement.classList.add('delete');
      deleteElement.innerText = "Delete";
      divElement.appendChild(deleteElement);
      const editElement = document.createElement('button');
      editElement.classList.add('edit');
      editElement.innerText = "Edit";
      deleteElement.after(editElement);
      const doneElement = document.createElement('button');
      doneElement.classList.add('done');
      doneElement.innerText = "Done";
      editElement.after(doneElement);
  return newElement;
}
  
  function removeItem(eventObject){
    let delBtn = eventObject.target.classList.contains('delete');
      if( delBtn === true ){
        var parent = eventObject.target.parentElement.parentElement;
        parent.remove(this);
      };
  }
  
  function doneItem(eventObject) {
  let doneBtn = eventObject.target.classList.contains('done');
  console.log(doneBtn)
  var parents = eventObject.target.parentElement.parentElement;
  console.log(parents)
    if(doneBtn === true && parents.firstChild.style.textDecoration !== 'line-through'){
      parents.firstChild.style.textDecoration = 'line-through';
      }
      else if(parents.firstChild.style.textDecoration == 'line-through'){
        parents.firstChild.style.textDecoration = 'none';
      };
  }
  
  function editItem(eventObject) {
  let editBtn = eventObject.target.classList.contains('edit');
    if(editBtn === true){
      $pop.style.display = 'block';
      $popExit.style.display = 'block';
      $popOverlay.style.display = 'block';
    };
}

function addText(eventObject) {
  let popupAdd = eventObject.target.classList.contains('popupadd');
  var editText = eventObject.target.parentNode.querySelector('#popuptitle').value;
  var editedText = document.querySelector('.newText');
  if(popupAdd === true) {
    $pop.style.display = 'none';
    $popExit.style.display = 'none';
    $popOverlay.style.display = 'none';
    saveText = editText;
    editedText.innerText = saveText;
  };
  var parE = document.querySelector('.newText');
  parE.classList.remove('newText');
}

function popupCancel(eventObject) {
  let popupCancel = eventObject.target.classList.contains('popupcancel');
  let popupExit = eventObject.target.classList.contains('fas');
  if (popupCancel === true || popupExit === true) {
    $pop.style.display = 'none';
    $popExit.style.display = 'none';
    $popOverlay.style.display = 'none';
  };
}

// function mobileDisplayButtons(eventObject) {
//   let menu = eventObject.target.parentNode.querySelector('.buttons');
//   console.log(menu.style.display);
//   if (menu.style.display == '') {
//     menu.style.display = 'block';
//     console.log('nice');
//   }
//   else if (menu.style.display === 'none') {
//     menu.style.display = 'block';
//     console.log('block');
//   }
//   else if (menu.style.display === 'block') {
//   menu.style.display === 'none';
//   console.log('none');
//   }
// }

function listClickManager(eventObject) {
  // if(this.innerWidth < 768 && eventObject.target.className === 'text') {
  //     mobileDisplayButtons(eventObject);
  //   }
  
  if (eventObject.target.className === 'delete') {
    removeItem(eventObject);
  };
  if (eventObject.target.className === 'edit') {
    editItem(eventObject);
    var editText = eventObject.target.parentNode.parentNode.querySelector('.text').textContent;
    var saveElement = eventObject.target.parentNode.parentNode.querySelector('.text');
    saveElement.classList.add('newText');
    var textToEdit = $pop.querySelector('#popuptitle');
    textToEdit.value = editText;
  };
  if (eventObject.target.className === 'done') {
    doneItem(eventObject);
  };
  if (eventObject.target.className === 'popupcancel' || eventObject.target.className === 'fas fa-times') {
    popupCancel(eventObject);
  };
  if (eventObject.target.className === 'popupadd') {
    addText(eventObject);
  };
  if (eventObject.target.className === 'headadd') {
    addButton(eventObject);
  };
  if (event.keyCode == 13) {
    const title = $questTitle.value;
    if(title) {
      newQuest(title);
    };
      $questTitle.value = "";
  };
}
console.log('Done');
document.addEventListener('DOMContentLoaded', maintodo);