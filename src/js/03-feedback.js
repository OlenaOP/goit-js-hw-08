import throttle from 'lodash.throttle';

const CURRENT_FORM_STATE = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
// const message = document.querySelector('message');
// const button = document.querySelector('button');

let formState = JSON.parse(localStorage.getItem(CURRENT_FORM_STATE)) || {};

form.addEventListener('input', throttle(onTextInput, 500));

function onTextInput(evt) {
  formState[evt.target.name] = evt.target.value;
  const stringData = JSON.stringify(formState);
  localStorage.setItem(CURRENT_FORM_STATE, stringData);
  //localStorage.setItem(CURRENT_FORM_STATE, JSON.stringify(formState));
}

//const form = document.querySelector('#message-form');
//const output = document.querySelector('#output');
//const LOCALSTORAGE_KEY = 'goit-example-message';
//form.addEventListener('input', throttle(updateOutput, 500));
updateOutput();
form.addEventListener('submit', saveMessage);

function saveMessage(evt) {
  evt.preventDefault();
  console.log('formState', formState);
  formState.email = form.elements.email.value;
  formState.message = form.elements.message.value;
  console.log('formState.message', formState.message);
  console.log('form.elements.message', form.elements.message);
  localStorage.removeItem(CURRENT_FORM_STATE);
  formState = {};
  //updateOutput();
  form.reset();
}

function updateOutput() {
  form.elements.email.value =
    JSON.parse(localStorage.getItem(CURRENT_FORM_STATE)).email || '';
  form.elements.message.textContent =
    JSON.parse(localStorage.getItem(CURRENT_FORM_STATE)).message || '';
}
