const express = require("express");
const { body, query, param } = require("express-validator")
const router = express.Router();
const controller = require("./../controllers/eventcontrol")
const isAuth = require("./../middleware/authrizeMW")

router.route("/events/:id?")
    .get([
        body("id").optional().isInt().withMessage("speaker ID should be Integer")
    ], isAuth, controller.getEvent)

    .post([
        body("id").isInt().withMessage("student ID should be Integer"),
        body("title").isAlpha().withMessage("Event title should be string"),
        body("eventDate").isDate().withMessage("date is incorrect"),
        body("main_speaker").isInt().withMessage("name should be string "),
        body("speakers").isArray().withMessage("speakers names should be string "),
        body("students").isArray().withMessage("name should be string ")
    ], isAuth, controller.createEvent)
    .put([
        body("id").isInt().withMessage("speaker ID should be Integer")
    ], isAuth, controller.updateEvents)
    .delete([
        body("id").isInt().withMessage("speaker ID should be Integer")
    ], isAuth, controller.deleteEvent);
















module.exports = router;





