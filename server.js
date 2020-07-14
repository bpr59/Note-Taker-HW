const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const bodyParser = require("body-parser");

const log = console.log;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(bodyParser());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
    //res.json("App is working!");
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
    // res.json("You are viewing the notes file");
});

app.get("/api/notes", (req, res) => {
    return res.send(dataBase);
  });

app.post('/api/notes', (req, res) => {
    
    console.log('/api/notes', req.body);

    res.json("My response is working");
  });

app.get('*', (req, res) => {
    res.json("Sorry this is not a webpage!");
})

app.listen(8080, () => log("App is running at port ", 8080));