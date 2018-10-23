'use strict';
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    fullName: {
        type: String,
        required: [true, 'User fullname is required']
    },
    emailAddress: {
        type: String,
        validate: {
            validator: function(v) {
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
            },
            message: props => `${props.value} is not a valid email address`
        },
        required: [true, 'User email address is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'User password is required']
    }
});

let ReviewSchema = new Schema({
    user: UserSchema._id,
    validate: {
        validator: function() {
            return UserSchema._id !== CourseSchema.user;
        },
        message: props => `${props.value} cannot review their own course`
    },
    postedOn: {
        type: Date,
        default: Date.now
    },
    rating: {
        type: Number,
        required: [true, 'Review rating is required'],
        min: [1, 'rating must be between 1 and 5'],
        max: [5, 'rating must be between 1 and 5']
    },
    review: String
});

let CourseSchema = new Schema({
    user: UserSchema._id,
    title: {
        type: String,
        required: [true, 'Course title is required']
    },
    description: {
        type: String,
        required: [true, 'Course description is required']
    },
    estimatedTime: String,
    materialsNeeded: String,
    steps: [{
        stepNumber: Number,
        title: {
            type: String,
            required: [true, 'Step title is required']
        },
        description: {
            type: String,
            required: [true, 'Step description is required']
        }
    }],
    reviews: [ReviewSchema._id]
});

var User = mongoose.model('User', UserSchema);
var Course = mongoose.model('Course', CourseSchema);
var Review = mongoose.model('Review', ReviewSchema);

module.exports = User;
module.exports = Course;
module.exports = Review;
