var sinon = require('sinon');
var mongoose = require('mongoose');
var should = require('should')
var request = require('supertest')
var app = require('../../app.js')
var agent = request.agent(app)
require('sinon-mongoose');
require('../../models/courses');

describe('List courseInfo', function () {
  let authenticatedSession;

  beforeEach(function (done) {
    agent.post('/login')
      .send({ studentID: '105598001', password: '1209' })
      .expect(302)
      .end(function (err, res) {
        if (err) return done(err);
        authenticatedSession = agent;
        done();
      });
  });

  afterEach(function (done) { 
    agent.get('/logout')
          .send()
          .expect(302)
          .end(function (err, res) {
            if (err) return done(err);
            done();
          });  
  });


  it('should show one course if there is only one course in CourseDB', function (done) {
    var course = mongoose.model('coursesCollection');
    var courseMock = sinon.mock(course);

    courseMock
      .expects('find')
      .withArgs({})
      .resolves([{
          "_id" : "5a09606a6ccb3f45f80a04f9",
          "courseID" : "091M40F",
          "courseName" : "SE",
          "instructor" : "liu",
          "classroom" : "1321",
          "__v" : 0
      }]);

    authenticatedSession
			.get('/course')
			.set('Content-Type', 'application/json')
			.end(function(err, results){
				courseMock.verify()
        courseMock.restore()
        results.body.result[0].courseName.should.equal('SE');
        results.body.result[0].instructor.should.equal('liu');
        results.body.result[0].classroom.should.equal('1321');
				done();
			});
  });
  
  it('should show corrsponse courses if there are manys courses in CourseDB', function (done) {
    var course = mongoose.model('coursesCollection');
    var courseMock = sinon.mock(course);

    courseMock
      .expects('find')
      .withArgs({})
      .resolves([
        {
          "_id" : "5a09606a6ccb3f45f80a04f9",
          "courseID" : "091M40F",
          "courseName" : "SE",
          "instructor" : "liu",
          "classroom" : "1321",
          "__v" : 0
        },
        {
          "_id" : "5a09606a6ccb3f45f80a04fa",
          "courseID" : "fhjklF",
          "courseName" : "POSD",
          "instructor" : "yc",
          "classroom" : "1234",
          "__v" : 0
        }
      ]);

    authenticatedSession
			.get('/course')
			.set('Content-Type', 'application/json')
			.end(function(err, results){
				courseMock.verify()
        courseMock.restore()
        results.body.result[0].courseName.should.equal('SE');
        results.body.result[0].instructor.should.equal('liu');
        results.body.result[0].classroom.should.equal('1321');
        results.body.result[1].courseName.should.equal('POSD');
        results.body.result[1].instructor.should.equal('yc');
        results.body.result[1].classroom.should.equal('1234');
				done();
			});

  });

});