import { getOneAuthor } from './authorData';
import { getSingleBook } from './bookData';

const viewBookDetails = (bookFirebasekey) => new Promise((resolve, reject) => {
  getSingleBook(bookFirebasekey)
    .then((bookObject) => {
      getOneAuthor(bookObject.author_id)
        .then((authorObject) => {
          resolve({ authorObject, ...bookObject });
        });
    }).catch(reject);
});

export default viewBookDetails;
