"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
var chaiHttp = require("chai-http");
process.env.NODE_ENV = 'test';
var app_1 = require("../app");
var userModel_1 = require("../models/userModel");
var should = chai.use(chaiHttp).should();
describe('users', function () {
    beforeEach(function (done) {
        userModel_1.default.remove({}, function (err) {
            done();
        });
    });
    describe('Backend tests for users', function () {
        it('should get all the users', function (done) {
            chai.request(app_1.app)
                .get('/api/users')
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
        });
        it('should get users count', function (done) {
            chai.request(app_1.app)
                .get('/api/users/count')
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('number');
                res.body.should.be.eql(0);
                done();
            });
        });
        it('should create new user', function (done) {
            var newUser = new userModel_1.default({ username: 'Dave', email: 'dave@example.com', role: 'user' });
            chai.request(app_1.app)
                .post('/api/user')
                .send(newUser)
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.a.property('username');
                res.body.should.have.a.property('email');
                res.body.should.have.a.property('role');
                done();
            });
        });
        it('should get a user by its id', function (done) {
            var newUser = new userModel_1.default({ username: 'user', email: 'user@example.com', role: 'user' });
            newUser.save(function (error, newuser) {
                chai.request(app_1.app)
                    .get("/api/user/" + newuser.id)
                    .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('username');
                    res.body.should.have.property('email');
                    res.body.should.have.property('role');
                    res.body.should.have.property('_id').eql(newuser.id);
                    done();
                });
            });
        });
        it('should update a user by its id', function (done) {
            var newUser = new userModel_1.default({ username: 'user', email: 'user@example.com', role: 'user' });
            newUser.save(function (error, newuser) {
                chai.request(app_1.app)
                    .put("/api/user/" + newuser.id)
                    .send({ username: 'user 2' })
                    .end(function (err, res) {
                    res.should.have.status(200);
                    done();
                });
            });
        });
        it('should delete a user by its _id', function (done) {
            var newUser = new userModel_1.default({ username: 'user', email: 'user@example.com', role: 'user' });
            newUser.save(function (error, newuser) {
                chai.request(app_1.app)
                    .delete("/api/user/" + newuser.id)
                    .end(function (err, res) {
                    res.should.have.status(200);
                    done();
                });
            });
        });
    });
});
//# sourceMappingURL=users.spec.js.map