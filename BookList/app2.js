// create Book class
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}


// Create UI class
class UI extends Book {
    // constructor (title, author, isbn) {
    //     super(title, author, isbn)     
    // }

    // addBookList
    addBookList(book) {
        const bookList = document.querySelector('#book-list');

        const row = document.createElement('tr')
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>
        `

        bookList.appendChild(row)
    }

    // ClearFields
    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

    showAlert(errorMessage, className) {
        const div = document.createElement('div')
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(errorMessage));

        // get Parent Elements
        const container = document.querySelector('.container')
        const form = document.querySelector('#book-form');

        container.insertBefore(div, form);

        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000)
    }

    deleteBookList(target) {
        if(target.className = 'delete') {
            target.parentElement.parentElement.remove();
        }
    }
}


// Create Event Listeners
document.getElementById('book-form').addEventListener('submit', addBook);
document.getElementById('book-list').addEventListener('click', deleteBook);

// addBook function 
function addBook(e) {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    // create new Book
    const book = new Book(title, author, isbn);

    //Instantiate UI 
    const ui = new UI();

    // ShowError 
    if(title === '' || author === '' || isbn === '') {
        ui.showAlert('Please fill all fields', 'error')
    } else {
        //add book to list
        ui.addBookList(book);

        // show Alert
        ui.showAlert('Book Added!', 'success')

        // clearFields
        ui.clearFields();
    }

    //Prevent default form submission
    e.preventDefault();
}

//DeleteBook function 
function deleteBook(e) {
    const ui = new UI();
    
    //delete Book
    ui.deleteBookList(e.target);

    // Show alert
    ui.showAlert('Book Deleted!', 'success')

    e.preventDefault();
}

