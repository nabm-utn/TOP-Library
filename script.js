let Library = [];
const bookshelf = document.querySelector(".bookshelf");

class Book {
    constructor(title, author, pages, color, read = false) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.color = color;
        this.read = read;

        this.info = function () {
            return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "already read" : "not read yet"}`;
        };
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
    Library.forEach(book => {bookshelf.appendChild(createBookDiv(book))});
}

function cleanBookshelf() {
    while (bookshelf.firstChild) {
        bookshelf.removeChild(bookshelf.lastChild);
    }
}

function createBookDiv(book) {
    let bookDiv = document.createElement("div");
    bookDiv.classList.add("bookspine");
    bookDiv.textContent = book.title;
    bookDiv.style.backgroundColor = book.color;
    bookDiv.addEventListener("click", e => {
        console.log(e.target.info());
    })
    return bookDiv;
}

document.querySelector(".create-button").addEventListener("click", createNewBook);

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