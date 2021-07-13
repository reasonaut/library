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
function removeBookFromLibrary(book){

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
    delButton.addEventListener('click', deleteBook);
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
function deleteBook(eventData){
    const bookIndex = eventData.target.parentElement.parentElement.getAttribute('data-id');
    
    delete myLibrary[bookIndex];
    const displayOfDeletedBook = libraryContainer.querySelector(`span[data-id="${bookIndex}"]`);
    displayOfDeletedBook.remove();
    // re-display updated library
    
}