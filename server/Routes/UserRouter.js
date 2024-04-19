const express = require("express");
const userController = require("../Controllers/userController");
const AsyncErrorHandler = require("../Utils/AsyncErrorHandler");

const verify = require("../Utils/Verifytoken");

const router = express.Router();

router.route("/signup").post(userController.signup);
router.route("/signout").post(userController.signout);

router.route("/signin").post(userController.signin);

router.route("/verify").get(verify.verifyToken, userController.verify);

router.route("/").get(userController.recentUsers);

router.route("/chart").get(userController.getUsersForChat);

module.exports = router;
