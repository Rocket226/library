
function openBookModal(id=null) {
    if (id) {

    }
    dialog.showModal();
}

function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
    this.id = Date.now();
}

function addBookToLibrary(title, author, pages, hasRead) {
    const book = new Book(title, author, pages, hasRead)
    myLibrary.push(book);
    addBookToDOM(book);
}

function escapeHTML(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function addBookToDOM(book) {
    const bookElement = document.createElement('div');
    bookElement.classList.add('book-details');

    bookElement.innerHTML = `
        <h3>${escapeHTML(book.title)}</h3>
        <p>by ${escapeHTML(book.author)}</p>
        <p>${book.pages} pages</p>
        <div>
            <input type="checkbox" id="has-read-${book.id}">
            <label for="has-read-${book.id}">read</label>
        </div>
        <div class="buttons">
            
            <button class="delete"><img src="trash-can.svg" alt=""></button>
        </div>
    `; // <button class="edit">Edit</button>

    const checkbox = bookElement.querySelector('input');
    checkbox.checked = book.hasRead;

    const editButton = bookElement.querySelector('.edit');
    // deletebutton.addEventListener("click", editBook)

    const deletebutton = bookElement.querySelector('.delete');
    deletebutton.addEventListener("click", deleteBook)

    bookElement.dataset.id = book.id

    bookContainer.appendChild(bookElement)
}

function deleteBook(event) {
    const bookElement = event.currentTarget.parentNode.parentNode;
    id = bookElement.dataset.id;

    myLibrary = myLibrary.filter(book => book.id != id);
    console.log("deleting: " + id)
    bookElement.remove();
}

// function editBook(event) {
//     const bookElement = event.currentTarget.parentNode.parentNode;
//     id = bookElement.dataset.id;

//     openBookModal(id)
// }

let myLibrary = [];

const dialog = document.querySelector('dialog') ;

const bookForm = document.querySelector('#book-form');

const bookContainer = document.querySelector('.books-container');

bookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const hasRead = document.querySelector("#has-read").value;

    addBookToLibrary(title, author, pages, hasRead);
    dialog.close();
})
