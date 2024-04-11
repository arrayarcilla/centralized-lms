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
                res.json({ usertype: "admin" });
            } else {
                res.json({ usertype: "member" });
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
    connection.query(`UPDATE item
                        SET is_available = 0
                        WHERE id = `+ req.body.id +`;`, (err, result) => {
        res.render("product", { products: result });
    });
});

app.post('/addItem', (req, res) => {
    const item = req.body
    try {
        connection.query(`INSERT INTO item (author, title, isbn, category, publisher, year, copies)
            VALUES ( "`+ item.author +`", "`+ item.title +`", "`+ item.isbn +`", "`+ item.category +`", "`+ item.publisher +`", `+ item.year +`, `+ item.copies +`);`, (err, result) => {
            if (err) throw err;
        })
        console.log('Item added successfully: ', req.body)
        res.status(201).send('Item added successfully');
    } catch (error) {
        console.error('Error adding item: ', error);
        res.status(500).send('Error adding item');
    }
})

app.patch('/updateItem', (req, res) => {
    const item = req.body
    connection.query(`UPDATE item
                        SET author = "`+ item.author +`",
                            title = "`+ item.title +`",
                            isbn = '`+ item.isbn +`',
                            category = '`+ item.catgory +`',
                            publisher = "`+ item.publisher +`",
                            year = '`+ item.year +`',
                            copies = `+ item.copies +`
                        WHERE id = `+ item.id +`;`, (err, result) => {
        if (err) throw err
        res.send('product')
    })
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

  // Route to handle search
app.get('/search', (req, res) => {
    const searchQuery = req.query.search; // Assuming the search term is provided as 'q' query parameter
    const sqlQuery = `
      SELECT *
      FROM item
      WHERE title LIKE '%${searchQuery}%' OR author LIKE '%${searchQuery}%' OR publisher LIKE '%${searchQuery}%'
    `;
    connection.query(sqlQuery, (err, results) => {
      if (err) {
        console.error('Error executing MySQL query: ' + err.stack);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(results);
    });
  });
  

app.post('/getItem', (req, res) => {
    connection.query(`SELECT * FROM item WHERE id="`+ req.body.id+`"`, (err, result) => {
        res.send(result);
    });
});

//------------------------------------------------MEMBER----------------------------------------------------

// Borrow an item
app.post('/borrowItem', (req, res) => {
    const { user_id } = req.body;

    // Check if the item is available and has copies
    connection.query('SELECT * FROM item WHERE id = ? AND is_available = 1 AND copies > 0', [sesh.id], (err, result) => {
        if (err) {
            console.error('Error executing MySQL query: ' + err.stack);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        if (result.length > 0) {
            // Item is available and has copies, proceed with borrowing
            const issue_date = new Date().toISOString().slice(0, 10); // Get current date

            // Insert transaction record
            connection.query('INSERT INTO transaction (user_id, item_id, issue_date) VALUES (?, ?, ?)',
                [sesh.id, item_id, issue_date],
                (err, result) => {
                    if (err) {
                        console.error('Error executing MySQL query: ' + err.stack);
                        res.status(500).json({ error: 'Internal server error' });
                        return;
                    }

                    // Decrement number of copies and update item availability if copies reach 0
                    connection.query(`
                        UPDATE item 
                        SET 
                            copies = copies - 1,
                            is_available = CASE WHEN copies - 1 <= 0 THEN 0 ELSE is_available END 
                        WHERE id = ?`, 
                    [item_id], (err, result) => {
                        if (err) {
                            console.error('Error executing MySQL query: ' + err.stack);
                            res.status(500).json({ error: 'Internal server error' });
                            return;
                        }

                        res.status(200).send('Item borrowed successfully');
                    });
                });
        } else {
            res.status(400).send('Item is not available for borrowing or has no copies');
        }
    });
});

// Return an item
app.post('/returnItem', (req, res) => {
    const { transaction_id, item_id } = req.body;

    // Update return date in the transaction record
    connection.query('UPDATE transaction SET return_date = ? WHERE id = ?',
        [new Date().toISOString().slice(0, 10), transaction_id],
        (err, result) => {
            if (err) {
                console.error('Error executing MySQL query: ' + err.stack);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            // Increment number of copies and update item availability if necessary
            connection.query(`
                UPDATE item 
                SET 
                    copies = copies + 1,
                    is_available = CASE WHEN copies = 0 THEN 1 ELSE is_available END 
                WHERE id = ?`, 
            [item_id], (err, result) => {
                if (err) {
                    console.error('Error executing MySQL query: ' + err.stack);
                    res.status(500).json({ error: 'Internal server error' });
                    return;
                }

                res.status(200).send('Item returned successfully');
            });
        });
});

// Get borrowed books for a user
app.get('/borrowedItem', (req, res) => {
    const userId = req.session.id;

    // Query to get borrowed books for the user
    const query = `
        SELECT item.*
        FROM item
        INNER JOIN transaction ON item.id = transaction.item_id
        WHERE transaction.user_id = ?;
    `;

    connection.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error executing MySQL query: ' + err.stack);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        res.status(200).json(results);
    });
});


//------------------------------------------------LISTEN----------------------------------------------------

app.listen(port, () => {
    console.log('Server listening on port ' + port);
})
