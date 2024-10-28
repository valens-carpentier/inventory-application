const express = require('express');
const router = express.Router();
const { BookController, CategoryController, PublisherController } = require('../controllers/userController');

router.get('/', (req, res) => {
    res.render('index');
});

// Books routes
router.get('/books', BookController.getAllBooks);
router.post('/books', BookController.createBook);
router.delete('/books/:id', BookController.deleteBook);
router.put('/books/:id', BookController.updateBook);

// Make sure this route is defined before any catch-all routes
router.get('/books/:id', BookController.getBookById);

// Category routes
router.get('/categories', CategoryController.getAllCategories);
router.get('/categories/:id', CategoryController.getCategoryById);
router.get('/categories/:id/books', CategoryController.getBooksInCategory);  
router.post('/categories', CategoryController.createCategory);
router.put('/categories/:id', CategoryController.updateCategory);
router.delete('/categories/:id', CategoryController.deleteCategory);

module.exports = router;
