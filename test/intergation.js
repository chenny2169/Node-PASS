var should = require('should'),
	request = require('supertest'),
	app = require('../app.js'),
	mongoose = require('mongoose'),
	Todo = mongoose.model('coursesCollection'),
    agent = request.agent(app);
    
describe('Todo CRUD integration testing', function () {

	describe('Get all todo', function () {


		it('Should get status equal success and array of todo', function (done) {
			agent
			.get('/course')
			.set('Content-Type', 'application/json')
			.expect(200)
			.end(function(err, results){
                console.log(results.body.result)
				results.body.result[0].courseName.should.equal('SE');
				done();
			});
		});
		
	});
	



});