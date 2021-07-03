const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;

app.listen(port, ()=>{
    console.log(`App running on port ${port}.`);
});

const db = require('./database');

app.get('/usuario', db.getUser);
app.post('/usuario', db.add);
app.put('/usuario', db.up);
app.delete('/usuario/:id', db.delet);