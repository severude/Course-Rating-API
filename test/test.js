const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const expect = require('chai').expect;
const sinon = require('sinon');
const User = require('../src/models').User;

describe('Verify user credentials', () => {

    before( (done) => {
        // Note: Mongod must be running for this to work!
        mongoose.connect("mongodb://localhost:27017/course-api", { useNewUrlParser: true } );

        // Verify mongo database connection
        mongoose.connection
            .once("open", () => {
                console.log("Mongo database connection successful");
                done();
            })
            .on("error", (err) => {
                console.error("Mongo database connection error:", err);
            });

        // Drop all users from database
        mongoose.connection.collections.users.drop(() => {});

        // Create a user object for testing
        const testUser = new User({
            fullName: "John Adams",
            emailAddress: "john@adams.com",
            password: "password"
        });

        // Save user object to database
        testUser.save((err) => {
            if(err) throw err;
        });
    });

    it('should return corresponding user document with correct user credentials', () => {
    });

    it('should return 401 error with incorrect user credentials', () => {
    });

    after( (done) => {
        mongoose.disconnect();
        console.log('Test suite completed');
        done();
    });    
});