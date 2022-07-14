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

let myLibrary = [];

/**
 * TODO: refactor to a class
 * A constructor for Book object.
 * @function Book
 * @param {string} title
 * @param {string} author
 * @param {number} pages
 * @param {boolean} isRead
 */
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary(Book) {
  myLibrary.push(Book);
}

function createBookCards(Book) {
  const booksGridBook = document.createElement('div');
  booksGridBook.classList.add('books-grid__book');

  const titleCardElement = document.createElement('p');
  titleCardElement.classList.add('books-grid__book-title', 'card-text');
  titleCardElement.innerHTML = `"${Book.title}"`;

  const authorCardElement = document.createElement('p');
  authorCardElement.classList.add('books-grid__book-author', 'card-text');
  authorCardElement.innerHTML = `${Book.author}`;

  const pagesCardElement = document.createElement('p');
  pagesCardElement.classList.add('books-grid__book-pages', 'card-text');
  pagesCardElement.innerHTML = `${Book.pages} pages`;

  const buttonsContainerCardElement = document.createElement('div');
  buttonsContainerCardElement.classList.add('books-grid__buttons-container');

  const isReadCardButton = document.createElement('button');
  isReadCardButton.classList.add(
    Book.isRead ? 'books-grid__book-is-read' : 'is-not-read',
    'card-buttons'
  );
  isReadCardButton.innerHTML = Book.isRead ? 'Remove from read' : 'Add to read';

  const removeBookCardButton = document.createElement('button');
  removeBookCardButton.classList.add('books-grid__book-remove', 'card-buttons');
  removeBookCardButton.innerHTML = 'Remove book from library';

  booksGrid.insertAdjacentElement('beforeend', booksGridBook);

  booksGridBook.insertAdjacentElement('beforeend', titleCardElement);
  booksGridBook.insertAdjacentElement('beforeend', authorCardElement);
  booksGridBook.insertAdjacentElement('beforeend', pagesCardElement);
  booksGridBook.insertAdjacentElement('beforeend', buttonsContainerCardElement);

  buttonsContainerCardElement.insertAdjacentElement(
    'afterbegin',
    isReadCardButton
  );
  buttonsContainerCardElement.insertAdjacentElement(
    'beforeend',
    removeBookCardButton
  );
}

const isBlank = (value) => (value !== '' ? false : true);

function showModal() {
  modalWindow.classList.toggle('hidden');
  modalOverlay.classList.toggle('hidden');
}

function closeModal() {
  modalWindow.classList.toggle('hidden');
  modalOverlay.classList.toggle('hidden');
}

/**
 * Validates the form input and returns if it is valid.
 * @function checkTextInput
 * @param {Element} element The input that we want to validate.
 * @returns {boolean} If the input field valid.
 */
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

/**
 * Shows error in <small> element under input field and adds error styles to the field.
 * @function showError
 * @param {Element} input An input element that we want to manipulate.
 * @param {string} msg The text value to show under input field.
 */
function showError(input, msg) {
  const inputElem = input.parentElement;

  input.classList.remove('success');
  input.classList.add('error');

  const error = inputElem.querySelector('small');
  error.textContent = msg;
}

/**
 * Adds success styles to the input and deletes error text in <small> element.
 * @param {Element} input An input element that we want to manipulate.
 */
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

  let isFormValid =
    isTitleInputValid && isAuthorInputValid && isPagesInputValid;

  if (isFormValid) {
    let titleText = titleInput.value.trim();
    let authorText = authorInput.value.trim();
    let pagesNumber = pagesInput.value.trim();
    let isReadValue = isReadInput.checked;
    let addingBook = new Book(titleText, authorText, pagesNumber, isReadValue);
    addBookToLibrary(addingBook);

    createBookCards(addingBook);

    closeModal();
  }
});
