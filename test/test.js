const mongoose = require('mongoose');
const expect = require('chai').expect;
const assert = require('assert');
const User = require('../src/models').User;
const request = require('supertest');
const app = require('../src/index.js');

describe('Verify Project Setup', () => {

    it('should have Mocha and Chai installed for testing', function () {
        expect(true).to.be.ok;
    });

    it('should verify that it can connect to the app', function(done) {
        request(app).get('/')
            .expect(200, {"message": "Welcome to the Course Review API" }, done);
    });

});

// Make requests to /api/users with good and bad credentials for a known user
describe('Verify user credentials', () => {

    // Before testing it should connect to the database
    before( function(done) {
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
    });

    // After testing drop all users and disconnect from the database
    after( function(done) {
        mongoose.connection.collections.users.drop(() => {});
        mongoose.disconnect();
        console.log('Test suite completed');
        done();
    });    

    it('should create a test user', function (done) {
        // Create a user object for testing
        const testUser = new User({
            fullName: "John Adams",
            emailAddress: "john@adams.com",
            password: "password"
        });
        // Save user object to database
        testUser.save().then(function() {
            assert(!testUser.isNew);
            done();
        });
    });

    it('should return 401 error with incorrect user credentials', function(done) {
        request(app)
            .get('/api/users')
            .auth('jon@adams.com', 'password')
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(401);
                done();
            });
    });

    it('should return corresponding user document with correct user credentials', function(done) {
        request(app)
            .get('/api/users')
            .auth('john@adams.com', 'password')
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(200);
                expect(res.body._id).to.exist;
                expect(res.body.fullName).to.be.equal('John Adams');
                expect(res.body.emailAddress).to.be.equal('john@adams.com');
                expect(res.body.password).to.exist;
                done();
            });
    });

});