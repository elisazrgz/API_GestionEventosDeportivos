const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    id: {type: Number, require:true, unique:true},
    name: {type:String, require:true},
    description: {type:String},
    date: {type:Date, require:true},
    location: {type:String, require:true},
    sport: {type:String, require:true},
    organizer: {type:String}
}, {
    collection: "events",
    timestamps:true
})

const Events = mongoose.model("events", eventSchema);

module.exports = Events;