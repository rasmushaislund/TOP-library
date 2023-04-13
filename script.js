// START //

// dom variables
const openModalBtn = document.querySelector('.btn-add-book');

const modal = document.querySelector('.modal');
const closeModalIcon = document.querySelector('#modal-close');
const titleInput = document.querySelector('#book-title');
const authorInput = document.querySelector('#book-author');
const pagesInput = document.querySelector('#book-pages');
const notReadRadio = document.querySelector('#book-status-not-read');
const readingRadio = document.querySelector('#book-status-reading');
// const readRadio = document.querySelector('#book-status-read');
const addBookBtn = document.querySelector('.add-book-modal-btn');

const bookshelf = document.querySelector('.bookshelf');
const removeBookIcon = document.querySelector('.card-close');
const bookNotReadBtn = document.querySelector('#not-read');
const bookReadingBtn = document.querySelector('#reading');
const bookReadBtn = document.querySelector('#read');
const bookAllStatus = document.querySelectorAll('.book-status-btn');

// non-dom variables
let myLibrary = [];

//

// open modal on the "+"
openModalBtn.addEventListener('click', openModal);

function openModal() {
  modal.style.visibility = 'visible';
}

// close modal on the "x"
closeModalIcon.addEventListener('click', closeModal);

function closeModal() {
  modal.style.visibility = 'hidden';
  titleInput.value = '';
  authorInput.value = '';
  pagesInput.value = '';
  notReadRadio.checked = true;
}

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

// add book info from modal as object into array
addBookBtn.addEventListener('click', addBookToLibrary);

function addBookToLibrary() {
  let title = titleInput.value;
  let author = authorInput.value;
  let pages = pagesInput.value;
  let status = '';
  if (notReadRadio.checked === true) {
    status = 'Not read';
  } else if (readingRadio.checked === true) {
    status = 'Reading';
  } else {
    status = 'Read';
  }
  const newBook = new Book(title, author, pages, status);
  myLibrary.push(newBook);
  console.log(myLibrary);

  closeModal();
  displayBook();
}

// display book cards by looping through array
function displayBook() {
  for (let i = myLibrary.length - 1; i < myLibrary.length; i++) {
    let card = document.createElement('div');
    card.className = 'card';
    card.dataset.indexNumber = [i];
    bookshelf.appendChild(card);

    const cardContent = `
      <img
        class="card-close"
        src="./img/close.svg"
        alt="icon for closing"
      />
      <p class="card-header card-header1">Title</p>
      <p class="card-text card-text1">${myLibrary[i].title}</p>
      <p class="card-header card-header2">Author</p>
      <p class="card-text card-text2">${myLibrary[i].author}</p>
      <p class="card-header card-header3">Pages</p>
      <p class="card-text card-text3">${myLibrary[i].pages}</p>
      <div class="book-status">
        <button class="book-status-btn" id="not-read" type="button">
          Not read
        </button>
        <button class="book-status-btn" id="reading" type="button">
          Reading
        </button>
        <button class="book-status-btn" id="read" type="button">
          Read
        </button>
      </div>
    `;
    card.innerHTML += cardContent;
  }
}

// remove book from array by pressing close button on the book card
function removeBookFromLibrary(e) {
  let target = e.target;
  console.log(target);
}
