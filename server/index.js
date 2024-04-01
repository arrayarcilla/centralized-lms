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
app.use(cors());

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
            res.send(" ");
            throw err;
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
    connection.query(`INSERT INTO item (author, title, media_type, category, isbn, publisher, is_available, copies)
    VALUES ( '`+ item.author +`', '`+ item.title +`', '`+ item.media_type +`', '`+ item.catgory +`', `+ item.isbn +`, '`+ item.publisher +`', `+ item.is_available +`, `+ item.copies +`);`, (err, result) => {
        if (err) throw err;
        res.redirect('product')
    })
})

app.patch('/updateItem', (req, res) => {
    const item = req.body
    connection.query(`UPDATE item
                        SET author = '`+ item.author +`',
                            title = '`+ item.title +`',
                            media_type = '`+ item.media_type +`',
                            category = '`+ item.catgory +`',
                            isbn = `+ item.isbn +`,
                            publisher = '`+ item.publisher +`',
                            is_available = `+ item.is_available +`,
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
app.get('/items', (req, res) => {
    const page = req.query.page || 1; // Default to first page if not provided
    const limit = 10; // Number of items per page
    const offset = (page - 1) * limit; // Calculate offset
  
    const query = `SELECT * FROM item LIMIT ${limit} OFFSET ${offset}`;
  
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error retrieving items:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      
      res.setHeader('Content-Type', 'application/json');
      res.json(results);
    });
  });
  

app.post('/getItem', (req, res) => {
    connection.query(`SELECT * FROM item WHERE id="`+ req.body.id+`"`, (err, result) => {
        res.send(result);
    });
});

app.listen(port, () => {
    console.log('Server listening on port ' + port);
})
