const express = require('express');
const router = express.Router();

const masterController=require('../controller/master.controller');

// *** All Masters By Get ***
router.get('/',masterController.allMasterByGet);

// *** All Masters By Post ***
router.post('/',masterController.allMasterByPost);
module.exports = router; 