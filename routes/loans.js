const router = require('express').Router();

const LoanController = require("../controllers/LoanController");

//
const verifyToken = require("../app/middlewares/authenticate");

//create user
router.get('/', verifyToken, LoanController.index);
router.post('/application',verifyToken,  LoanController.store);
router.post('/approve',verifyToken,  LoanController.loanapprove);
router.post('/repayment',verifyToken,  LoanController.repayment);



module.exports = router