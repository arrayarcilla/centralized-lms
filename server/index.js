const express = require('express');
const mysql = require("mysql");
const session = require("express-session");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors = require('cors'); // Import cors package

const app = express();
const port = 3000

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:3001'
}))

app.use(session({
    secret: 'ssshhhhh', //random string i guess
    resave: true,
    saveUninitialized: false //https://github.com/expressjs/session#options <-- useful site
}));

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "centralized_library_clone" // use "centralized_library_clone" for testing, make sure u have the same database name applied in ur mySQL"
})

app.post('/', (req, res) => {
    const sesh = req.session;
    
    connection.query('SELECT * FROM user WHERE name="' + req.body.username + '"', (err, result) => {
        if (result.length != 0 && bcrypt.compareSync(req.body.password, result[0]['password'])) {
            sesh.id = result[0].id;
            sesh.user = result[0].username;
            sesh.usertype = result[0].userType; // Accessing userType property

            if (result[0].userType === "admin") {
                res.json({ id: result[0].id, usertype: "admin" });
            } else {
                res.json({ id: result[0].id, usertype: "member" });
            }
        } else {
            res.send({ })
            throw err
        }
    })
})

app.post('/create_user', (req, res) => {
    const { username, password } = req.body;
    const usertype = 'member';
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    connection.query(
        `INSERT INTO user (name, password, userType) VALUES (?, ?, ?)`,
        [username, hash, usertype],
        (err, result) => {
            if (err) {
                console.error('Error inserting user:', err);
                return res.status(500).json({ error: 'Error inserting user' });
            }

            return res.status(201).json({ success: true });
        }
    );
});


//--------------------------------------ITEMS-----------------------------------------

app.delete('/deleteItem', (req, res) => {
    connection.query(
        `UPDATE item
        SET is_deleted = 1
        WHERE id = ` + req.body.id + `;`, (err, result) => {
        if (err) {
            console.error('Error deleting item: ', err);
            return res.status(404).json({ message: 'Internal server error' });
        }
        res.status(200).json({ message: 'Item deleted successfully' });
    });
});


app.post("/addItem", (req, res) => {
    const { author, title, isbn, category, publisher, year, copies} = req.body;
    const result = connection.query(
      `INSERT INTO item (author, title, isbn, category, publisher, year, available, copies) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [author, title, isbn, category, publisher, year, copies, copies],
      (error, results) => {
          if (error) {
              console.error('Error inserting item:', error);
                return res.status(500).send("Error adding item"); 
          }

          return res.status(201).send('Item added successfully');
      }
    );
  });

  app.patch('/updateItem', async (req, res) => {
    const item = req.body;
    try {
      const sql = `UPDATE item
                   SET author = ?,
                       title = ?,
                       isbn = ?,
                       category = ?,
                       publisher = ?,
                       year = ?,
                       available = available + ?,
                       copies = ?
                   WHERE id = ?`;
      const values = [item.author, item.title, item.isbn, item.category, item.publisher, item.year, item.addedCopies, item.copies, item.id];
  
      await connection.query(sql, values, (err, result) => {
        if (err) throw err;
        res.status(200).send('Item updated successfully'); // Updated status code to 200 for update
      });
    } catch (error) {
      console.error('Error updating item: ', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// app.get('/getAvail', (req, res) => {
//     connection.query('SELECT * FROM item WHERE status="1"', (err, result) => {
//         res.send(result);
//     });
// });

// Route to get items with pagination
app.get('/items', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const offset = (page - 1) * limit;
    
        if (isNaN(page) || page < 1) {
            throw new Error('Invalid page number');
        }

        const query = `SELECT * FROM item LIMIT ${limit} OFFSET ${offset}`;
    
        const results = await new Promise((resolve, reject) => {
            connection.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });

        res.status(200).json(results);
    } catch (error) {
        if (error.message === 'Invalid page number') {
            res.status(400).json({ error: 'Invalid page number' });
        } else {
            console.error('Error retrieving items:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});


  // Search book function
app.get('/search', (req, res) => {
    try {
        const searchQuery = req.query.search;
        const category = req.query.category
        const page = parseInt(req.query.page) || 1;
        const itemsPerPage = 10;
        const offset = (page - 1) * itemsPerPage;

        if (isNaN(page) || page < 1) {
            throw new Error('Invalid page number');
        }

        const sqlQuery = `
        SELECT *
        FROM item
        WHERE title LIKE '%${searchQuery}%' OR author LIKE '%${searchQuery}%' OR publisher LIKE '%${searchQuery}%'
        AND category = '%${category}%' OR category is NULL
        LIMIT ${itemsPerPage} OFFSET ${offset}
        `;
        connection.query(sqlQuery, (err, results) => {
            if (err) {
                console.error('Error executing MySQL query:', err);
            if (err.code) { // Check for specific error codes (e.g., database errors)
                res.status(500).json({ error: 'Database error' });
            } else {
                res.status(400).json({ error: 'Invalid search query or category' }); // Adjust status code as needed
            }
            return;
            }
        res.json(results);
        });
    } catch (error) {
        console.error('Error retrieving items: ', error)
        res.status(500).json({ error: 'Internal server error' });
    }
});
  
// Shows all users who returned and borrowed the book
app.get('/getItemBorrowHistory', (req, res) => {
    try {
        const bookId = parseInt(req.query.book_id)
        const page = parseInt(req.query.page)
        const itemsPerPage = 10
        const offset = (page - 1) * itemsPerPage
        if (isNaN(page) || page < 1) { return res.status(400).json({ error: 'Invalid page number' }) }

        const sqlQuery=`
            SELECT t.id AS transaction_id, t.return_date, u.id, u.name
            FROM transaction t
            INNER JOIN user u ON t.user_id = u.id
            WHERE t.item_id = ${bookId} AND t.return_date IS NOT NULL
            ORDER BY t.id DESC
            LIMIT ${itemsPerPage} OFFSET ${offset}
        `

        connection.query(sqlQuery, [bookId], (err, results) => {
            if (err) {
              console.error('Error executing MySQL query: ' + err.stack);
              res.status(500).json({ error: 'Internal server error' });
              return;
            }
      
            // Check for empty results
            if (results.length === 0) {
              res.status(404).json({ error: 'Book not found' }); // Use 404 for non-existent book
            } else {
              res.json(results);
            }
        });
    } catch (error) {
        console.error('Error retrieving items: ', error)
        res.status(500).json(error)
    }
})


  

app.post('/getItem', (req, res) => {
    connection.query(`SELECT * FROM item WHERE id="`+ req.body.id+`"`, (err, result) => {
        res.send(result);
    });
});

//------------------------------------------------MEMBER----------------------------------------------------

app.post('/borrowBook', (req, res) => {
    const userId = req.body.userId
    const bookId  = req.body.bookId

    // Check book availability
    connection.query(
        'SELECT available FROM item WHERE id = ?', [bookId], (err, results) => {
            if (err) {
                console.error(err)
                return res.status(500).json({ error: 'An error has occured' })
            }

            if (results.length === 0) { return res.status(404).json({error: 'Book not found'}) }

            const { available } = results[0]

            if (available <= 0) { return res.status(404).json({ error: 'Book is not currently available' }) }

            // Create transaction record
            const issueDate = new Date()
            const dueDate = new Date(issueDate.getTime() + 7 * 24 * 60 * 60 * 1000); // Add 7 days

            connection.query(
                'INSERT INTO transaction (user_id, item_id, due_date) VALUES (?, ?, ?)', [userId, bookId, dueDate],
                (err, result) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send({ error: 'An error occured' })
                    }

                    // Decrement available copies
                    connection.query(
                        'UPDATE item SET available = available - 1 WHERE id = ?', [bookId],
                        (err, updateResult) => {
                            if (err) {
                                console.error(err);
                                // Consider handling potential rollbacl or further error handling here
                            }
                        }
                    )

                    res.json({ message: 'Book borrowed successfully!' })
                }
            )
        }
    )
})

app.post('/returnBook', async (req, res) => {
    const transactionId = req.body.transactionId;
    const bookId = req.body.itemId;

    try {
        // Update transaction with return date
        await new Promise((resolve, reject) => {
            connection.query(
                `UPDATE transaction SET return_date = ? WHERE id = ?`,
                [new Date(), transactionId],
                (err, results) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else if (results.affectedRows === 1) {
                        resolve(results);
                    } else {
                        const err = new Error('item not found');
                        err.statusCode = 404;
                        reject(err)
                    }
                }
            );
        });

        // Update item availability
        await new Promise((resolve, reject) => {
            connection.query(
                `UPDATE item SET available = available + 1 WHERE id = ?`,
                [bookId],
                (err, result) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });

        // Send success response after all operations are completed
        res.status(200).json({ message: 'Item returned successfully' });
    } catch (error) {
        console.log("error", error)
        console.error(error);
        res.status(404).json({ error: 'transaction not found' });
    }
});

// Route that gets ALL TRANSACTIONS
app.get('/getAllTransactions', (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const offset = (page - 1) * limit

    if (isNaN(page) || page < 1) { return res.status(400).send('Invalid page number') }
    
    const query = `SELECT t.*, u.name, i.title, i.author, i.isbn, i.category
            FROM transaction t
            JOIN user u on t.user_id = u.id
            JOIN item i on t.item_id = i.id
            ORDER BY t.id DESC
            LIMIT ${limit} OFFSET ${offset}`;
            
    connection.query(query, (err, results) => {
        if (err) {
            console.error(err)
            return res.status(500).send('Error fetching active transactions')
        }
    res.send(results)
    })
})

// Route that gets all transactions of a GIVEN USER ID
app.get('/getAllTransactionsPerId', (req, res) => {
    try {
        const userId = req.query.id;
        if (!userId || isNaN(userId)) { return res.status(401).send('Unauthorized'); }
        
        const page = parseInt(req.query.page) || 1;
        const limit = 5;
        const offset = (page - 1) * limit;

        if (isNaN(page) || page < 1) {
            return res.status(400).send('Invalid page number');
        }

        const query = `
            SELECT i.*, t.*
            FROM item i
            INNER JOIN transaction t ON i.id = t.item_id
            WHERE t.user_id = ?
            ORDER BY CAST(t.return_date AS DATE) ASC
            LIMIT ${limit} OFFSET ${offset}
        `;

        connection.query(query, [userId], (err, results) => {
            if (err) {
              console.error('Error executing MySQL query: ' + err.stack);
              res.status(500).json({ error: 'Internal server error' });
              return;
            }
      
            // Check for empty results
            if (results.length === 0) {
              res.status(404).send('User not found'); // Use 404 for non-existent user
            } else {
              res.json(results);
            }
          });
    } catch (error) {
        console.error('Error handling getAllTransactionsPerId:', error);
        res.status(500).send('Internal server error');
    }
});

// Route that gets all currently borrowed books of a user
app.get('/getActiveTransactions', (req, res) => {
    const userId = req.query.id
    if (!userId) { return res.status(401).send('Unauthorized') }

    const page = parseInt(req.query.page) || 1
    const limit = 5
    const offset = (page - 1) * limit

    const query = `
        SELECT i.*, t.id, t.item_id, t.issue_date, t.due_date
        FROM item i
        INNER JOIN transaction t ON i.id = t.item_id
        WHERE t.user_id = ? AND t.return_date IS NULL
        LIMIT ${limit} OFFSET ${offset}
    `;

    connection.query(query, [userId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error fetching active transactions')
        }

        res.send(results)
    })
})

// Route that gets all returned books of a user
app.get('/getBorrowHistory', (req, res) => {
    try {
      // Validate user ID (presence and type)
      const userId = req.query.id;
      if (!userId || isNaN(parseInt(userId))) {
        return res.status(401).send('Unauthorized');
      }
  
      // Validate page number (optional, but recommended for pagination)
      const page = parseInt(req.query.page) || 1;
      if (isNaN(page) || page < 1) {
        return res.status(400).send('Invalid page number');
      }
  
      const limit = 10; // Adjust limit as needed
      const offset = (page - 1) * limit;
  
      const query = `
        SELECT i.*, t.id, t.item_id, t.return_date
        FROM item i
        INNER JOIN transaction t ON i.id = t.item_id
        WHERE t.user_id = ? AND t.return_date IS NOT NULL AND t.return_date <> '0000-00-00'
        ORDER BY t.return_date DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
  
      connection.query(query, [userId], (err, results) => {
        if (err) {
          console.error('Error executing MySQL query:', err.stack);
          return res.status(500).json({ error: 'Internal server error' });
        }
  
        // Check for empty results (no borrow history)
        if (results.length === 0) {
          res.status(404).send('No borrow history found');
        } else {
          res.json(results);
        }
      });
    } catch (error) {
      console.error('Error retrieving borrow history:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Route to get user list with pagination
app.get('/users', async (req, res) => {
    try {
        const page = parseInt(req.query.page)
        const limit = 10
        const offset = (page - 1) * limit
        if (isNaN(page) || page < 1) {
            return res.status(400).json({ error: 'Invalid page number' })
        }

        const sqlQuery = `
            SELECT * FROM user LIMIT ${limit} OFFSET ${offset}
        `

        const results = await new Promise((resolve, reject) => {
            connection.query(sqlQuery, (err, results) => {
                if (err) { reject(err) } else { resolve(results) }
            })
        })

        res.status(200).json(results)
    } catch (error) {
        console.error('Error retrieving users: ', error)
        res.status(400).json(error)
    }
})

app.get('/searchMember', async (req, res) => {
    try {
        const searchQuery = req.query.search
        const page = parseInt(req.query.page)
        const itemsPerPage = 10
        const offset = (page - 1) * itemsPerPage

        if (isNaN(page) || page < 1) {
            throw new Error('Invalid page number')
        }

        const sqlQuery =   `
        SELECT *
        FROM user
        WHERE id LIKE '%${searchQuery}%' OR name LIKE '%${searchQuery}%' OR userType LIKE '%${searchQuery}%' 
        LIMIT ${itemsPerPage} OFFSET ${offset}
        `;

        const [results] = await connection.promise().promise().query(sqlQuery)

        res.json(results)
    } catch(error) {
        console.error('Error retrieving members: ', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

module.exports = app;