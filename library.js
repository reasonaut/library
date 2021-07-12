// generate test books
const testBook1 = {
    title: "Gulliver's Travels",
    author: "Jonathan Swift"

}
let  myLibrary = [testBook1];
displayLibrary(myLibrary);

function Book(title, author, numberOfPages, readStatus){
    this.title = title;
    this.author = author;
    this.numberOfPages = this.numberOfPages;
    this.readStatus = readStatus;
}


function addBookToLibrary(book){
    myLibrary.push(book);
}
function removeBookFromLibrary(book){

}
function displayLibrary(library){
    const libraryContainer = document.querySelector('#bookShelf');
    for (i = 0; i < myLibrary.length; i++){
        const bookObj = library[i];
        const bookEl = createBookElement(bookObj);
        //add book to library display
        console.log(bookEl);
        libraryContainer.appendChild(bookEl);

        
    }
    

}
function createBookElement(book){
    const bookShelf = document.querySelector('#bookShelf');
    const bookContainer = document.createElement('span');
    // add identifier
    bookContainer.setAttribute('data-id', i);
    bookContainer.appendChild(document.createElement('h1'));
    // add title
    bookContainer.querySelector('h1').innerText = book.title;
    // create read status button
    const readStatusContainer = document.createElement('div');
    readStatusContainer.appendChild(document.createElement('button')).classList.add('readStatus');
    readStatusContainer.querySelector('button').addEventListener('click', toggleReadStatus);
    
    
    // add read status button
    const readStatus = bookContainer.appendChild(readStatusContainer);
    
    // add delete button
    return bookContainer;

}
function toggleReadStatus(){

}