class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
class UI {
  addBookToList(book) {
    const list = document.getElementById("book-list");
    // create a table row
    const row = document.createElement("tr");
    row.innerHTML = `
       <td>${book.title}</td>
       <td>${book.author}</td>
       <td>${book.isbn}</td>
       <td><a href="#" class="delete">X</a></td>
       
       `;
    list.appendChild(row);

  }
  clearField() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
  showAlert(msg, className) {
    // create a div
    const div = document.createElement("div");
    // add class name
    div.className = ` alert ${className}`;
    // append the text node

    div.appendChild(document.createTextNode(msg));
    // get parent
    const container = document.querySelector(".container");
    // get form
    const form = document.querySelector("#book-form");
    // insert alert
    container.insertBefore(div, form);
    // set time out
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }
  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
      
    }
  }
}
// local store
class Store {
  static getBook() {
    // let books = [];
    // if (localStorage.getItem("books") === null) {
    //   return books;
    // } else {
    //   books = JSON.parse(localStorage.getItem("books"));
    //   return books;
    // }
    let books;
     if(localStorage.getItem("books") === null){
     books = [];
     }
     else{
         books = JSON.parse(localStorage.getItem("books"));
     }
      return books;
  }
  static displayBook() {
    const books = Store.getBook();
    books.forEach(function(book){
        const ui = new UI;
        // add book to list
        ui.addBookToList(book);
    });
        
    
  }
  static addBook(book) {
      const books = Store.getBook();
      books.push(book);
      localStorage.setItem("books" , JSON.stringify(books));
  }
  static removeBook(isbn) {
      
    const books = Store.getBook();
    books.forEach(function(book , index){
      if(book.isbn === isbn){
          books.splice(index , 1)
      }
    });
    localStorage.setItem("books" , JSON.stringify(books));
  }
}
// dom content loaded
document.addEventListener("DOMContentLoaded" , Store.displayBook)
// event listener
document.getElementById("book-form").addEventListener("submit", function (e) {
  e.preventDefault();
  // get form value
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;
  // instatntiate a book
  const book = new Book(title, author, isbn);
  //  instatntiate Ui
  const ui = new UI();
  // validate
  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please Fill In All Fields", "error");
  } else {
    // add book to list
    ui.addBookToList(book);
    // store in ls
    Store.addBook(book);
    // clear fields
    ui.clearField();

    // show succces
    ui.showAlert("Book Added!", "success");
  }
});

document.getElementById("book-list").addEventListener("click", function (e) {
  e.preventDefault();

  //  instatntiate Ui
  const ui = new UI();
  // delete book
  ui.deleteBook(e.target);
   // delete book from ls
   Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  // show alert
  ui.showAlert("Book removed!", " success");
});
