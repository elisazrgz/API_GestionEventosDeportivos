const Events = require("../models/events_model");

const viewAllEvents = async (req, res) => {
    try {
        const listEvents = await Events.find();
        return res.status(200).json({success: true, list: listEvents});
    } catch (error) {
        console.log(error)
    }
};

// con id se refiere al id del modelo de datos (no el _id que crea mongo)
const getEventById = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        // compruebo si hay evento en la bdd con ese id y devuelvo respuesta según corresponda
        const foundEvent = await Events.findOne({id: eventId});
        if (!foundEvent) {
            return res.status(404).json({ message: "evento no encontrado" });
        }
        return res.status(200).json({success: true, event: foundEvent});
    } catch (error) {
        console.log(error)
    }
};

const createEvent = async (req, res) => {
    try {
        newEvent = new Events(req.body);
        createdEvent = await newEvent.save();
        return res.status(200).json({message: "evento creado", event: createdEvent});
    } catch (error) {
        console.log(error)
    }
};

const updateEventById = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        // compruebo si hay evento en la bdd con ese id
        const foundEvent = await Events.findOne({id: eventId});
        if (!foundEvent) {
            return res.status(404).json({message: "evento no encontrado"});
        }
        // si el evento existe entonces se hace el update
        const newEvent = req.body;
        const updatedEvent = await Events.findOneAndUpdate({id: eventId}, newEvent, {new: true});
        return res.status(200).json({message: "evento actualizado con éxito", event: updatedEvent})
    } catch (error) {
        console.log(error)
    }
};

const deleteEventById = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        // compruebo si hay evento en la bdd con ese id
        const foundEvent = await Events.findOne({id: eventId});
        if (!foundEvent) {
            return res.status(404).json({message: "evento no encontrado"});
        }
        // si el evento existe entonces se elimina
        const deletedEvent = await Events.findOneAndDelete({id: eventId});
        return res.status(200).json({message: "evento eliminado con éxito", event: deletedEvent})
    } catch (error) {
        console.log(error)
    }
};

module.exports = {viewAllEvents, getEventById, createEvent, updateEventById, deleteEventById}