'use strict';
const express = require('express');
const router = express.Router();
const mid = require('../middleware');
const User = require('../models').User;
const Course = require('../models').Course;
const Review = require('../models').Review;

// Returns the currently authenticated user
router.get('/users', mid.authorized, function(req, res, next) {
	res.status(200).json(req.body.user);
});

// Creates a user, sets the Location header to "/", and returns no content
router.post('/users', function(req, res, next) {
	const user = new User(req.body);
	user.save(function(err) {
		if(err) {
			err.status = 400;
			return next(err)
		}
		else res.status(201).location('/').end();
	});
});

// Returns the Course "_id" and "title" properties
router.get('/courses', function(req, res, next) {
	Course.find({}, '_id title', function(err, courses) {
		if(err) return next(err)
		else res.status(200).json(courses);
	});
});

// Returns all Course properties and related user and review documents
// for the provided course ID
router.get('/courses/:courseId', function(req, res, next) {
	Course.findById(req.params.courseId)
		.populate('reviews user')
		.exec(function(err, course) {
			if(err) return next(err)
			else res.status(200).json(course);
	});
});

// Creates a course, sets the Location header, and returns no content
router.post('/courses', mid.authorized, function(req, res, next) {
	const course = new Course(req.body);
	course.save(function(err) {
		if(err) {
			err.status = 400;
			return next(err)
		}
		else res.status(201).location('/').end();
	});
});

// Updates a course and returns no content
router.put('/courses/:courseId', mid.authorized, function(req, res, next) {
	Course.findByIdAndUpdate(req.params.courseId, req.body, function(err) {
		if(err) {
			err.status = 400;
			return next(err)
		}
		else res.status(204).location('/').end();
	});
});

// Creates a review for the specified course ID, sets the Location header
// to the related course, and returns no content
router.post('/courses/:courseId/reviews', mid.authorized, function(req, res, next) {
	const review = new Review(req.body);
	review.save();  // Saves the new review to the database
	Course.findOneAndUpdate({_id: req.params.courseId}, {$push: {reviews: review}}, function(err, course) {
		if(err) {
			err.status = 400;
			return next(err)
		}
		else res.status(201).location('/api/courses' + req.params.courseId).end();
	});
});

module.exports = router;