const {  upload, auth } = require("../functions/required");
const itemController = require("../controller/itemController.js");
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
  credentials: true,
}));


router
  .get("/", itemController.getAllItems) // to get all items
  .get("/:id", itemController.getitem) // to get item by id
  .post("/", auth, upload.single("file"), itemController.saveitem) // to upload item
  // .put("/:id", auth, upload.single("file"), itemController.updateitem) // to update item
  .delete("/:id", auth, itemController.deleteitem); // to delete item by id

module.exports = router;
