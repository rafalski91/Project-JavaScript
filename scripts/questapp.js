let $welcomePage, $buttonWelcome, $contApp, $questList, $questTitle, $questAdd, $pop, $popExit, $popOverlay;

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
   $questAdd.addEventListener('click', addClickHandler);
   $questAdd.addEventListener('keyup', enterClickHandler);
   $questList.addEventListener('click', listClickManager);
   $pop.addEventListener('click', popupClickManager);
   $popExit.addEventListener('click', popupClickManager);
}

function slideUp(eventObject) {
   if(eventObject.target = $buttonWelcome) {
     $welcomePage.style.height = '0';
     $contApp.style.display = "block";
     $contApp.style.marginTop = "0";
     getAllQuests();
   };
 }

async function getAllQuests() {
   let quests = await axios.get('http://195.181.210.249:3000/todo/');
   // var resultElement = $questList;
   // // resultElement.innerHTML = '';
   // filter(quest => quest.author === 'RW').
    quests.data.filter(quest => quest.author === 'RW').forEach(quest => {
      newQuest(quest.title, quest.id, quest.extra)});
   // $questList.appendChild(resultElement);
   console.log(quests.data.filter(quest => quest.author === 'RW'))
   
 }

 async function addNewQuest(id) {
   await axios.post('http://195.181.210.249:3000/todo/' + id, {
      title: $questTitle.value,
      author: 'RW',
   });
 }

 async function delQuest(id) {
   await axios.delete('http://195.181.210.249:3000/todo/' + id);
   $questList.innerHTML = '';
   getAllQuests();
 }

 async function doneQuest(id) {
   await axios.put('http://195.181.210.249:3000/todo/' + id), {
      extra: doneItem(pareDone),
   }
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
      
   };
   addNewQuest();
}

function enterClickHandler(event) {
   if (event.keyCode == 13) {
      var isEmpty = false,
      tname = $questTitle.value;
      if (tname === "") {
         alert("Title cannot by empty");
         isEmpty = true;
      };
      if (isEmpty === false) {
         newQuest($questTitle.value);
         
      };
      addNewQuest();
   };
}

function newQuest(title, id) {
   const newElement = createElement(title, id);
   $questList.appendChild(newElement);
}

function createElement(title, id) {
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
   return newElement;
}

function removeItem(eventObject, idToDelete) {
   let delBtn = eventObject.target.classList.contains('delete');
   if (delBtn === true) {
      var parent = eventObject.target.parentElement.parentElement;
      console.log(parent);
      parent.remove(idToDelete);
   };
   delQuest(idToDelete);
}

function doneItem(eventObject) {
   let doneBtn = eventObject.target.classList.contains('done');
   var parents = eventObject.target.parentElement.parentElement;
   if (doneBtn === true && parents.firstChild.style.textDecoration !== 'line-through') {
      parents.firstChild.style.textDecoration = 'line-through',
      pareDone = true;
   } else if (parents.firstChild.style.textDecoration == 'line-through') {
      parents.firstChild.style.textDecoration = 'none',
      pareDone = false;
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