const pool = require('./pool');

const executeQuery = async (query, params = []) => {
  const result = await pool.query(query, params);
  return result.rows;
};

//Book Queries:
async function getBooks() {
    const books = await executeQuery('SELECT * FROM book');
    return books;
}

async function getBookById(id) {
    const book = await executeQuery('SELECT * FROM book WHERE id = $1', [id]);
    return book[0];
}

async function createBook(book) {
    const newBook = await executeQuery('INSERT INTO book (title, author, category_id, publisher_id) VALUES ($1, $2, $3, $4) RETURNING *', [book.title, book.author, book.category_id, book.publisher_id]);
    return newBook[0];
}

async function updateBook(id, book) {
    const updatedBook = await executeQuery('UPDATE book SET title = $1, author = $2, category_id = $3, publisher_id = $4 WHERE id = $5 RETURNING *', [book.title, book.author, book.category_id, book.publisher_id, id]);
    return updatedBook[0];
}

async function deleteBook(id) {
    const deletedBook = await executeQuery('DELETE FROM book WHERE id = $1', [id]);
    return deletedBook.length;
}

async function searchBooks(criteria) {  
    const books = await executeQuery('SELECT * FROM book WHERE title ILIKE $1 OR author ILIKE $1', [`%${criteria}%`, `%${criteria}%`]);
    return books;
}


//Category Queries:
async function getCategories() {
    const categories = await executeQuery('SELECT * FROM category');
    return categories;
}

async function getCategoryById(id) {
    const category = await executeQuery('SELECT * FROM category WHERE id = $1', [id]);
    return category[0];
}

async function createCategory(category) {
    const newCategory = await executeQuery('INSERT INTO category (category_name) VALUES ($1) RETURNING *', [category.category_name]);
    return newCategory[0];
}

async function updateCategory(id, category) {
    const updatedCategory = await executeQuery('UPDATE category SET category_name = $1 WHERE id = $2 RETURNING *', [category.category_name, id]);
    return updatedCategory[0];
}

async function deleteCategory(id) {
    const deletedCategory = await executeQuery('DELETE FROM category WHERE id = $1', [id]);
    return deletedCategory.length;
}   

async function getBooksInCategory(id) {
    const books = await executeQuery('SELECT * FROM book WHERE category_id = $1', [id]);
    return books;
}

//Publisher Queries:
async function getPublishers() {
    const publishers = await executeQuery('SELECT * FROM publisher');
    return publishers;
}  

async function getPublisherById(id) {
    const publisher = await executeQuery('SELECT * FROM publisher WHERE id = $1', [id]);
    return publisher[0];
}

async function createPublisher(publisher) {
    const newPublisher = await executeQuery('INSERT INTO publisher (publisher_name, address, contact_info) VALUES ($1, $2, $3) RETURNING *', [publisher.publisher_name, publisher.address, publisher.contact_info]);
    return newPublisher[0];
}

async function updatePublisher(id, publisher) {
    const updatedPublisher = await executeQuery('UPDATE publisher SET publisher_name = $1, address = $2, contact_info = $3 WHERE id = $4 RETURNING *', [publisher.publisher_name, publisher.address, publisher.contact_info, id]);
    return updatedPublisher[0];
}

async function deletePublisher(id) {
    const deletedPublisher = await executeQuery('DELETE FROM publisher WHERE id = $1', [id]);
    return deletedPublisher.length;
}

async function getBooksByPublisher(id) {
    const books = await executeQuery('SELECT * FROM book WHERE publisher_id = $1', [id]);
    return books;
}


module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  searchBooks,
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getBooksInCategory,
  getPublishers,
  getPublisherById,
  createPublisher,
  updatePublisher,
  deletePublisher,
  getBooksByPublisher
};
