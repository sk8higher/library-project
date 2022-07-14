'use strict';

const btnAddBook = document.querySelector('#add-book-button');
const booksGrid = document.querySelector('#books-grid');
const modalWindow = document.querySelector('.add-book-modal');
const modalOverlay = document.querySelector('.modal-overlay');
const btnModalClose = document.querySelector('.add-book-modal__close-button');

function showModal() {
  modalWindow.classList.toggle('hidden');
  modalOverlay.classList.toggle('hidden');
}

function closeModal() {
  modalWindow.classList.toggle('hidden');
  modalOverlay.classList.toggle('hidden');
}

btnAddBook.addEventListener('click', showModal);
modalOverlay.addEventListener('click', closeModal);
btnModalClose.addEventListener('click', closeModal);
