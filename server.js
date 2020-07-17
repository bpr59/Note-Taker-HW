const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const bodyParser = require("body-parser");
// const { notStrictEqual } = require("assert");

const log = console.log;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(bodyParser());

let dataBase = fs.readFileSync("./db/db.json","utf-8");

// log("database:", dataBase)

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

    dataBase.push(body);
    fs.writeFileSync("./db/db.json", JSON.stringify(dataBase), "utf-8");
  });

// ----------------------------------------------------------

app.delete('/api/notes/:id',(req, res) => {

    var id = req.params.id ;

    console.log(id);

  fs.readFile("./db/db.json", (err,dataBase) => {
        dataBase = JSON.parse( dataBase );

    console.log(dataBase);

  delete dataBase[id];
  
  console.log(JSON.stringify(dataBase));

  res.send('Note was deleted');
  });

  fs.writeFileSync("./db/db.json", JSON.stringify(dataBase), "utf-8");
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/error.html'));  
})

app.listen(8080, () => log("App is running at port ", 8080));
