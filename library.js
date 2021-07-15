function Book(title, author, numberOfPages, isRead){
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.isRead = isRead;
}
function addBookToLibrary(book){
    myLibrary.push(book);
    // persist library to local storage
    localStorage.setItem('localLibrary', JSON.stringify(myLibrary));
    const bookEl = createBookElement(book);
    // add book to library display
    bookEl.setAttribute('data-id', parseInt(myLibrary[myLibrary.length - 1] + 1));
    libraryContainer.appendChild(bookEl);
}
function displayLibrary(library){
    for (i = 0; i < myLibrary.length; i++){
        const bookObj = library[i];
        // skip empty objects left in array from book deletions
        if (bookObj.title === undefined) continue;
        const bookEl = createBookElement(bookObj);
        // add book to library display
        bookEl.setAttribute('data-id', i);
        libraryContainer.appendChild(bookEl);
    }
}
function createBookElement(book){
    const bookShelf = document.querySelector('#bookShelf');
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
    delButton.addEventListener('click', removeBookFromLibrary);
    // add buttons
    bookContainer.appendChild(readStatusContainer);
    bookContainer.appendChild(delContainer);
    return bookContainer;
}
function toggleReadStatus(eventData){
    // check current state
    const bookIndex = eventData.target.parentElement.parentElement.getAttribute('data-id');
    const bookData = myLibrary[parseInt(bookIndex)];
    // update state
    if (bookData.isRead){
        eventData.target.classList.remove('isRead');
        bookData.isRead = false;
    } else {
        eventData.target.classList.add('isRead');
        bookData.isRead = true;
    }
}
function removeBookFromLibrary(eventData){
    const bookIndex = eventData.target.parentElement.parentElement.getAttribute('data-id');
    // insert empty object at deleted book's index to preserve span attribute references
    myLibrary.splice(bookIndex, 1, {});
    // update local storage
    localStorage.setItem('localLibrary', JSON.stringify(myLibrary));
    libraryContainer.querySelector(`span[data-id="${bookIndex}"]`).remove();
}
function createNewBookForm(){
    // remove new book button
    document.querySelector('#newBookContainer').style.display = 'none';
    const formSpan = libraryContainer.appendChild(document.createElement('span'));
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
    addBookToLibrary(newBook);
}
function cancelCreateNewBook(eventData){
    eventData.preventDefault();
    const form = eventData.target.parentElement.parentElement;
    newBookForm.remove();
    document.getElementById('newBookContainer').style.display = 'block';
}
// generate test books
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
let myLibrary = localStorage.getItem('localLibrary');
if (myLibrary) myLibrary = JSON.parse(myLibrary);
if (!myLibrary){
    myLibrary = [testBook1, testBook2, testBook3, testBook4, testBook5, testBook6, 
        testBook7, testBook8, testBook9, testBook10, testBook11];
}
document.querySelector('#newBookButton').addEventListener('click', createNewBookForm);
const libraryContainer = document.querySelector('#bookShelf');
displayLibrary(myLibrary);
