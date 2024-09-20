const express = require('express');
const {handleGeneratenewURL,handleGetAnalytics} = require('../controllers/url');
const router = express.Router();

router.post('/',handleGeneratenewURL);

router.get('/analytics/:shortId',handleGetAnalytics)


module.exports = router;