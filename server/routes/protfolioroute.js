const express = require("express");
const router = express.Router();
const protfoliocontrollers = require("../controllers/protfoliocon");

 router.get("/api/get-download", protfoliocontrollers.getdownload);
router.route("/api/get-contact").post(protfoliocontrollers.getcontact)

module.exports = router;
