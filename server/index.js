const express = require('express');
const mysql = require("mysql");
const session = require("express-session");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors = require('cors'); // Import cors package

const app = express();
const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3001'
}));

app.use(session({
    secret: 'ssshhhhh', //random string i guess
    resave: true,
    saveUninitialized: false //https://github.com/expressjs/session#options <-- useful site
}));

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "centralized_library"
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
    console.log(req.body);
    const usertype = "member"
    let salt = bcrypt.genSaltSync(saltRounds);
    let hash = bcrypt.hashSync(req.body.password, salt);
    console.log("hash: ", hash)

    connection.query('INSERT INTO user (name, password, userType) VALUES ("' + req.body.username + '","' + hash + '","' + usertype + '")', (err, result) => {
        if (err) throw err
        res.json({success: true})
    })
})


//--------------------------------------ITEMS-----------------------------------------

app.delete('/deleteItem', (req, res) => {
    console.log('deleted yay')
    connection.query(
        `UPDATE item
        SET is_deleted = 1
        WHERE id = `+ req.body.id +`;`, (err, result) => {
    });
});

app.post('/addItem', (req, res) => {
    const item = req.body
    try {
        connection.query(`INSERT INTO item (author, title, isbn, category, publisher, year, available, copies)
            VALUES ( "`+ item.author +`", "`+ item.title +`", "`+ item.isbn +`", "`+ item.category +`", "`+ item.publisher +`", `+ item.year +`, `+ item.copies +`, `+ item.copies +`);`, (err, result) => {
            if (err) throw err;
        })
        console.log('Item added successfully: ', req.body)
        res.status(201).send('Item added successfully');
    } catch (error) {
        console.error('Error adding item: ', error);
        res.status(500).send('Error adding item');
    }
})

app.patch('/updateItem', async (req, res) => {
    const item = req.body
    const newCopies = item.currentCopies + item.addedCopies

    try {
        // Perform the update to the database
        connection.query(`UPDATE item
                        SET author = "`+ item.author +`",
                            title = "`+ item.title +`",
                            isbn = '`+ item.isbn +`',
                            category = '`+ item.category +`',
                            publisher = "`+ item.publisher +`",
                            year = '`+ item.year +`',
                            available = available + '`+ item.addedCopies +`',
                            copies = `+ newCopies +`
                        WHERE id = `+ item.id +`;`, (err, result) => {
            if (err) throw err
            res.send('product')
        })
    } catch (error) {
        console.error('Error updating item: ', error)
        res.status(500).json({ message: 'Internal server error' })
    }
})

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
        console.error('Error retrieving items:', error);
        res.status(500).json({ error: 'Internal server error' });
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
            console.error('Error executing MySQL query: ' + err.stack);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results);
        });
    } catch (error) {
        console.error('Error retrieving items: ', error)
        res.status(500).json({ error: 'Internal server error' });
    }
});
  

app.post('/getItem', (req, res) => {
    connection.query(`SELECT * FROM item WHERE id="`+ req.body.id+`"`, (err, result) => {
        res.send(result);
    });
});

//------------------------------------------------MEMBER----------------------------------------------------

app.post('/borrowBook', (req, res) => {
    const userId = req.body.userId
    const bookId  = req.body.bookId

    console.log('user id: ', req.body.userId)

    // Check book availability
    connection.query(
        'SELECT available FROM item WHERE id = ?', [bookId], (err, results) => {
            if (err) {
                console.error(err)
                return res.status(500).send({ error: 'An error has occured' })
            }

            if (results.length === 0) { return res.status(404).send({ error: 'Book not found' }) }

            const { available } = results[0]

            if (available <= 0) { return res.status(400).send({ error: 'Book is not currently available' }) }

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

app.post('/returnBook', (req, res) => {
    const transactionId = req.body.transactionId
    const bookId = req.body.itemId

    try {
        // Update transaction with return date
        connection.query(
          `UPDATE transaction SET return_date = ? WHERE id = ?`, [new Date(), transactionId], (err, results) => {
            if (err) {
                console.error(err)
                return res.status(500).send({ error: 'An error has occured' })
            }
            // Update item availability
            connection.query(`UPDATE item SET available = available + 1 WHERE id = ?`, [bookId], (err, result) => {
                if (err) {
                    console.error(err)
                    return res.status(500).send({ error: 'An error occured' })
                }
            });
          }
        );
        res.status(200).json({ message: 'Item returned successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route that gets all transactions of a user whether currently borrowed or returned
app.get('/getAllTransactionsPerId', (req, res) => {
    const userId = req.query.id
    if (!userId) { return req.status(401).send('Unauthorized') }
    
    const page = parseInt(req.query.page) || 1
    const limit = 5
    const offset = (page - 1) * limit

    if (isNaN(page) || page < 1) {
        return res.status(400).send('Invalid page number')
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
            console.error(err)
            return res.status(500).send('Error fetching active transactions')
        }

        res.send(results)
    })
})

// Route that gets all currently borrowed books of a user
app.get('/getActiveTransactions', (req, res) => {
    const userId = req.query.id
    if (!userId) { return res.status(401).send('Unauthorized') }

    const query = `
        SELECT i.*, t.id, t.item_id, t.issue_date, t.due_date
        FROM item i
        INNER JOIN transaction t ON i.id = t.item_id
        WHERE t.user_id = ? AND t.return_date IS NULL
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
    const userId = req.query.id;
    if (!userId) {
        return res.status(401).send('Unauthorized')
    }
    const query = `
    SELECT i.*, t.id, t.item_id, t.return_date
    FROM item i
    INNER JOIN transaction t ON i.id = t.item_id
    WHERE t.user_id = ? AND t.return_date IS NOT NULL AND t.return_date <> '0000-00-00';
    `;

    connection.query(query, [userId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error fetching active transactions')
        }

        res.send(results)
    })
});

// Route to get user list with pagination
app.get('/users', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = 10
        const offset = (page - 1) * limit
        if (isNaN(page) || page < 1) {
            throw new Error('Invalid page number')
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
        res.status(500).json({ error: 'Internal server error' })
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


//------------------------------------------------LISTEN----------------------------------------------------

app.listen(port, () => {
    console.log('Server listening on port ' + port);
})
