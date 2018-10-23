'use strict';

const express = require('express');
const router = express.Router();

router.get('/users', function(req, res, next) {
	res.json({response: "You sent me a GET request"});
});

router.post('/users', function(req, res, next) {
	res.json({
		response: "You sent me a POST request",
		body: req.body
	});
});

module.exports = router;