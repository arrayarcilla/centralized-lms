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
app.use(cors()); // Use cors middleware to allow cross-origin requests

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
    console.log("req.body: ",req.body);
    res.send("Hello world");
    // const sesh = req.session;
    // connection.query('SELECT * FROM user WHERE username="' + req.body.user + '"', (err, result) => {
    //     if (result.length != 0 && bcrypt.compareSync(req.body.pwd, result[0]['password'])) {
    //         sesh.id = result[0].id;
    //         sesh.user = result[0].username;
    //         sesh.usertype = result[0].usertype;
    //          if(result[0].usertype === 1){
    //             res.send("member");
    //          }else{
    //             res.send("admin");
    //          }
    //     } else {
    //         res.send(" ");
    //         throw err;
    //     }
    // })
})

app.post('/create_user', (req, res) => {
    console.log(req.query);
    let salt = bcrypt.genSaltSync(saltRounds);
    let hash = bcrypt.hashSync(req.query.password, salt);
    connection.query('INSERT INTO user (username, password, usertype) VALUES ("' + req.query.username + '","' + hash + '","' + req.query.usertype + '")', (err, result) => {
        if (err) throw err
    })
})

app.listen(port, () => {
    console.log('Server listening on port ' + port);
})
