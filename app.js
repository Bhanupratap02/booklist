//book constructure
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// ui const
function UI() {}

// Add book to list
UI.prototype.addBookToList = function (book) {
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
};
// clear fields
UI.prototype.clearField = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

// show Alert
UI.prototype.showAlert = function (msg, className) {
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
};
// UI delete 
UI.prototype.deleteBook = function(target) {
    if(target.className === "delete"){
      target.parentElement.parentElement.remove(); 
    }
}
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
    // clear fields
    ui.clearField();

    // show succces
    ui.showAlert("Book Added!", "success");
  }

  
});

document.getElementById("book-list").addEventListener("click" , function(e){
    e.preventDefault();

 //  instatntiate Ui
  const ui = new UI();
  ui.deleteBook(e.target);
  // show alert
  ui.showAlert("Book removed!" , " success");
});

 