// generate test books
const testBook1 = {
    title: "Gulliver's Travels",
    author: "Jonathan Swift",
    isRead: true
}
const testBook2 = {
    title: "All the Pretty Horses",
    author: "Cormack Mcarthy",
    isRead: true
}
const testBook3 = {
    title: "Dune",
    author: "Frank Herbert",
    isRead: true
}
const testBook4 = {
    title: "Zen and the Art of Motorcycle Maintenance",
    author: "Robert Pirsig",
    isRead: true
}
const testBook5 = {
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    isRead: true
}
document.querySelector('#newBookButton').addEventListener('click', createNewBookForm);
let  myLibrary = [testBook1, testBook2, testBook3, testBook4, testBook5];
const libraryContainer = document.querySelector('#bookShelf');
displayLibrary(myLibrary);



function Book(title, author, numberOfPages, isRead){
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.readStatus = isRead;
}
function addBookToLibrary(book){
    myLibrary.push(book);
}
function displayLibrary(library){
    for (i = 0; i < myLibrary.length; i++){
        const bookObj = library[i];
        const bookEl = createBookElement(bookObj);
        //add book to library display
        console.log(bookEl);
        // add identifier
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
    // check current status
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
    delete myLibrary[bookIndex];
    libraryContainer.querySelector(`span[data-id="${bookIndex}"]`).remove();
}
function createNewBookForm(){
    // remove new book button
    document.querySelector('#newBookContainer').remove()
    
    const formSpan = libraryContainer.appendChild(document.createElement('span'));
    formSpan.id = 'newBookForm';
    
    const createNewBookForm = formSpan.appendChild(document.createElement('form'));
    // title
    const nameInputLabel = createNewBookForm.appendChild(document.createElement('label'));
    createNewBookForm.appendChild(document.createElement('br'));
    nameInputLabel.setAttribute('for', 'title');
    nameInputLabel.textContent = 'Title';
    const nameInput = createNewBookForm.appendChild(document.createElement('input'));
    nameInput.id = 'title';
    nameInput.setAttribute('type', 'text');
    //author
    const authorInputLabel = createNewBookForm.appendChild(document.createElement('label'));
    createNewBookForm.appendChild(document.createElement('br'));
    authorInputLabel.setAttribute('for', 'author');
    authorInputLabel.textContent = 'Author';
    const authorInput = createNewBookForm.appendChild(document.createElement('input'));
    authorInput.id = 'author';
    authorInput.setAttribute('type', 'text');
    //pages
    const pagesInputLabel = createNewBookForm.appendChild(document.createElement('label'));
    createNewBookForm.appendChild(document.createElement('br'));
    pagesInputLabel.setAttribute('for', 'pages');
    pagesInputLabel.textContent = 'Pages';
    const pagesInput = createNewBookForm.appendChild(document.createElement('input'));
    pagesInput.id = 'pages';
    pagesInput.setAttribute('type', 'text');
    //isRead
    const radioLabel = createNewBookForm.appendChild(document.createElement('p'));
    radioLabel.textContent = 'Read?';
    const isReadInputLabelYes = createNewBookForm.appendChild(document.createElement('label'));
    createNewBookForm.appendChild(document.createElement('br'));
    isReadInputLabelYes.setAttribute('for', 'isReadYes');
    isReadInputLabelYes.textContent = 'Yes';
    const isReadInputYes = createNewBookForm.appendChild(document.createElement('input'));
    isReadInputYes.id = 'isReadYes';
    isReadInputYes.name = 'read_status';
    isReadInputYes.value = true;
    isReadInputYes.setAttribute('type', 'radio');
    const isReadInputLabelNo = createNewBookForm.appendChild(document.createElement('label'));
    createNewBookForm.appendChild(document.createElement('br'));
    isReadInputLabelNo.setAttribute('for', 'isReadNo');
    isReadInputLabelNo.textContent = 'No';
    const isReadInputNo = createNewBookForm.appendChild(document.createElement('input'));
    isReadInputNo.id = 'isReadNo';
    isReadInputNo.name = 'read_status';
    isReadInputNo.value = true;
    isReadInputNo.setAttribute('type', 'radio');
}