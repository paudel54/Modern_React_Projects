const express = require('express');

const router = express.Router();


router.get('/user', (req, res) => res.json({
    data: 'You hit user Api endpoint',
    name: "Sangeeta Karki",
    address: "Melbrone"
}))

module.exports = router