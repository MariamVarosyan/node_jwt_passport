const express = require("express")
const ManagerContoller = require("../controller/ManagerController");
const upload = require("../middleware/Upload");
const manager = express.Router();

manager.post("/products/add", upload.array("img"), ManagerContoller.addProduct)
manager.delete("/products/:id", ManagerContoller.deleteProduct)
manager.delete("/products/img/:id", ManagerContoller.deleteProductImg)
manager.patch("/products/:id", ManagerContoller.updateProductById)
manager.patch("/products/img/:id", upload.single("img"), ManagerContoller.updateProductImg)

module.exports = { manager }