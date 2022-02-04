const { Router } = require("express")
const { check } = require('express-validator')
const { fieldValidate } = require("../middlewares/field-validate")
const { createUser, loginUser, renewToken } = require("../controllers/auth")
const { validateJWT } = require("../middlewares/validate-jwt")

const router = Router()


router.post(
  "/new",
  [
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('email', 'El email es obligatorio.').isEmail(),
    check('password', 'El password debe ser de 6 caracteres.').isLength({ min:6 }),
    fieldValidate
  ],
  createUser
)

router.post(
  "/", 
  [
    check('email', 'El email es obligatorio.').isEmail(),
    check('password', 'El password debe ser de 6 caracteres.').isLength({ min:6 }),
    fieldValidate
  ],
  loginUser
)

router.get("/renew", validateJWT, renewToken)


module.exports = router
