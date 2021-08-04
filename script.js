let Library = [];
const bookshelf = document.querySelector(".bookshelf");

class Book {
    constructor(title, author, pages, color, read = false) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.color = color;
        this.read = read;

        this.readStatus = () => this.read ? "already read" : "not read yet";
        this.info = () => `${this.title} by ${this.author}, ${this.pages} pages, ${this.readStatus()}`;
    }
}

function createNewBook() {
    const title = document.getElementById("new-title").value;
    const author = document.getElementById("new-author").value;
    const pages = document.getElementById("new-pages").value;
    const color = document.getElementById("new-color").value;
    const book = new Book(title, author, pages, color);
    Library.push(book);
    updateBookshelf();
}

function updateBookshelf() {
    cleanBookshelf();
    console.table(Library);
    Library.forEach((book, index) => {bookshelf.appendChild(createBookDiv(book, index))});
}

function cleanBookshelf() {
    while (bookshelf.firstChild) {
        bookshelf.removeChild(bookshelf.lastChild);
    }
}

function createBookDiv(book, index) {
    let bookDiv = document.createElement("div");
    bookDiv.dataset.index = index;
    bookDiv.classList.add("bookspine");
    bookDiv.textContent = book.title;
    bookDiv.style.backgroundColor = book.color;
    bookDiv.addEventListener("click", e => {displayBookInfo(e.target.dataset.index);})
    return bookDiv;
}

document.querySelector(".create-button").addEventListener("click", createNewBook);

function displayBookInfo(index) {
    const book = Library[index];
    const title = document.querySelector(".current-title p");
    const author = document.querySelector(".current-author p");
    const pages = document.querySelector(".current-pages p");
    const read = document.querySelector(".current-status p");

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages;
    read.textContent = book.readStatus();
}

function randomHEX() {
    const red = Math.floor(Math.random() * 256).toString(16);
    const green = Math.floor(Math.random() * 256).toString(16);
    const blue = Math.floor(Math.random() * 256).toString(16);
    return `#${red}${green}${blue}`;
}

function randomizeColor() {
    const color = document.getElementById("new-color");
    color.value = randomHEX();
}

document.querySelector(".random-button").addEventListener("click", randomizeColor)