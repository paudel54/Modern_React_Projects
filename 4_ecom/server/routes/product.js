const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controllers
const {
    create,
    listAll,
    remove,
    read,
    update,
    list,
    productsCount,
    productStar,
    listRelated,
    searchFilters
} = require("../controllers/product");

// routes
router.post("/product", authCheck, adminCheck, create);
router.get("/products/:count", listAll);
router.delete("/product/:slug", authCheck, adminCheck, remove)
//route to get single Product:
//giving detail info into form and single product
router.get("/product/:slug", read);
//update product
router.put("/product/:slug", authCheck, adminCheck, update);

//with post request is is very easy to send data on req body
router.post('/products', list)
//to display onto pagination creating backed rotes and controller to get all items from db
router.get('/products/total', productsCount)
//endpoint for rating
router.put('/product/star/:productId', authCheck, productStar);
//related Products
router.get("/product/related/:productId", listRelated)
//Search [----]
//get method is normally used for fetching or getting data but using post for similar functionality to send additional paramaters:
//single endpoint handles all of the routing functionality for slider or input form anythings
router.post('/search/filters', searchFilters)
module.exports = router;