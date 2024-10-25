const db = require('../db/queries');
const pool = require("../db/pool");

//BookController:
const BookController = {
  getAllBooks: async (req, res) => {
    try {
      const books = await db.getBooks();
      res.json(books);
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
    const { title, author, category_id, publisher_id } = req.body;
    try {
      const newBook = await db.createBook({ title, author, category_id, publisher_id });
      res.status(201).json(newBook);
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
      res.json(categories);
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
      if (result > 0) {
        res.json({ message: 'Category deleted successfully' });
      } else {
        res.status(404).json({ error: 'Category not found' });
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getBooksInCategory: async (req, res) => {
    const { id } = req.params;
    try {
      const books = await db.getBooksInCategory(id);
      res.json(books);
    } catch (error) {
      console.error('Error getting books in category:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

// PublisherController:
const PublisherController = {
  getAllPublishers: async (req, res) => {
    try {
      const publishers = await db.getPublishers();
      res.json(publishers);
    } catch (error) {
      console.error('Error getting all publishers:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getPublisherById: async (req, res) => {
    const { id } = req.params;
    try {
      const publisher = await db.getPublisherById(id);
      if (publisher) {
        res.json(publisher);
      } else {
        res.status(404).json({ error: 'Publisher not found' });
      }
    } catch (error) {
      console.error('Error getting publisher by id:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  createPublisher: async (req, res) => {
    const { publisher_name, address, contact_info } = req.body;
    try {
      const newPublisher = await db.createPublisher({ publisher_name, address, contact_info });
      res.status(201).json(newPublisher);
    } catch (error) {
      console.error('Error creating publisher:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  updatePublisher: async (req, res) => {
    const { id } = req.params;
    const { publisher_name, address, contact_info } = req.body;
    try {
      const updatedPublisher = await db.updatePublisher(id, { publisher_name, address, contact_info });
      if (updatedPublisher) {
        res.json(updatedPublisher);
      } else {
        res.status(404).json({ error: 'Publisher not found' });
      }
    } catch (error) {
      console.error('Error updating publisher:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  deletePublisher: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await db.deletePublisher(id);
      if (result > 0) {
        res.json({ message: 'Publisher deleted successfully' });
      } else {
        res.status(404).json({ error: 'Publisher not found' });
      }
    } catch (error) {
      console.error('Error deleting publisher:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getBooksByPublisher: async (req, res) => {
    const { id } = req.params;
    try {
      const books = await db.getBooksByPublisher(id);
      res.json(books);
    } catch (error) {
      console.error('Error getting books by publisher:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

const handleError = (res, error, operation) => {
  console.error(`Error ${operation}:`, error);
  res.status(500).json({ error: 'Internal server error' });
};

const handleNotFound = (res, item) => {
  res.status(404).json({ error: `${item} not found` });
};

const createControllerMethod = (operation, dbMethod) => async (req, res) => {
  try {
    const result = await dbMethod(req.params.id, req.body);
    if (result) {
      res.json(result);
    } else {
      handleNotFound(res, operation.split(' ')[1]);
    }
  } catch (error) {
    handleError(res, error, operation);
  }
};

module.exports = { BookController, CategoryController, PublisherController };
