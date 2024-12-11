const Events = require("../models/events_model");

const getAllEvents = async (req, res) => {
    try {
        // Búsqueda de todos los eventos en la BDD:
        const listEvents = await Events.find();
        // Se devuelve un mensaje en función de si hay eventos en la BDD o no:
        if (listEvents.length === 0) {
            return res.status(404).json({message: "No existen eventos actualmente"});
        } else {
            return res.status(200).json({message: "Estos son los eventos encontrados", eventos: listEvents});
        }
    } catch (error) {
        return res.status(500).json({message: "Se produjo un error en el servidor", data: error})
    }
};

const getEventById = async (req, res) => {
    try {
        // Se recoge el parámetro de la ruta:
        const eventId = req.params.eventId;
        // Búsqueda en la BDD de un evento con ese id y respuesta según corresponda:
        const foundEvent = await Events.findOne({id: eventId});
        if (!foundEvent) {
            return res.status(404).json({message: "No se ha encontrado ningún evento con el id seleccionado"});
        } else {
            return res.status(200).json({success: true, event: foundEvent});
        }
    } catch (error) {
        return res.status(500).json({message: "Se produjo un error en el servidor", data: error})
    }
};

const createEvent = async (req, res) => {
    try {
        // Se crea el nuevo evento con los datos de la petición haciendo uso del modelo:
        newEvent = new Events(req.body);
        // Se introduce ese evento en la BDD y se devuelve la información del mismo:
        createdEvent = await newEvent.save();
        return res.status(200).json({message: "Evento creado con éxito", event: createdEvent});
    } catch (error) {
        return res.status(500).json({message: "Se produjo un error en el servidor", data: error})
    }
};

const updateEventById = async (req, res) => {
    try {
        // Se recoge el parámetro de la ruta:
        const eventId = req.params.eventId;
        // Búsqueda en la BDD de un evento con ese id, si no existe se devuelve mensaje de error:
        const foundEvent = await Events.findOne({id: eventId});
        if (!foundEvent) {
            return res.status(404).json({message: "No se ha encontrado ningún evento con el id seleccionado"});
        }
        // Si el evento existe entonces se hace el update con los datos provenientes de la petición y se devuelve la confirmación de actualización:
        const newEvent = req.body;
        const updatedEvent = await Events.findOneAndUpdate({id: eventId}, newEvent, {new: true});
        return res.status(200).json({message: "El evento ha sido actualizado con éxito", event: updatedEvent})
    } catch (error) {
        return res.status(500).json({message: "Se produjo un error en el servidor", data: error})
    }
};

const deleteEventById = async (req, res) => {
    try {
        // Se recoge el parámetro de la ruta:
        const eventId = req.params.eventId;
        // Búsqueda en la BDD de un evento con ese id, si no existe se devuelve mensaje de error:
        const foundEvent = await Events.findOne({id: eventId});
        if (!foundEvent) {
            return res.status(404).json({message: "No se ha encontrado ningún evento con el id seleccionado"});
        }
        // Si el evento existe entonces se elimina y se devuelve mensaje de confirmación con la información que ha sido eliminada:
        const deletedEvent = await Events.findOneAndDelete({id: eventId});
        return res.status(200).json({message: "El evento ha sido eliminado con éxito", deleted: deletedEvent})
    } catch (error) {
        return res.status(500).json({message: "Se produjo un error en el servidor", data: error})
    }
};

const getUpcomingEvents = async (req, res) => {
    try {
        // Se establece la fecha actual:
        const presentDate = new Date();
        // Se filtran los eventos en la BDD con "greater than or equal" y la fecha actual para que solo se muestren los eventos futuros, y en orden ascendente
        const listEvents = await Events.find({ date:{$gte: presentDate} }).sort({date: 1});
        return res.status(200).json({message: "Aquí tiene una lista con los próximos eventos", list: listEvents});
    } catch (error) {
        return res.status(500).json({message: "Se produjo un error en el servidor", data: error})
    }
};

const filterBySport = async (req, res) => {
    try {
        // Se recoge el parámetro de la ruta:
        const wantedSport = req.query.type;
        // Búsqueda en la BDD de un evento del deporte seleccionado y se devuelve respuesta correspondiente:        
        const foundEvent = await Events.find({sport: wantedSport});
        if (foundEvent.length === 0) {
            return res.status(404).json({message: "No se encontraron eventos del deporte seleccionado"});
        } else {
            return res.status(200).json({message: "Aquí se muestran los eventos del deporte seleccionado", events: foundEvent});
        }
    } catch (error) {
        return res.status(500).json({message: "Se produjo un error en el servidor", data: error})
    }
};

const getEventsByDate = async (req, res) => {
    try {
        // Se recogen los parámetros de la ruta:
        const {from, to} = req.query;

        // Conversión de los parámetros al tipo Date:
        const fromDate = new Date(from);
        const toDate = new Date(to);

        // Búsqueda en la BDD de eventos en ese rango de fechas:
        // "greater than or equal" -> a partir de la fecha de inicio (fromDate)
        // "less than or equal" -> hasta la fecha final (toDate)
        // datos ordenados de forma ascendente
        const eventsInsideRange = await Events.find({date: {$gte: fromDate, $lte: toDate}}).sort({date: 1});

        // Envío de la respuesta adecuada dependiendo de si se ha encontrado algún evento en el rango seleccionado:
        if (eventsInsideRange.length === 0) {
            return res.status(404).json({message: "No se encontraron eventos en el rango de fechas seleccionado"})
        } else {
            return res.status(200).json({message: "Aquí se muestra una lista con los eventos dentro de las fechas seleccionadas", events: eventsInsideRange});
        }
    } catch (error) {
        return res.status(500).json({message: "Se produjo un error en el servidor", data: error})
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