/*
  Event Routes
  /api/events
*/

const { Router } = require("express");
const { check } = require("express-validator");

const { isDate } = require("../helpers/isDate");
const { fieldValidate } = require("../middlewares/field-validate");
const { validateJWT } = require("../middlewares/validate-jwt");
const { getEvent, createEvent, putEvent, dropEvent } = require("../controllers/events");

const router = Router();

router.use(validateJWT);

// GET events
router.get("/", getEvent);

// CREATE events
router.post(
  "/",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "La fecha de inicio es obligatorio").custom(isDate),
    check("end", "La fecha de inicio es obligatorio").custom(isDate),
    fieldValidate,
  ],
  createEvent
);

// PUT events
router.put(
  "/:id", 
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "La fecha de inicio es obligatorio").custom(isDate),
    check("end", "La fecha de inicio es obligatorio").custom(isDate),
    fieldValidate,
  ],
  putEvent);

// DELETE events
router.delete("/:id", dropEvent);

module.exports = router;
