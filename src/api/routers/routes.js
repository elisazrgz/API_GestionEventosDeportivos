const express = require("express");
const router = express.Router();

router.use("/users", require("./api_routes/users_routes"));
router.use("/events", require("../routers/api_routes/events_routes"));

module.exports = router;