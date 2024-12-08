const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {type: Number, require:true},
    username: {type:String, require:true},
    password: {type:String, require:true}
}, {
    collection: "users",
    timestamps:true
})

const Users = mongoose.model("users", userSchema);

module.exports = Users;