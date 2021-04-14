const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//template to add things to our database using a schema(model)
const reportSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    userID: String,
    reason: String,
    rUsername: String,
    rID: String,
    time: String    
});
// console.log(reportSchema);
module.exports = mongoose.model("Report", reportSchema, 'reports');
