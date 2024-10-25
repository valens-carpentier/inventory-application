const express = require('express');
const router = express.Router();
const { BookController, CategoryController, PublisherController } = require('../controllers/userController');

router.get('/', (req, res) => {
    res.render('index');
});

// Book routes
router.get('/books', BookController.getAllBooks);
router.get('/books/:id', BookController.getBookById);
router.post('/books', BookController.createBook);
router.put('/books/:id', BookController.updateBook);
router.delete('/books/:id', BookController.deleteBook);

// Category routes
router.get('/categories', CategoryController.getAllCategories);
router.get('/categories/:id', CategoryController.getCategoryById);
router.post('/categories', CategoryController.createCategory);
router.put('/categories/:id', CategoryController.updateCategory);
router.delete('/categories/:id', CategoryController.deleteCategory);

// Publisher routes (if needed)
router.get('/publishers', PublisherController.getAllPublishers);
router.get('/publishers/:id', PublisherController.getPublisherById);
router.post('/publishers', PublisherController.createPublisher);
router.put('/publishers/:id', PublisherController.updatePublisher);
router.delete('/publishers/:id', PublisherController.deletePublisher);

module.exports = router;
