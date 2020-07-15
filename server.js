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

let dataBase = fs.readFileSync("./db/db.json","utf-8");

console.log("database:", dataBase)

dataBase ? dataBase = JSON.parse(dataBase) : dataBase = [];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get("/api/notes", (req, res) => {
    return res.send(dataBase);
  });

app.post('/api/notes', (req, res) => {
    let body = req.body;
    let noteId = {"id":Math.round(Math.random()* 9999)};
    body = {...noteId,...body}

    console.log(body);

    dataBase.push(body);
    fs.writeFileSync("./db/db.json", JSON.stringify(dataBase), "utf-8");
  });

app.delete('api/notes/:id', (req, res) => {
    let requestId = req.params.id;

    let note = notes.filter(note => {
      return note.id == requestId;
    }) [0];

    const index = notes.indexOf(note);

    notes.splice(index, 1);

    fs.writeFileSync("./db/db.json", "[]", "utf-8");
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/error.html'));  
})

app.listen(8080, () => log("App is running at port ", 8080));