const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const keys = require('./config/mongoKeys');
const ContactCard = require('./models/ContactCard');
const port = 5000;
app.use(cors());

mongoose.connect(keys.devKey, { useNewUrlParser: true })
    .then(async() => {
    
    })
    .catch(console.error);

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/get-cards', async (req, res) => {
    const cards = await ContactCard.find({});
    res.status(200).json(cards);
});

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});