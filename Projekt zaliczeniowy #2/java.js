let welcomePage;
let buttonWelcome;

function main() {
  searchDOMEelements();
  prepareDOMEvents();
};

function searchDOMEelements() {
  welcomePage = document.getElementById('welcome');
  buttonWelcome = document.getElementById('welcomeButton');
};

function prepareDOMEvents() {
  buttonWelcome.addEventListener('click', slideUp);
};

function slideUp(eventObject) {
  if(eventObject.target = buttonWelcome) {
    welcomePage.style.height = '0';
  }

  else{console.log('nie dziala');}
};














document.addEventListener('DOMContentLoaded', main);   