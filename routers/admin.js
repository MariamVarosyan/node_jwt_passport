const express = require("express")
const upload = require("../middleware/Upload")
const AdminContoller = require("../controller/AdminController")
const admin = express.Router()


admin.post("/categories/add", upload.single("img"), AdminContoller.addCategory)
admin.delete("/categories/:id", AdminContoller.deleteCategory)
admin.patch("/categories/:id", AdminContoller.updateCategoryData)
admin.patch("/categories/image/:id",  upload.single("img"),AdminContoller.updateCategoryImage)


module.exports = { admin }