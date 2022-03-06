const express = require("express");
const router = express.Router();
const auth = require("../../middleWare/auth");
const transactionController = require("../../controllers/transaction");

//Route for transaction

//@route --get api/transaction/get_transactions
//@description --get user transaction history
//@access --private
router.get("/get_transactions/:userId", transactionController.getTransactions);

//@route --post api/transaction/deposit
//@description --user deposited money
//@access --private
router.post("/deposit", transactionController.deposit);

//@route --post api/transaction/withdraw
//@description --user withdraw money
//@access --private
router.post("/withdraw", transactionController.withdraw);

//@route --post api/transaction/transfer
//@description --user transfer money
//@access --private
router.post("/transfer", transactionController.transfer);

//@route --post api/transaction/services/?type
//@description --user made use of some services
//@access --private
router.patch("/services", transactionController.services);

module.exports = router;
