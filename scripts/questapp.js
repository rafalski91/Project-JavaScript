//-------- let $sample = DOM ELEMENTS ----------------------------->

let $welcomePage, $buttonWelcome, $contApp, $questList, $questTitle, $questAdd, $pop, $popExit, $popOverlay;

//-------- UPLOAD LOCAL DATE ----------------------------->

let currentDate = new Date();
y = currentDate.getFullYear();
const monthNames = ["January", "February", "March", "April", "May", "June",
   "July", "August", "September", "October", "November", "December"];
m = monthNames[currentDate.getMonth() + 1];
d = currentDate.getDate();

//---------------------------------------------------------->

function mainQuest() {
   pickDOMEelements();
   listenerDOMEvents();
   initialList();
   
}

function pickDOMEelements() {
   $welcomePage = document.getElementById('welcome');
   $buttonWelcome = document.getElementById('welcomeButton');
   $contApp = document.getElementById('container');
   document.getElementById("date").innerHTML = d + " / " + m + " / " + y;
   $questList = document.getElementById('list');
   $questTitle = document.getElementById('headtitle');
   $questAdd = document.querySelector('.headinput');
   $pop = document.querySelector('.popup');
   $popExit = document.querySelector('.exitpopup');
   $popOverlay = document.querySelector('.popupOverlay');
}

function listenerDOMEvents() {
   $buttonWelcome.addEventListener('click', slideUp);
   $questAdd.addEventListener('click', addButtonListener);
   $questAdd.addEventListener('keyup', addButtonListener);
   $questList.addEventListener('click', listClickManager);
   $pop.addEventListener('click', popupClickManager);
   $popExit.addEventListener('click', popupClickManager);
}

//-------- OPEN SLIDE ----------------------------->

function slideUp(eventObject) {
   if(eventObject.target = $buttonWelcome) {
     $welcomePage.style.height = '0';
     $contApp.style.display = "block";
     $contApp.style.marginTop = "0";
     getAllQuestsAndAddToList();
   };
 }

 //-------- API GET ----------------------------->

async function getAllQuestsAndAddToList() {
   let quests = await axios.get('http://195.181.210.249:3000/todo/');

   // questsID = quests.data.id
   
   quests.data.filter(quest => quest.author === 'RW').forEach(quest => {
      newQuest(quest.title, quest.id)});
}

//-------- ADD / CREATE NEW TASK ----------------------------->

function initialList() {
   const intList = ['Dodawaj, edytuj, usuwaj, oznaczaj zadania'];
   intList.forEach(quest => {
      newQuest(quest);
   });
}

 //-------- API POST ----------------------------->

async function addNewQuest(pareDone) {
   await axios.post('http://195.181.210.249:3000/todo/', {
      title: $questTitle.value,
      author: 'RW',
      // extra: doneQuest(pareDone),
   });
}

function addButtonListener(event) {
   if (event.keyCode == 13 || event.target.className === 'headadd') {
      let isEmpty = false;
      let tname = $questTitle.value;
      if (tname === "") {
         alert("Title cannot by empty");
         isEmpty = true;
      };
      if (isEmpty === false) {
         newQuest($questTitle.value);
         $questTitle.value = " ";
         addNewQuest();
      };
   };
}

function newQuest(title, id) {
   const newElement = createElement(title, id);
   $questList.appendChild(newElement);
}

function createElement(title, id) {
   const newElement = document.createElement('li');
   newElement.setAttribute("id", id)
   newElement.classList.add('Quest-') + id;
   const textElement = document.createTextNode(title);
   const spanElement = document.createElement('span');
   spanElement.setAttribute("id", id)
   spanElement.classList.add('text');
   newElement.appendChild(spanElement);
   spanElement.appendChild(textElement);
   const divElement = document.createElement('div');
   divElement.setAttribute("id", id)
   divElement.classList.add('buttons');
   spanElement.after(divElement);
   const deleteElement = document.createElement('button');
   deleteElement.setAttribute("id", id)
   deleteElement.classList.add('delete-') + id;
   deleteElement.innerText = "Delete";
   divElement.appendChild(deleteElement);
   const editElement = document.createElement('button');
   editElement.setAttribute("id", id)
   editElement.classList.add('edit-')+ id;
   editElement.innerText = "Edit";
   deleteElement.after(editElement);
   const doneElement = document.createElement('button');
   doneElement.setAttribute("id", id)
   doneElement.classList.add('done-') + id;
   doneElement.innerText = "Done";
   editElement.after(doneElement);
   return newElement;
}

//-------- BUTTONS ----------------------------->

function listClickManager(eventObject) {
   let buttonTarget = eventObject.target.classList
   if (buttonTarget == "delete-") {
      removeItem();
   };
   if (buttonTarget == "edit-") {
      editItem();
      var editText = eventObject.target.parentNode.parentNode.querySelector('.text').textContent;
      var saveElement = eventObject.target.parentNode.parentNode.querySelector('.text');
      saveElement.classList.add('newText');
      var textToEdit = $pop.querySelector('#popuptitle');
      textToEdit.value = editText;
   };
   if (buttonTarget == "done-") {
      doneItem();
   };
}

//-------- API DELETE ----------------------------->

async function delQuest(idElement) { 
   await axios.delete('http://195.181.210.249:3000/todo/' + idElement); 
 }

function removeItem() {
      let buttonTarget = event.target.parentElement.parentElement
      let idElement = buttonTarget.id
      buttonTarget.remove()
      delQuest(idElement);
   };



//-------- API EDIT ----------------------------->

async function editQuest(idElement, textElement) {
   await axios.put('http://195.181.210.249:3000/todo/' + idElement, {
      title: textElement.innerText,
   });
   debugger;
 }

function editItem() {
   let buttonTarget = event.target.classList
   if (buttonTarget == "edit-") {
      $pop.style.display = 'block';
      $popExit.style.display = 'block';
      $popOverlay.style.display = 'block';
   };
}

//-------- API DONE ----------------------------->

async function doneQuest(pareDone) {
   await axios.put('http://195.181.210.249:3000/todo/', {
      extra: pareDone.value
   })
   debugger;
 }

function doneItem() {
   let buttonTarget = event.target.classList
   var parents = event.target.parentElement.parentElement;
   if (buttonTarget == 'done-' && parents.firstChild.style.textDecoration !== 'line-through') {
      parents.firstChild.style.textDecoration = 'line-through',
      pareDone = true;
   } else if (parents.firstChild.style.textDecoration == 'line-through') {
      parents.firstChild.style.textDecoration = 'none',
      pareDone = false;
      doneQuest(pareDone)
      debugger;
   };

}

//-------- POPUP ----------------------------->

function popupClickManager(eventObject) {
   if (eventObject.target.className === 'popupcancel' || eventObject.target.className === 'fas fa-times') {
      popupCancel(eventObject);
   };
   if (eventObject.target.className === 'popupadd') {
      addText(eventObject);
   };
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
   let idElement = editedText.id
   let textElement = editedText.innerText
   editQuest(idElement, editedText, textElement)
}

document.addEventListener('DOMContentLoaded', mainQuest)
   

