const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    id: {type: Number, required:true, unique:true},
    name: {type:String, required:true},
    description: {type:String},
    date: {type:Date, required:true},
    location: {type:String, required:true},
    sport: {type:String, required:true},
    organizer: {type:String, required:true}
}, {
    collection: "events",
    timestamps:true
})

const Events = mongoose.model("events", eventSchema);

module.exports = Events;