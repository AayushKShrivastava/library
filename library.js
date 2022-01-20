let myLibrary = [
    {title: "The Catcher in the Rye", author: "J. D. Salinge", pages: '234', read: false},
    {title: 'To Kill a Mockingbird', author: 'Harper Lee', pages: '281', read: true},
    {title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', pages: '500', read: true}
]

const books = document.querySelector('.books');
let remove = document.querySelectorAll('.remove'); 

for(i = 0; i < myLibrary.length; i++)
    createCard(i);

const addNewBook = document.querySelector('.newBook');
addNewBook.addEventListener('click', ()=>{
    newBookForm.classList.add('active');
    overlay.classList.add('active');
})

const newBookForm = document.querySelector('.form');
const overlay = document.getElementById("overlay");
const newBookTitle = document.querySelector('.newTitle');
const newBookAuthor = document.querySelector('.newAuthor');
const newBookPages = document.querySelector('.newPages');
const readStatus = document.querySelector('.readStatus');

const add = document.querySelector('.add');
add.addEventListener('click', () =>{
    if(newBookTitle.value != '' && newBookAuthor.value != '' && newBookPages.value != ""){
        const newBook = new Book(newBookTitle.value, newBookAuthor.value, newBookPages.value, readStatus.checked);
        myLibrary.push(newBook);
        createCard(myLibrary.length - 1);
    }
    newBookTitle.value = newBookAuthor.value = newBookPages.value = '';
    readStatus.checked = false;
    newBookForm.classList.remove('active');
    overlay.classList.remove('active');
})

const cancel = document.querySelector('.cancel');
cancel.addEventListener('click', () => {
    newBookTitle.value = newBookAuthor.value = newBookPages.value = '';
    readStatus.checked = false;
    newBookForm.classList.remove('active');
    overlay.classList.remove('active');
})

//functions

function createCard(lastIndex){
    const book = document.createElement('div');
    book.id = lastIndex;
    book.classList.add('book');
    books.appendChild(book);

    const bookInfo = document.createElement('div');
    bookInfo.classList.add('bookInfo');
    book.appendChild(bookInfo);

    const title = document.createElement('h3');
    title.textContent = myLibrary[lastIndex].title;
    bookInfo.appendChild(title);

    const author = document.createElement('h4');
    author.textContent = `by ${myLibrary[lastIndex].author}`;
    bookInfo.appendChild(author);

    const pages = document.createElement('h5');
    pages.textContent = `${myLibrary[lastIndex].pages} Pages`;
    bookInfo.appendChild(pages);

    const action = document.createElement('div');
    action.classList.add('action');
    book.appendChild(action);

    const read = document.createElement('div');
    read.classList.add('read');
    action.appendChild(read);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = (myLibrary[lastIndex].read == true)? true:false;
    read.appendChild(checkbox);

    const readLabel = document.createElement('label');
    readLabel.textContent = 'Read';
    read.appendChild(readLabel);

    const removeB = document.createElement('button');
    removeB.classList.add('remove');
    removeB.textContent = 'Remove';
    removeB.value = lastIndex;
    action.appendChild(removeB);
    remove = document.querySelectorAll('.remove'); 
    removeBook();
}

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
        return `${title} by ${author}, ${pages} pages, ${read} read yet`;
    }
}

function removeBook(){
    remove.forEach((button)=>{
        button.addEventListener('click', ()=>{
            const book = document.getElementById(button.value);
            myLibrary.splice(button.value, 1);
            books.removeChild(book);
            remove = document.querySelectorAll('.remove'); 
            console.log(myLibrary);
        })
    })
}
