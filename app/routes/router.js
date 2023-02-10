const express = require('express');
const router = express();
const cors = require("cors");

const callsController = require('../controllers/callController')

router.use(cors());
router.use(express.json());

router.route("/").get(callsController.getCalls);

module.exports = router;