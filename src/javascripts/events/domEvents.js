import addBookForm from '../components/forms/addBookForm';
import {
  createBook, deleteBook, updateBook, getSingleBook
} from '../helpers/data/bookData';
import { showBooks } from '../components/books';
import addAuthorForm from '../components/forms/addAuthorForm';
import {
  createAuthor, deleteAuthor, updateAuthor, getOneAuthor, favAuthor
} from '../helpers/data/authorData';
import { showAuthors } from '../components/authors';
import viewBook from '../components/viewBook';

const domEvents = () => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    // CLICK EVENT FOR DELETING A BOOK
    if (e.target.id.includes('delete-book')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        const getKey = e.target.id.split('--');
        const [, b] = getKey;
        deleteBook(b).then((booksArray) => showBooks(booksArray));
      }
    }
    // CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK
    if (e.target.id.includes('add-book-btn')) {
      addBookForm();
    }

    // CLICK EVENT FOR SUBMITTING FORM FOR ADDING A BOOK
    if (e.target.id.includes('submit-book')) {
      e.preventDefault();
      const bookObj = {
        title: document.querySelector('#title').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        description: document.querySelector('#description').value,
        sale: document.querySelector('#sale').checked,
        author_id: document.querySelector('#select-author').value
      };
      console.warn(bookObj);
      createBook(bookObj).then((booksArray) => showBooks(booksArray));
    }

    // CLICK EVENT EDITING/UPDATING A BOOK
    if (e.target.id.includes('edit-book-btn')) {
      const [, id] = e.target.id.split('--');

      getSingleBook(id).then((bookObj) => addBookForm(bookObj));
    }
    // CLICK EVENT FOR EDITING A BOOK
    if (e.target.id.includes('update-book')) {
      e.preventDefault();
      const getKey = e.target.id.split('--');
      const [, firebaseKey] = getKey;
      const bookObj = {
        title: document.querySelector('#title').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        sale: document.querySelector('#sale').checked,
        author_id: document.querySelector('#select-author').value,
        firebaseKey
      };
      updateBook(bookObj).then(showBooks);
    }

    if (e.target.id.includes('view-book-btn')) {
      const [, firebaseKey] = e.target.id.split('--');

      getSingleBook(firebaseKey).then(viewBook);
    }

    // ADD CLICK EVENT FOR DELETING AN AUTHOR
    if (e.target.id.includes('delete-author')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        const getKey = e.target.id.split('--');
        const [, b] = getKey;
        deleteAuthor(b).then((authorArray) => showAuthors(authorArray));
      }
    }
    // ADD CLICK EVENT FOR SHOWING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('add-author-btn')) {
      addAuthorForm();
    }
    // ADD CLICK EVENT FOR SUBMITTING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('submit-author')) {
      e.preventDefault();
      const authorObj = {
        first_name: document.querySelector('#first_name').value,
        last_name: document.querySelector('#last_name').value,
        email: document.querySelector('#email').value,
        favorite: document.querySelector('#favorite').checked,
      };
      createAuthor(authorObj).then((authorsArray) => showAuthors(authorsArray));
    }

    // ADD CLICK EVENT FOR EDITING AN AUTHOR
    if (e.target.id.includes('edit-author')) {
      const [, id] = e.target.id.split('--');
      getOneAuthor(id).then((authorObj) => addAuthorForm(authorObj));
    }

    // TOGGLE FAVORITE AUTHOR
    if (e.target.id.includes('fav-author')) {
      e.preventDefault();
      const getKey = e.target.id.split('--');
      const [, firebaseKey] = getKey;
      let authorObj = {};
      getOneAuthor(firebaseKey).then((auth) => {
        // console.log(auth.favorite);
        if (auth.favorite === true) {
          authorObj = {
            favorite: false,
            firebaseKey
          };
        } if (auth.favorite === false) {
          authorObj = {
            favorite: true,
            firebaseKey
          };
        }
        favAuthor(authorObj).then(showAuthors);
      });
    }

    // EDITING AN AUTHOR
    if (e.target.id.includes('update-author')) {
      e.preventDefault();
      const getKey = e.target.id.split('--');
      const [, firebaseKey] = getKey;
      const authorObj = {
        first_name: document.querySelector('#first_name').value,
        last_name: document.querySelector('#last_name').value,
        email: document.querySelector('#email').value,
        favorite: document.querySelector('#favorite').checked,
        firebaseKey,
      };
      updateAuthor(authorObj).then(showAuthors);
    }
  });
};

export default domEvents;
