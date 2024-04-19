const express = require('express');
const bannerController = require("../Controllers/bannerController")
const verify = require("../Utils/Verifytoken");


const router = express.Router();

 
router.route('/').get(bannerController.getBanner)
                 .post(bannerController.createBanner)
                 .put(bannerController.updateBanner);

 

module.exports = router;