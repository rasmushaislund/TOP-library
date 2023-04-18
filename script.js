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
const readRadio = document.querySelector('#book-status-read');
const addBookBtn = document.querySelector('.add-book-modal-btn');

const bookshelf = document.querySelector('.bookshelf');
const removeBookIcon = document.querySelector('.delete-book');
const bookNotReadBtn = document.querySelector('#not-read');
const bookReadingBtn = document.querySelector('#reading');
const bookReadBtn = document.querySelector('#read');
const bookAllStatus = document.querySelectorAll('.book-status-btn');

// non-dom variables
let myLibrary = [];

const RED = '#FC6C64';
const YELLOW = '#FCFCA4';
const GREEN = '#BCECB4';

const btnBackgroundColor = 'rgba(255, 255, 255, 1)';
const btnBorderColor = 'black';
const btnTextColor = 'black';
const btnBorderColorDimmed = 'rgba(106, 106, 106, .7)';
const btnTextColorDimmed = 'rgba(132, 132, 132, .7)';

//

// open modal on the "+"
openModalBtn.addEventListener('click', openModal);

function openModal() {
  modal.style.display = 'grid';
}

// close modal on the "x"
closeModalIcon.addEventListener('click', closeModal);

function closeModal() {
  modal.style.display = 'none';
  titleInput.value = '';
  authorInput.value = '';
  pagesInput.value = '';
  notReadRadio.checked = true;
}

// object constructor function for creating book object
function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

// add book info from modal to object constructor and push to array.
// finally, call displayBook function for visualizing library array.
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

  closeModal();
  displayBook();
}

// remove all children of bookshelf before displaying to always have the books'
// array position in sync with each book card's dataset.IndexNumber
function removeAllChildren() {
  while (bookshelf.firstChild) {
    bookshelf.removeChild(bookshelf.lastChild);
  }
}

// display book cards by looping through array
function displayBook() {
  removeAllChildren();
  if (myLibrary.length > 0) {
    bookshelf.style.display = 'grid';
  }

  for (let i = 0; i < myLibrary.length; i++) {
    let card = document.createElement('div');
    card.className = 'card';
    card.dataset.indexNumber = [i];
    bookshelf.appendChild(card);
    const cardContent = `
      <img
        class="card-close delete-book"
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
    const bookNotReadBtn = document.querySelector('#not-read');
    const bookReadingBtn = document.querySelector('#reading');
    const bookReadBtn = document.querySelector('#read');

    if (myLibrary[i].status === 'Not read') {
      bookNotReadBtn.style.backgroundColor = RED;
      bookNotReadBtn.style.color = btnTextColor;
      bookNotReadBtn.style.borderColor = btnBorderColor;
    } else if (myLibrary[i].status === 'Reading') {
      bookReadingBtn.style.backgroundColor = YELLOW;
      bookReadingBtn.style.color = btnTextColor;
      bookReadingBtn.style.borderColor = btnBorderColor;
    } else {
      bookReadBtn.style.backgroundColor = GREEN;
      bookReadBtn.style.color = btnTextColor;
      bookReadBtn.style.borderColor = btnBorderColor;
    }
  }
}

// remove book from array by pressing delete button on the book card.
// displayBook() is called again after deleting to keep book card's
// dataset.IndexNumber in sync with the book's index in array.
// Basically, the library is loaded again every time a book is deleted.
bookshelf.addEventListener('click', removeBookFromLibrary);

function removeBookFromLibrary(e) {
  if (e.target.matches('.delete-book')) {
    e.preventDefault();
    let cardParent = e.target.parentNode;
    let removeBookIndex = cardParent.dataset.indexNumber;
    myLibrary.splice(removeBookIndex, 1);
    displayBook();

    if (myLibrary.length === 0) {
      bookshelf.style.display = 'none';
    }
  }
}

// function for choosing book status for already created book card
bookshelf.addEventListener('click', setNewBookStatus);

function setNewBookStatus(e) {
  if (e.target.matches('.book-status-btn')) {
    e.preventDefault();
    resetBookBtnToDefault();

    const bookNotReadBtn = document.querySelector('#not-read');
    const bookReadingBtn = document.querySelector('#reading');
    const bookReadBtn = document.querySelector('#read');

    if (e.target.matches('#not-read')) {
      bookNotReadBtn.style.backgroundColor = RED;
      bookNotReadBtn.style.color = btnTextColor;
      bookNotReadBtn.style.borderColor = btnBorderColor;
    } else if (e.target.matches('#reading')) {
      bookReadingBtn.style.backgroundColor = YELLOW;
      bookReadingBtn.style.color = btnTextColor;
      bookReadingBtn.style.borderColor = btnBorderColor;
    } else if (e.target.matches('#read')) {
      bookReadBtn.style.backgroundColor = GREEN;
      bookReadBtn.style.color = btnTextColor;
      bookReadBtn.style.borderColor = btnBorderColor;
    }
  }
}

function resetBookBtnToDefault() {
  const bookAllStatus = document.querySelectorAll('.book-status-btn');
  bookAllStatus.forEach((status) => {
    status.style.backgroundColor = '';
    status.style.color = '';
    status.style.borderColor = '';
  });
}
