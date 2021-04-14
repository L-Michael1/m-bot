const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//template to add to our database using a schema(model)
const moneySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String, 
    serverID: String,
    coins: Number

});

//export our model
module.exports = mongoose.model("Money", moneySchema, 'money');
