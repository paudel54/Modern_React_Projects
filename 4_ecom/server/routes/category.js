const express = require("express");
const router = express.Router();

//middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

//controller
const { create,
    read,
    update,
    remove,
    list,
    getSubs
} = require("../controllers/category");

//routes
//create:post read:get update:put delete:del

// router.post('/category ', authCheck, adminCheck, create);
// //show all the categories to public: 
// router.get('/categories ', list);
// //slug send req from frontend and get response from backend
// router.get('/category/:slug ', authCheck, adminCheck, read);
// router.put('/category/:slug ', authCheck, adminCheck, update);
// router.delete('/category/:slug ', authCheck, adminCheck, remove);
// console.log('We are onto routes: backed checking category middlewares controllers. ')
router.post("/category", authCheck, adminCheck, create);
router.get("/categories", list);
router.get("/category/:slug", read);
router.put("/category/:slug", authCheck, adminCheck, update);
router.delete("/category/:slug", authCheck, adminCheck, remove);
router.get("/category/subs/:_id", getSubs);

module.exports = router;