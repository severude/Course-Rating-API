'use strict';

const express = require('express');
const router = express.Router();
const mid = require('../middleware');

// Returns the currently authenticated user
router.get('/users', mid.authorized, function(req, res, next) {
	res.json({response: "GET request for the currently authenticated user"});
});

// Creates a user, sets the Location header to "/", and returns no content
router.post('/users', function(req, res, next) {
	res.json({
		response: "POST request to create a user",
		body: req.body
	});
});

// Returns the Course "_id" and "title" properties
router.get('/courses', function(req, res, next) {
	res.json({response: "GET request for course _id and title properties"});
});

// Returns all Course properties and related user and review documents
// for the provided course ID
router.get('/courses/:courseId', function(req, res, next) {
	res.json({
		response: "GET request for all course properties with related user and review documents",
		courseId: req.params.courseId
	});
});

// Creates a course, sets the Location header, and returns no content
router.post('/courses', function(req, res, next) {
	res.json({
		response: "POST request to create a course",
		body: req.body
	});
});

// Updates a course and returns no content
router.put('/courses/:courseId', function(req, res, next) {
	res.json({
		response: "PUT request to update a course",
		courseId: req.params.courseId,
		body: req.body
	});
});

// Creates a review for the specified course ID, sets the Location header
// to the related course, and returns no content
router.post('/courses/:courseId/reviews', function(req, res, next) {
	res.json({
		response: "POST request to create a review for a specified course ID",
		courseId: req.params.courseId,
		body: req.body
	});
});

module.exports = router;