let $questList, $questTitle, $questAdd, $pop, $popExit, $popOverlay;

let id = 1;

let date;
n = new Date();
y = n.getFullYear();
const monthNames = ["January", "February", "March", "April", "May", "June",
   "July", "August", "September", "October", "November", "December"
];
m = monthNames[n.getMonth() + 1];
d = n.getDate();

const intList = ['Dodawaj, edytuj, usuwaj, oznaczaj zadania'];

function mainQuest() {
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
   $questAdd.addEventListener('click', addClickHandler);
   $questAdd.addEventListener('keyup', enterClickHandler);
   $questList.addEventListener('click', listClickManager);
   $pop.addEventListener('click', popupClickManager);
   $popExit.addEventListener('click', popupClickManager);
}

function initialList() {
   intList.forEach(quest => {
      newQuest(quest);
   });
}

function addButton() {
   var isEmpty = false,
      tname = $questTitle.value;
   if (tname === "") {
      alert("Title cannot by empty");
      isEmpty = true;
   };
   if (isEmpty === false) {
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
   newElement.classList.add('Quest-' + id);
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
   id++;
   return newElement;
}

function removeItem(eventObject) {
   let delBtn = eventObject.target.classList.contains('delete');
   if (delBtn === true) {
      var parent = eventObject.target.parentElement.parentElement;
      parent.remove(this);
   };
}

function doneItem(eventObject) {
   let doneBtn = eventObject.target.classList.contains('done');
   var parents = eventObject.target.parentElement.parentElement;
   if (doneBtn === true && parents.firstChild.style.textDecoration !== 'line-through') {
      parents.firstChild.style.textDecoration = 'line-through';
   } else if (parents.firstChild.style.textDecoration == 'line-through') {
      parents.firstChild.style.textDecoration = 'none';
   };
}

function editItem(eventObject) {
   let editBtn = eventObject.target.classList.contains('edit');
   if (editBtn === true) {
      $pop.style.display = 'block';
      $popExit.style.display = 'block';
      $popOverlay.style.display = 'block';
   };
}

function addText(eventObject) {
   let popupAdd = eventObject.target.classList.contains('popupadd');
   var editText = eventObject.target.parentNode.querySelector('#popuptitle').value;
   var editedText = document.querySelector('.newText');
   if (popupAdd === true) {
      $pop.style.display = 'none';
      $popExit.style.display = 'none';
      $popOverlay.style.display = 'none';
      editedText.innerText = editText;
   };
   var extraClass = document.querySelector('.newText');
   extraClass.classList.remove('newText');
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

function addClickHandler(eventObject) {
   if (eventObject.target.className === 'headadd') {
      addButton(eventObject);
   };
}

function enterClickHandler(event) {
   if (event.keyCode == 13) {
      const title = $questTitle.value;
      if (title) {
         newQuest(title);
      };
      $questTitle.value = "";
   };
}

function popupClickManager(eventObject) {
   if (eventObject.target.className === 'popupcancel' || eventObject.target.className === 'fas fa-times') {
      popupCancel(eventObject);
   };
   if (eventObject.target.className === 'popupadd') {
      addText(eventObject);
   };
}

function listClickManager(eventObject) {
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
}

document.addEventListener('DOMContentLoaded', mainQuest);