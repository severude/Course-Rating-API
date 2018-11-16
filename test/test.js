const express = require('express');
const mongoose = require("mongoose");
const mid = require('../src/middleware');
mongoose.Promise = global.Promise;
const expect = require('chai').expect;
const User = require('../src/models').User;
const request = require('superagent');
const app = express();

describe('Verify user credentials', () => {

    const userCredentials = {
        emailAddress: "john@adams.com", 
        password: "password"
    }
    const badCredentials = {
        emailAddress: "jon@adams.com", 
        password: "password"
    }

    before( (done) => {
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
        request.agent(app)
            .get('/api/users')
            .send(userCredentials)
            .end((err, res) => {
                if(err) throw err;
                expect(res.statusCode).to.equal(200);
                done();
            });
    });

    it('should return 401 error with incorrect user credentials', () => {
        request.agent(app)
            .get('/api/users')
            .send(badCredentials)
            .end((err, res) => {
                if(err) throw err;
                expect(res.statusCode).to.equal(401);
                done();
            });
    });

    after( (done) => {
        mongoose.disconnect();
        console.log('Test suite completed');
        done();
    });    
});