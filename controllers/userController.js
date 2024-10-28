const db = require('../db/queries');
const pool = require("../db/pool");

//BookController:
const BookController = {
  getAllBooks: async (req, res) => {
    try {
      const [books, categories] = await Promise.all([
        db.getBooks(),
        db.getCategories()
      ]);
      res.render('books', { books, categories });
    } catch (error) {
      console.error('Error getting all books:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getBookById: async (req, res) => {
    const { id } = req.params;
    try {
      const book = await db.getBookById(id);
      if (book) {
        res.json(book);
      } else {
        res.status(404).json({ error: 'Book not found' });
      }
    } catch (error) {
      console.error('Error getting book by id:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  createBook: async (req, res) => {
    try {
        const newBook = await db.createBook({ 
            title: req.body.title, 
            author: req.body.author, 
            category_id: Number(req.body.category_id), 
            quantity: Number(req.body.quantity) || 0  // Default to 0 if not provided
        });
        res.redirect('/books');
    } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
  },

  updateBook: async (req, res) => {
    const { id } = req.params;
    const { title, author, category_id, publisher_id } = req.body;
    try {
      const updatedBook = await db.updateBook(id, { title, author, category_id, publisher_id });
      if (updatedBook) {
        res.json(updatedBook);
      } else {
        res.status(404).json({ error: 'Book not found' });
      }
    } catch (error) {
      console.error('Error updating book:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  deleteBook: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await db.deleteBook(id);
      if (result > 0) {
        res.json({ message: 'Book deleted successfully' });
      } else {
        res.status(404).json({ error: 'Book not found' });
      }
    } catch (error) {
      console.error('Error deleting book:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  searchBooks: async (req, res) => {
    const { criteria } = req.query;
    try {
      const books = await db.searchBooks(criteria);
      res.json(books);
    } catch (error) {
      console.error('Error searching books:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

// CategoryController:
const CategoryController = {
  getAllCategories: async (req, res) => {
    try {
      const categories = await db.getCategories();
      res.render('categories', { categories });
    } catch (error) {
      console.error('Error getting all categories:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getCategoryById: async (req, res) => {
    const { id } = req.params;
    try {
      const category = await db.getCategoryById(id);
      if (category) {
        res.json(category);
      } else {
        res.status(404).json({ error: 'Category not found' });
      }
    } catch (error) {
      console.error('Error getting category by id:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  createCategory: async (req, res) => {
    const { category_name } = req.body;
    try {
      const newCategory = await db.createCategory({ category_name });
      res.status(201).json(newCategory);
    } catch (error) {
      console.error('Error creating category:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  updateCategory: async (req, res) => {
    const { id } = req.params;
    const { category_name } = req.body;
    try {
      const updatedCategory = await db.updateCategory(id, { category_name });
      if (updatedCategory) {
        res.json(updatedCategory);
      } else {
        res.status(404).json({ error: 'Category not found' });
      }
    } catch (error) {
      console.error('Error updating category:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  deleteCategory: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await db.deleteCategory(id);
      if (result && result.length > 0) {
        req.flash('success', 'Category deleted successfully');
        res.redirect('/categories');
      } else {
        req.flash('error', 'Category not found');
        res.redirect('/categories');
      }
    } catch (error) {
      if (error.message === 'Cannot delete category that contains books') {
        res.status(400).json({ error: error.message });
      } else {
        console.error('Error deleting category:', error);
        req.flash('error', 'An error occurred while deleting the category');
        res.redirect('/categories');
      }
    }
  },

  getBooksInCategory: async (req, res) => {
    const { id } = req.params;
    try {
      const [books, category] = await Promise.all([
        db.getBooksInCategory(id),
        db.getCategoryById(id)
      ]);
      res.render('category-books', { books, category });
    } catch (error) {
      console.error('Error getting books in category:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};



module.exports = { BookController, CategoryController };
