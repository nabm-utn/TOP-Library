function Book(title, author, pages, read=false){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read=read;

    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "already read": "not read yet"}`
    }
}

let hobbit = new Book("The Hobbit", "Tolkien", 296)
console.log(hobbit.info())

let Library = []



const bookshelf = document.querySelector(".bookshelf")

for (let i = 0; i < 5; i++) {
    let hobbitDisplay = document.createElement("div")
    hobbitDisplay.classList.add("bookspine")
    hobbitDisplay.textContent = hobbit.title
    hobbitDisplay.style.backgroundColor = "olive"
    bookshelf.appendChild(hobbitDisplay)
    }

