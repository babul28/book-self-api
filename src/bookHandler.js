const { nanoid } = require('nanoid');
const books = require('./books');
const { generateResponse } = require('./helper');

const addBookHandler = (req, h) => {
  const {
    name = undefined,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  if (name === undefined) {
    return generateResponse(
      h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      }),
      400,
    );
  }

  if (readPage > pageCount) {
    return generateResponse(
      h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      }),
      400,
    );
  }

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === newBook.id);

  if (!isSuccess) {
    return generateResponse(
      h.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan',
      }),
      500,
    );
  }

  return generateResponse(
    h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: newBook.id,
      },
    }),
    201,
  );
};

const getAllBooksHandler = (req) => {
  const { name = undefined, reading = undefined, finished = undefined } = req.query;

  let newBook = [...books];

  if (name !== undefined) {
    newBook = newBook.filter((book) => book.name.search(new RegExp(name, 'i')) !== -1);
  }

  if (reading !== undefined) {
    newBook = newBook.filter((book) => book.reading === Boolean(reading));
  }

  if (finished !== undefined) {
    newBook = newBook.filter((book) => book.finished === Boolean(finished));
  }

  const formattedBook = newBook.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));

  return {
    status: 'success',
    data: {
      books: formattedBook,
    },
  };
};

const getBookById = (req, h) => {
  const { id } = req.params;

  const book = books.filter((item) => item.id === id)[0];

  if (book === undefined) {
    return generateResponse(
      h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
      }),
      404,
    );
  }

  return generateResponse(
    h.response({
      status: 'success',
      data: { book },
    }),
  );
};

const updateBookByIdHandler = (req, h) => {
  const { id } = req.params;

  const {
    name = undefined,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;

  const finished = pageCount === readPage;
  const updatedAt = new Date().toISOString();

  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex === -1) {
    return generateResponse(
      h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
      }),
      404,
    );
  }

  if (name === undefined) {
    return generateResponse(
      h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      }),
      400,
    );
  }

  if (readPage > pageCount) {
    return generateResponse(
      h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      }),
      400,
    );
  }

  books[bookIndex] = {
    ...books[bookIndex],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    updatedAt,
  };

  return generateResponse(
    h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    }),
  );
};

const deleteBookByIdHandler = (req, h) => {
  const { id } = req.params;

  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex === -1) {
    return generateResponse(
      h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
      }),
      404,
    );
  }

  books.splice(bookIndex, 1);

  return generateResponse(
    h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    }),
  );
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookById,
  updateBookByIdHandler,
  deleteBookByIdHandler,
};
