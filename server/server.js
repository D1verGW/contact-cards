const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const keys = require('./config/mongoKeys');
const ContactCard = require('./models/ContactCard');
const port = 5000;
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(keys.devKey, { useNewUrlParser: true })
    .then(async() => {
        app.listen(port, function () {
            console.log(`App listening on port ${port}!`);
        });
    })
    .catch(console.error);

app.get('/get-cards', async (req, res) => {
    const cards = await ContactCard.find({});
    res.status(200).json(cards);
});

app.post('/add-card', async (req, res) => {
    const newCard = new ContactCard(req.body);
    await newCard.save();
    res.status(200).json({ success: true });
});

app.delete('/remove-card', async (req, res) => {
    try {
        const card = await ContactCard.findOne({_id: req.body._id});
        if (card === null) throw Error('Contact Card not found');
        await card.remove();
        res.status(200).json({ success: true });
    } catch (e) {
        res.status(400).json({ success: false, error: String(e) });
    }
});
