const express = require("express");
const eventsRouter = express.Router();
const {viewAllEvents, getEventById, createEvent, updateEventById, deleteEventById} = require("../../controllers/events_controller");
const checkToken = require("../../../utils/middleware");

eventsRouter.get("/", checkToken, viewAllEvents);
eventsRouter.get("/:eventId", checkToken, getEventById);
eventsRouter.post("/", checkToken, createEvent);
eventsRouter.put("/:eventId", updateEventById);
eventsRouter.delete("/:eventId", deleteEventById);

module.exports = eventsRouter;