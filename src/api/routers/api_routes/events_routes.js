const express = require("express");
const eventsRouter = express.Router();
const {viewAllEvents, getEventById, createEvent, updateEventById, deleteEventById} = require("../../controllers/events_controller");

eventsRouter.get("/events", viewAllEvents);
eventsRouter.get("/events/:eventId", getEventById);
eventsRouter.post("/events", createEvent);
eventsRouter.put("/events/:eventId", updateEventById);
eventsRouter.delete("/events/:eventId", deleteEventById);

module.exports = eventsRouter;