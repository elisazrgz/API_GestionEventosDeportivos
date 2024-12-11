const Events = require("../models/events_model");

const getAllEvents = async (req, res) => {
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

const getUpcomingEvents = async (req, res) => {
    try {
        // establezco la fecha actual
        const presentDate = new Date();
        // filtro los eventos en la base de datos con "greater than or equal" la fecha actual para que solo aparezca los futuros 
        // y sort para mostrarlos en orden ascendente
        const listEvents = await Events.find({ date: { $gte: presentDate } }).sort({date: 1});
        return res.status(200).json({message: "aquí tienes una lista con los eventos más próximos", list: listEvents});
    } catch (error) {
        console.log(error)
    }
};

const filterBySport = async (req, res) => {
    try {
        // capturo la petición
        const wantedSport = req.query.type;
        // compruebo si hay evento en la bdd con el campo de sport que se pide y devuelvo respuesta según corresponda
        const foundEvent = await Events.find({sport: wantedSport});
        if (!foundEvent) {
            return res.status(404).json({ message: "no se encontraron eventos del deporte seleccionado" });
        }
        return res.status(200).json({message: "aquí se muestran los eventos del deporte seleccionado", events: foundEvent});
    } catch (error) {
        console.log(error)
    }
};

const getEventsByDate = async (req, res) => {
    try {
        // capturo los parametros "from" y "to" de la petición query
        const {from, to} = req.query;

        // convierto los parámetros al tipo Date
        const fromDate = new Date(from);
        const toDate = new Date(to);

        // hago la búsqueda en la bdd:
        // "mayor o igual que" -> a partir de la fecha de inicio (fromDate)
        // "menor o igual que" -> hasta la fecha final (toDate)
        // datos ordenados de forma ascendente
        const eventsInsideRange = await Events.find({date: { $gte: fromDate, $lte: toDate }}).sort({date: 1});

        // envío la respuesta adecuada dependiendo de si se ha encontrado algún evento en el rango seleccionado
        if (eventsInsideRange.length === 0) {
            return res.status(404).json({message: "No se encontraron eventos en la fecha seleccionada"})
        }
        return res.status(200).json({success: true, events: eventsInsideRange});

    } catch (error) {
        console.log(error)
    }
};


module.exports = {
    getAllEvents,
    getEventById,
    createEvent,
    updateEventById,
    deleteEventById,
    getUpcomingEvents,
    filterBySport,
    getEventsByDate
}