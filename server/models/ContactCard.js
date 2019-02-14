const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactCardShema = new Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String
});

module.exports = ContactCard = mongoose.model("contactCard", ContactCardShema);