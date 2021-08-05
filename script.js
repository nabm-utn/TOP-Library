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
    bookDiv.addEventListener("click", displayBookInfo)
    return bookDiv;
}

function deleteBook(event) {
    index = event.target.dataset.deleteIndex;
    Library.splice(index, 1);
    updateBookshelf();
    displayBookInfo("none");
}

function toggleRead(event) {
    book = Library[event.target.dataset.readIndex];
    book.read = !book.read;
    let message = book.read ? "Unmark as Read": "Mark as Read";
    event.target.textContent = message;
    document.querySelector(".current-status p").textContent = book.readStatus();
}

function displayBookInfo(event) {
    index = (event === "none") ? "none": event.target.dataset.index;
    const book = Library[index];
    const title = document.querySelector(".current-title p");
    const author = document.querySelector(".current-author p");
    const pages = document.querySelector(".current-pages p");
    const read = document.querySelector(".current-status p");
    const deleteButton = document.querySelector(".delete-button");
    const readButton = document.querySelector(".read-button");

    if (index != "none") {
        title.textContent = book.title;
        author.textContent = book.author;
        pages.textContent = book.pages;
        read.textContent = book.readStatus();
        deleteButton.dataset.deleteIndex = index;
        readButton.dataset.readIndex = index;
    } else {
        title.textContent = "";
        author.textContent = "";
        pages.textContent = "";
        read.textContent = "";
        deleteButton.dataset.deleteIndex = -1;
        readButton.dataset.readIndex = -1;
    }

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

document.querySelector(".random-button").addEventListener("click", randomizeColor);
document.querySelector(".create-button").addEventListener("click", createNewBook);
document.querySelector(".delete-button").addEventListener("click", deleteBook);
document.querySelector(".read-button").addEventListener("click", toggleRead);
