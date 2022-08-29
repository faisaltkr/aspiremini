const router = require('express').Router();

const userController = require("../controllers/UserController");
const AuthController = require("../controllers/AuthController");

//
const verifyToken = require("../app/middlewares/authenticate");

//create user
router.get('/', verifyToken, userController.index);
router.post('/', userController.store);

//login
router.post('/login', AuthController.userLogin);


module.exports = router