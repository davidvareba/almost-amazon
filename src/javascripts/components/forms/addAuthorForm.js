import clearDom from '../../helpers/data/clearDom';

const addAuthorForm = (obj = {}) => {
  clearDom();

  document.querySelector('#form-container').innerHTML = `
        <form id="submit-book-form" class="mb-4">
          <div class="form-group">
            <label for="title">Author First Name</label>
            <input type="text" class="form-control" id="first_name" aria-describedby="bookTitle" placeholder="Enter Author First Name" value="${obj.first_name || ''}" required>
          </div>
          <div class="form-group">
            <label for="image">Author Last Name</label>
            <input type="url" class="form-control" id="last_name" placeholder="Author Last Name" value="${obj.last_name || ''}" required>
          </div>
          <div class="form-group">
            <label for="price">Email</label>
            <input type="email" class="form-control" id="email" placeholder="Email" value="${obj.email || ''}" required>
          </div>
          <div class="form-check">
          <input type="checkbox" class="form-check-input" id="favorite" ${obj.favorite ? 'checked' : ''}>
          <label class="form-check-label" for="favorite">favorite?</label>
        </div>
          <button type="submit" id="${obj.firebaseKey ? `update-author--${obj.firebaseKey}` : 'submit-author'}" class="btn btn-primary">${obj.firebaseKey ? 'Update' : 'Submit Author'}</button>
        </form>`;
};

export default addAuthorForm;
