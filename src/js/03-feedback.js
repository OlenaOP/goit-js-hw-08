import throttle from 'lodash.throttle';

const CURRENT_FORM_STATE = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
// const message = document.querySelector('message');
// const button = document.querySelector('button');

let formState = JSON.parse(localStorage.getItem(CURRENT_FORM_STATE)) || {};

form.addEventListener('input', throttle(onTextInput, 500));

function onTextInput(evt) {
  formState[evt.target.name] = evt.target.value;
  localStorage.setItem(CURRENT_FORM_STATE, JSON.stringify(formState));
}

//form.addEventListener('input', throttle(updateOutput, 500));
updateOutput();
form.addEventListener('submit', saveMessage);

function saveMessage(evt) {
  evt.preventDefault();
  formState.email = form.elements.email.value;
  formState.message = form.elements.message.value;
  console.log('formState', formState);
  //console.log('formState.message =', formState.message);
  //console.log('form.elements.message =', form.elements.message);
  updateOutput();
  localStorage.removeItem(CURRENT_FORM_STATE);
  formState = {};
  form.reset();
}

function updateOutput() {
  form.elements.email.value =
    JSON.parse(localStorage.getItem(CURRENT_FORM_STATE)).email || '';
  form.elements.message.value =
    JSON.parse(localStorage.getItem(CURRENT_FORM_STATE)).message || '';
}
