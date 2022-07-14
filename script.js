'use strict';

const btnAddBook = document.querySelector('#add-book-button');
const booksGrid = document.querySelector('#books-grid');
const modalWindow = document.querySelector('.add-book-modal');
const modalOverlay = document.querySelector('.modal-overlay');
const btnModalClose = document.querySelector('.add-book-modal__close-button');
const modalForm = document.querySelector('.add-book-modal__form');

const titleInput = document.querySelector('#title-input');
const authorInput = document.querySelector('#author-input');
const pagesInput = document.querySelector('#pages-input');
const isReadInput = document.querySelector('#is-read-input');

const isBlank = (value) => (value !== '' ? false : true);

function showModal() {
  modalWindow.classList.toggle('hidden');
  modalOverlay.classList.toggle('hidden');
}

function closeModal() {
  modalWindow.classList.toggle('hidden');
  modalOverlay.classList.toggle('hidden');
}

function checkTextInput(element) {
  let isValid = false;
  const textInputValue = element.value.trim();

  if (isBlank(textInputValue)) {
    showError(element, 'This field cannot be blank.');
  } else {
    showSuccess(element);
    isValid = true;
  }

  return isValid;
}

function showError(input, msg) {
  const inputElem = input.parentElement;

  input.classList.remove('success');
  input.classList.add('error');

  const error = inputElem.querySelector('small');
  error.textContent = msg;
}

function showSuccess(input) {
  const inputElem = input.parentElement;

  input.classList.remove('error');
  input.classList.add('success');

  const error = inputElem.querySelector('small');
  error.textContent = '';
}

btnAddBook.addEventListener('click', showModal);
modalOverlay.addEventListener('click', closeModal);
btnModalClose.addEventListener('click', closeModal);
modalForm.addEventListener('submit', function (e) {
  e.preventDefault();
  let isTitleInputValid = checkTextInput(titleInput);
  let isAuthorInputValid = checkTextInput(authorInput);
  let isPagesInputValid = checkTextInput(pagesInput);
  let isReadInputValid = checkTextInput(isReadInput);

  let isFormValid =
    isTitleInputValid &&
    isAuthorInputValid &&
    isPagesInputValid &&
    isReadInputValid;

  if (isFormValid) {
    submit();
  }
});
