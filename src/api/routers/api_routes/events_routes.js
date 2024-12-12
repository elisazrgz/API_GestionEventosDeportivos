const express = require("express");
const eventsRouter = express.Router();
const {getAllEvents,
    getEventById,
    createEvent,
    updateEventById,
    deleteEventById,
    getUpcomingEvents,
    filterBySport,
    getEventsByDate} = require("../../controllers/events_controller");
const checkToken = require("../../../utils/middleware");

// RUTAS PARA GESTIÓN DE EVENTOS
eventsRouter.get("/", getAllEvents);
eventsRouter.get("/:eventId", getEventById);
eventsRouter.post("/", checkToken, createEvent); // protegida
eventsRouter.put("/:eventId", checkToken, updateEventById); // protegida
eventsRouter.delete("/:eventId", checkToken, deleteEventById); // protegida

// RUTAS PARA CONSULTA AVANZADA DE EVENTOS
eventsRouter.get("/upcoming/get", getUpcomingEvents);
eventsRouter.get("/filterbysport/events", filterBySport); // usando los query params "type"
eventsRouter.get("/filterbydate/date", getEventsByDate); // usando los query params "from" y "to"


module.exports = eventsRouter;
