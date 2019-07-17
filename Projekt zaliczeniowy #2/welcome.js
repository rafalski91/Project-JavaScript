let $welcomePage, $buttonWelcome, $contApp

function main() {
  searchDOMEelements();
  prepareDOMEvents();
};

function searchDOMEelements() {
  $welcomePage = document.getElementById('welcome');
  $buttonWelcome = document.getElementById('welcomeButton');
  $contApp = document.getElementById('container');
};

function prepareDOMEvents() {
  $buttonWelcome.addEventListener('click', slideUp);
};

function slideUp(eventObject) {
  if(eventObject.target = $buttonWelcome) {
    $welcomePage.style.height = '0';
    $contApp.style.display = "block";
    $contApp.style.marginTop = "0";
  }

  else{console.log('nie dziala');}
};

document.addEventListener('DOMContentLoaded', main);   