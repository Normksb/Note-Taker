const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 443;
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "./public")));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

app.get('/notes', (req, res) => res.sendFile('./public/notes.html', {
    root: path.join(__dirname)
 }));

 app.get('/api/notes', (req, res) => res.sendFile('./db/db.json', {
    root: path.join(__dirname)
 }));



app.post('/api/notes', (req, res) => {
    let noteArray = require('./db/db.json')
    let note = req.body;
    note.id = uuidv4();
    noteArray.push(note);
    console.log("here is notearray",noteArray)

  
    fs.writeFile('./db/db.json', JSON.stringify(noteArray), (err) =>
    err ? console.log(err) : console.log("Success!")
  );

});

app.delete('/api/notes/:delete', (req, res) => {

    let noteArray = require('./db/db.json')
    let index = noteArray.map(function(item) {
        return item.id
    }).indexOf(req.params.delete);
    noteArray.splice(index,1);
    
    fs.writeFile('./db/db.json', JSON.stringify(noteArray), (err) =>
    err ? console.log(err) : console.log("Success!")
  );

});


app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));