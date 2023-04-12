const userController = require("../controller/userController");
const { upload, auth } = require("../functions/required");
const express = require("express")
let router = express.Router();
const cors=require("cors");


router.use(express.json({limit: '50mb'}));
router.use(
  express.urlencoded({
    limit: '50mb',
    extended: false,
  })
);
router.use(cors({
  credentials: true
}));
router
  .post("/newuser",  userController.newUser)
  .post("/login", userController.login);

module.exports = router;
