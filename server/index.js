const express = require('express');
const mysql = require("mysql");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded()); //Parse URL-encoded bodies

const app = express();
const port = 3000;

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "inventory"
})

app.get('/', (req, res) => {
    res.send("hello world")
})

app.listen(port, () => {
    console.log('Server listening on port' + port);
})