const { Client } = require('pg');

const SQL = `
     -- Insert dummy data into Category
  INSERT INTO Category (category_name) VALUES
    ('Fiction'),
    ('Non-fiction'),
    ('Science'),
    ('History'),
    ('Fantasy');

  -- Insert dummy data into Book
  INSERT INTO Book (title, author, category_id, quantity) VALUES
    ('The Great Gatsby', 'F. Scott Fitzgerald', 1, 3),
    ('A Brief History of Time', 'Stephen Hawking', 3, 5),
    ('The Hobbit', 'J.R.R. Tolkien', 5, 2),
    ('Sapiens: A Brief History of Humankind', 'Yuval Noah Harari', 4, 4),
    ('1984', 'George Orwell', 1, 6);
`;

async function main() {
    console.log("seeding...");
    const client = new Client({
      connectionString: "postgresql://valenscarpentier:a2s8zzqr@localhost:5432/book_inventory",
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
  }
  
  main();
