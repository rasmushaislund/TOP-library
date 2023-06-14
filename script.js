// START //

// Global DOM variables
const openModalBtn = document.querySelector('.btn-add-book');
const dialog = document.querySelector('.modal');
const closeModalIcon = document.querySelector('#modal-close');
const titleInput = document.querySelector('#book-title');
const authorInput = document.querySelector('#book-author');
const pagesInput = document.querySelector('#book-pages');
const notReadRadio = document.querySelector('#book-status-not-read');
const readingRadio = document.querySelector('#book-status-reading');
const readRadio = document.querySelector('#book-status-read');
const addBookBtn = document.querySelector('.add-book-modal-btn');
const bookshelf = document.querySelector('.bookshelf');

// Global Non-DOM variables
let myLibrary = [];
const notReadStatus = 'Not read';
const readingStatus = 'Reading';
const readStatus = 'Read';

// Open modal on the "+"
openModalBtn.addEventListener('click', openModal);

function openModal() {
  dialog.showModal();
  titleInput.value = '';
  authorInput.value = '';
  pagesInput.value = '';
  notReadRadio.checked = true;
}

// Close modal on the "x"
closeModalIcon.addEventListener('click', closeModal);

function closeModal() {
  dialog.close();
}

// Object constructor function for creating book object
class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

// Add book info from modal to object constructor and push to array.
// Finally, call displayBook() function for visualizing library array.

addBookBtn.addEventListener('click', addBookToLibrary);

function addBookToLibrary() {
  if (
    !titleInput.checkValidity() ||
    !authorInput.checkValidity() ||
    !pagesInput.checkValidity()
  ) {
    return;
  } else {
    let title = titleInput.value;
    let author = authorInput.value;
    let pages = pagesInput.value;
    let status = '';
    if (notReadRadio.checked === true) {
      status = notReadStatus;
    } else if (readingRadio.checked === true) {
      status = readingStatus;
    } else if (readRadio.checked === true) {
      status = readStatus;
    }
    const newBook = new Book(title, author, pages, status);
    myLibrary.push(newBook);
  }
  displayBook();
  closeModal();
}

// Remove all children of bookshelf before displaying to always have the books'
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
        <button class="book-status-btn not-read" type="button">
          Not read
        </button>
        <button class="book-status-btn reading" type="button">
          Reading
        </button>
        <button class="book-status-btn read" type="button">
          Read
        </button>
      </div>
    `;
    card.innerHTML += cardContent;

    if (myLibrary[i].status === notReadStatus) {
      card.querySelector('.not-read').setAttribute('data-status', 'red');
    } else if (myLibrary[i].status === readingStatus) {
      card.querySelector('.reading').setAttribute('data-status', 'yellow');
    } else {
      card.querySelector('.read').setAttribute('data-status', 'green');
    }
  }
}

// Remove book from array by pressing delete button on the book card.
// DisplayBook() is called again after deleting to keep book card's
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
    let buttonParent = e.target.parentNode;
    let buttonGrandParent = buttonParent.parentNode;
    let buttonGrandParentIndex = buttonGrandParent.dataset.indexNumber;
    myLibrary[buttonGrandParentIndex].status = e.target.outerText;

    displayBook();
  }
}

// END //
