// Node modules used in app development
const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const bodyParser = require("body-parser");
var PORT = process.env.PORT || 8080;


const log = console.log;

//middleware before executing any end route logic 
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(bodyParser());

//declaration of database file and read
let dataBase = fs.readFileSync("./db/db.json","utf-8");

dataBase ? dataBase = JSON.parse(dataBase) : dataBase = [];

//acquiring information from html files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get("/api/notes", (req, res) => {
    return res.send(dataBase);
  });

//returning information received via app.get
app.post('/api/notes', (req, res) => {
    let body = req.body;
    let noteId = {"id":Math.round(Math.random()* 9999)};
    body = {...noteId,...body}

    dataBase.push(body);
    fs.writeFileSync("./db/db.json", JSON.stringify(dataBase), "utf-8");
  });

//function to delete note from sidebar list
app.delete("/api/notes/:id", (req, res) => {
  
  let id = req.params.id;
  let notes = dataBase;

  for(let i = 0; i < notes.length; i++){

      if(notes[i].id == id){
          notes.splice(i, 1);
          res.send("The note was deleted");
      }
  }
  fs.writeFileSync("./db/db.json", JSON.stringify(dataBase), "utf-8");
});

//response of 404 file to user of localhost query to a wrong link
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/error.html'));  
})

//localhost listening link and response to user
app.listen(PORT, () => log("App is running at port ", PORT));
