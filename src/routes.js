const {
  addBookHandler,
  getAllBooksHandler,
  getBookById,
  updateBookByIdHandler,
  deleteBookByIdHandler,
} = require('./bookHandler');

const {
  validateBookRequest,
  validateQueryGetAllBookRequest,
} = require('./validateRequest');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
    options: {
      validate: {
        payload: validateBookRequest,
      },
    },
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
    options: {
      validate: {
        query: validateQueryGetAllBookRequest,
      },
    },
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookById,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: updateBookByIdHandler,
    options: {
      validate: {
        payload: validateBookRequest,
      },
    },
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBookByIdHandler,
  },
];

module.exports = routes;
