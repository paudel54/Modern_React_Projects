const express = require('express');
const router = express.Router();

// imports
//!!!We can have exports from routes with multiple methods so on import must be destructred : regular var name results in ERROR
const { createOrUpdateUser } = require('../controllers/auth')

router.get('/create-or-update-user', createOrUpdateUser);

// Export router:
module.exports = router;



