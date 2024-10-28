const pool = require('./pool');

const executeQuery = async (query, params = []) => {
  const result = await pool.query(query, params);
  return result.rows;
};

//Book Queries:
async function getBooks() {
    const books = await executeQuery(`
        SELECT b.book_id, b.title, b.author, b.quantity, 
               b.category_id, c.category_name
        FROM book b
        LEFT JOIN category c ON b.category_id = c.category_id
    `);
    return books;
}

async function getBookById(id) {
    const book = await executeQuery('SELECT * FROM book WHERE id = $1', [id]);
    return book[0];
}

async function createBook(book) {
    const newBook = await executeQuery(
        'INSERT INTO book (title, author, category_id, quantity) VALUES ($1, $2, $3, $4) RETURNING *',
        [book.title, book.author, book.category_id, book.quantity]
    );
    return newBook[0];
}

async function updateBook(id, book) {
    const updatedBook = await executeQuery('UPDATE book SET title = $1, author = $2, category_id = $3, publisher_id = $4 WHERE id = $5 RETURNING *', [book.title, book.author, book.category_id, book.publisher_id, id]);
    return updatedBook[0];
}

async function deleteBook(id) {
    const result = await executeQuery('DELETE FROM book WHERE book_id = $1 RETURNING *', [id]);
    return result.length;
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
    const category = await executeQuery('SELECT * FROM category WHERE category_id = $1', [id]);
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

async function deleteCategory(categoryId) {
    // First check if category has any books
    const booksInCategory = await executeQuery(
        'SELECT COUNT(*) as count FROM book WHERE category_id = $1',
        [categoryId]
    );
    
    console.log('Books count:', booksInCategory[0].count); // Debug log
    console.log('Attempting to delete category:', categoryId); // Debug log
    
    if (booksInCategory[0].count > 0) {
        throw new Error('Cannot delete category that contains books');
    }
    
    try {
        // Double check if category exists
        const categoryExists = await executeQuery(
            'SELECT * FROM category WHERE category_id = $1',
            [categoryId]
        );
        console.log('Category exists:', categoryExists); // Debug log

        // If no books exist, proceed with deletion
        const result = await executeQuery(
            'DELETE FROM category WHERE category_id = $1 RETURNING *',
            [categoryId]
        );
        console.log('Delete result:', result); // Debug log
        return result;
    } catch (error) {
        console.log('Delete error:', error); // Debug log
        throw error;
    }
}   

async function getBooksInCategory(id) {
    const books = await executeQuery('SELECT * FROM book WHERE category_id = $1', [id]);
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
};
