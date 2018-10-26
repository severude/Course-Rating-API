'use strict';
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
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

// Hash password before saving to database
UserSchema.pre('save', function(next) {
    let user = this;
    bcrypt.hash(user.password, 10, function(err, hash) {
        if(err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});

//Authenticate input against database documents
UserSchema.statics.authenticate = function( email, password, callback){
	User.findOne( {email: email} )
		.exec(function(error, user){
			if(error) {
				return callback(error);
			} else if (!user) {
				var err = new Error('User not found.');
				err.status = 401;
				return callback(err);
            }
            bcript.compare(password, user.password, function(error, result){
                if(result === true) {
                    return callback(null, user);
                } else {
                    return callback();
                }
            });
    	});
}

const ReviewSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
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

const CourseSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
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
    reviews: [{
        type: Schema.ObjectId,
        ref: 'Review'
    }]
});

const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);
const Review = mongoose.model('Review', ReviewSchema);

module.exports.User = User;
module.exports.Course = Course;
module.exports.Review = Review;
