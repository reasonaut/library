class Book {
    constructor(title, author, numberOfPages, isRead) {
        this.title = title;
        this.author = author;
        this.numberOfPages = numberOfPages;
        this.isRead = isRead;
    }    
}
class Library {
    constructor(books) {
        this.books = books;
    }
    libraryContainer = document.querySelector('#bookShelf');
    addBookToLibrary(book){
        this.books.push(book);
        // persist library to local storage
        localStorage.setItem('localLibrary', JSON.stringify(this.books));
        const bookEl = createBookElement(book);
        // add book to library display
        bookEl.setAttribute('data-id', parseInt(this.books[this.books.length - 1] + 1));
        this.libraryContainer.appendChild(bookEl);
    }
    removeBookFromLibrary(bookIndex){
        // insert empty object at deleted book's index to preserve span attribute references
        this.books.splice(bookIndex, 1, {});
        // update local storage
        localStorage.setItem('localLibrary', JSON.stringify(myLibrary.books));
        this.libraryContainer.querySelector(`span[data-id="${bookIndex}"]`).remove();
    }
    displayLibrary(){
        this.libraryContainer.innerHTML = '';
        for (let i = 0; i < this.books.length; i++){
            const bookObj = this.books[i];
            // skip empty objects left in array from book deletions
            if (bookObj.title === undefined) continue;
            const bookEl = createBookElement(bookObj);
            // add book to library display
            bookEl.setAttribute('data-id', i);
            this.libraryContainer.appendChild(bookEl);
        }
    }
}

function createBookElement(book){
    const bookContainer = document.createElement('span');
    bookContainer.appendChild(document.createElement('p'));
    // add title
    bookContainer.querySelector('p').innerText = book.title;
    // create read status button
    const readStatusContainer = document.createElement('div');
    const readButton = readStatusContainer.appendChild(document.createElement('button'))
    readButton.classList.add('readStatus');
    readButton.innerText = 'Read';
    if (book.isRead) readButton.classList.add('isRead');
    readButton.addEventListener('click', toggleReadStatus);
    // add delete button
    const delContainer = document.createElement('div');
    const delButton = delContainer.appendChild(document.createElement('button'));
    delButton.classList.add('delButton');
    delButton.innerText = 'Delete';
    delButton.addEventListener('click', removeBookElement);
    // add buttons
    bookContainer.appendChild(readStatusContainer);
    bookContainer.appendChild(delContainer);
    // add edit functionality
    bookContainer.addEventListener('click', editBook);
    return bookContainer;
}
function toggleReadStatus(eventData){
    // check current state
    const bookIndex = eventData.target.parentElement.parentElement.getAttribute('data-id');
    const bookData = myLibrary.books[parseInt(bookIndex)];
    // update state
    if (bookData.isRead){
        eventData.target.classList.remove('isRead');
        bookData.isRead = false;
    } else {
        eventData.target.classList.add('isRead');
        bookData.isRead = true;
    }
}
function removeBookElement(eventData) {
    const bookIndex = eventData.target.parentElement.parentElement.getAttribute('data-id');
    myLibrary.removeBookFromLibrary(bookIndex);
}
function editBook(eventData){
    const book = eventData.target;
    let bookId;
    if (book.tagName.toLowerCase() === 'span') {
        bookId = book.getAttribute('data-id');
    } else {
        bookId = book.parentElement.getAttribute('data-id');
    }
    const bookData = myLibrary.books[bookId];
    displayEditWindow(bookData, bookId);
}
function displayEditWindow(bookData, bookId){
    if (!bookData || !bookId) return;
    const editWindow = popupWindow('editWindow', 250, 260);
    const windowBody = editWindow.document.body;
    windowBody.innerHTML = '';
    windowBody.style.background = 'rgba(68, 51, 29, 0.336)';
    editWindow.focus();
    windowBody.style.textAlign = 'center';
    const title = windowBody.appendChild(document.createElement('p'));
    title.innerText = 'Title';
    title.setAttribute('data-id', bookId);
    const titleField = windowBody.appendChild(document.createElement('input'));
    titleField.setAttribute('type', 'text');
    titleField.style.textAlign = 'center';
    titleField.style.width = '250px';
    titleField.defaultValue = bookData.title;
    const author = windowBody.appendChild(document.createElement('p'));
    author.innerText = 'Author';
    const authorField = windowBody.appendChild(document.createElement('input'));
    authorField.setAttribute('type', 'text');
    authorField.style.textAlign = 'center';
    authorField.style.width = '250px';
    authorField.defaultValue = bookData.author;
    const pages = windowBody.appendChild(document.createElement('p'));
    pages.innerText = 'Pages';
    const pagesField = windowBody.appendChild(document.createElement('input'));
    pagesField.setAttribute('type', 'text');
    pagesField.style.textAlign = 'center';
    pagesField.style.width = '250px';
    pagesField.defaultValue = bookData.numberOfPages;
    const submitButton = windowBody.appendChild(document.createElement('button'));
    submitButton.textContent = 'Submit';
    submitButton.style.margin = '15px';
    submitButton.addEventListener('click', submitEditedBookValues);
}
function submitEditedBookValues(eventData){
    const formContainer = eventData.target;
    const book = formContainer.parentElement;
    const bookId = parseInt(book.querySelector('p').getAttribute('data-id'));
    const bookData = myLibrary.books[bookId];
    const inputs = book.querySelectorAll('input');
    bookData.title = inputs[0].value;
    bookData.author = inputs[1].value;
    bookData.numberOfPages = inputs[2].value;
    myLibrary.books.splice(bookId, 1, bookData);
    // persist library to local storage
    localStorage.setItem('localLibrary', JSON.stringify(myLibrary.books));
    myLibrary.displayLibrary();
    formContainer.ownerDocument.defaultView.close();
}
function popupWindow(windowName, width, height){
    const y = window.self.top.outerHeight / 2 + window.self.top.screenY - (height / 2);
    const x = window.self.top.outerWidth / 2 + window.self.top.screenX - (width / 2);
    return window.self.open('', windowName, 
        `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no width=${width}, height=${height}, top=${y}, left=${x}`);
}
function createNewBookForm(){
    // remove new book button
    document.querySelector('#newBookContainer').style.display = 'none';
    const formSpan = document.querySelector('#bookShelf').appendChild(document.createElement('span'));
    formSpan.id = 'newBookForm';
    const createNewBookForm = formSpan.appendChild(document.createElement('form'));
    // title
    const titleInputLabel = createNewBookForm.appendChild(document.createElement('label'));
    createNewBookForm.appendChild(document.createElement('br'));
    titleInputLabel.setAttribute('for', 'titleField');
    titleInputLabel.textContent = 'Title';
    const nameInput = createNewBookForm.appendChild(document.createElement('input'));
    nameInput.id = 'titleField';
    nameInput.setAttribute('type', 'text');
    // author
    const authorInputLabel = createNewBookForm.appendChild(document.createElement('label'));
    createNewBookForm.appendChild(document.createElement('br'));
    authorInputLabel.setAttribute('for', 'author');
    authorInputLabel.textContent = 'Author';
    const authorInput = createNewBookForm.appendChild(document.createElement('input'));
    authorInput.id = 'author';
    authorInput.setAttribute('type', 'text');
    // pages
    createNewBookForm.appendChild(document.createElement('br'));
    const pagesInputLabel = createNewBookForm.appendChild(document.createElement('label'));
    createNewBookForm.appendChild(document.createElement('br'));
    pagesInputLabel.setAttribute('for', 'pages');
    pagesInputLabel.textContent = 'Pages';
    const pagesInput = createNewBookForm.appendChild(document.createElement('input'));
    pagesInput.id = 'pages';
    pagesInput.setAttribute('type', 'text');
    // isRead
    const radioLabel = createNewBookForm.appendChild(document.createElement('p'));
    radioLabel.textContent = 'Read?';
    const isReadInputLabelYes = createNewBookForm.appendChild(document.createElement('label'));
    isReadInputLabelYes.setAttribute('for', 'isReadYes');
    isReadInputLabelYes.textContent = 'Yes';
    const isReadInputYes = createNewBookForm.appendChild(document.createElement('input'));
    isReadInputYes.setAttribute('type', 'radio');
    isReadInputYes.id = 'isReadYes';
    isReadInputYes.name = 'readStatus';
    isReadInputYes.value = true;
    createNewBookForm.appendChild(document.createElement('br'));
    const isReadInputLabelNo = createNewBookForm.appendChild(document.createElement('label'));
    isReadInputLabelNo.setAttribute('for', 'isReadNo');
    isReadInputLabelNo.textContent = 'No';
    const isReadInputNo = createNewBookForm.appendChild(document.createElement('input'));
    isReadInputNo.setAttribute('type', 'radio');
    isReadInputNo.id = 'isReadNo';
    isReadInputNo.name = 'readStatus';
    isReadInputNo.value = false;
    // button span
    const buttonSpan = createNewBookForm.appendChild(document.createElement('span'));
    buttonSpan.id = 'formButtonsContainer';
    // confirm button
    const confirmButton = buttonSpan.appendChild(document.createElement('button'));
    confirmButton.id = 'confirmNewBookButton';
    confirmButton.style.background = 'url(/img/plus-icon.png) no-repeat';
    confirmButton.style.backgroundSize = '22px';
    confirmButton.style.width = '25px';
    confirmButton.style.height = '25px';
    confirmButton.addEventListener('click', createNewBook);
    // cancel button
    const cancelButton = buttonSpan.appendChild(document.createElement('button'));
    cancelButton.id = 'cancelNewBookButton';
    cancelButton.textContent = 'X';
    cancelButton.style.width = '25px';
    cancelButton.style.height = '25px';
    cancelButton.addEventListener('click', cancelCreateNewBook);
}
function createNewBook(eventData){
    eventData.preventDefault();
    const newBookForm = document.getElementById('newBookForm');
    // validate data
    const title = document.getElementById('titleField').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const isRead = document.getElementById('isReadYes').checked;
    if (title === '' || author === '' || isNaN(parseInt(pages))){
        return;
    }
    const newBook = new Book(title, author, pages, isRead);
    newBookForm.remove();
    document.querySelector('#newBookContainer').style.display = 'block';
    myLibrary.addBookToLibrary(newBook);
}
function cancelCreateNewBook(eventData){
    eventData.preventDefault();
    const form = eventData.target.parentElement.parentElement;
    newBookForm.remove();
    document.getElementById('newBookContainer').style.display = 'block';
}
// test book data
const testBook1 = {
    title: "Gulliver's Travels",
    author: "Jonathan Swift",
    isRead: false,
    numberOfPages: 299
}
const testBook2 = {
    title: "All the Pretty Horses",
    author: "Cormack Mcarthy",
    isRead: false,
    numberOfPages: 291
}
const testBook3 = {
    title: "Dune",
    author: "Frank Herbert",
    isRead: true,
    numberOfPages: 468
}
const testBook4 = {
    title: "Zen and the Art of Motorcycle Maintenance",
    author: "Robert Pirsig",
    isRead: true,
    numberOfPages: 370
}
const testBook5 = {
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    isRead: true,
    numberOfPages: 225
}
const testBook6 = {
    title: "The Professor and the Madman",
    author: "Simon Winchester",
    isRead: false,
    numberOfPages: 237
}
const testBook7 = {
    title: "Kundalini: The Evolutionary Energy in Man",
    author: "Gopi Krishna",
    isRead: true,
    numberOfPages: 250
}
const testBook8 = {
    title: "Player Piano",
    author: "Kurt Vonnegut, Jr.",
    isRead: true,
    numberOfPages: 320
}
const testBook9 = {
    title: "Mindsight: The New Science of Personal Transformation",
    author: "Daniel J. Siegel, M.D.",
    isRead: false,
    numberOfPages: 293
}
const testBook10 = {
    title: "A Bit on the Side",
    author: "William Trevor",
    isRead: false,
    numberOfPages: 243
}
const testBook11 = {
    title: "21 Lessons for the 21st Century",
    author: "Yuval Noah Harari",
    isRead: true,
    numberOfPages: 349
}
// check for locally stored library
let storedBooks = localStorage.getItem('localLibrary');
if (storedBooks) storedBooks = JSON.parse(storedBooks);
if (!storedBooks){
    storedBooks = [testBook1, testBook2, testBook3, testBook4, testBook5, testBook6, 
        testBook7, testBook8, testBook9, testBook10, testBook11];
}
myLibrary = new Library(storedBooks);
document.querySelector('#newBookButton').addEventListener('click', createNewBookForm);
myLibrary.displayLibrary();
