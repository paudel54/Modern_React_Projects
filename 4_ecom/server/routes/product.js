const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const { create, listAll, remove, read, update, list } = require("../controllers/product");

// routes
router.post("/product", authCheck, adminCheck, create);
router.get("/products/:count", listAll);
router.delete("/product/:slug", authCheck, adminCheck, remove)
//route to get single Product:
router.get("/product/:slug", read);
//update product
router.put("/product/:slug", authCheck, adminCheck, update);

//with post request is is very easy to send data on req body
router.post('/products', list)
module.exports = router;