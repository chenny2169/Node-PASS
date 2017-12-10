var sinon = require('sinon');
var mongoose = require('mongoose');
var should = require('should')
var request = require('supertest')
var app = require('../../app.js')
var agent = request.agent(app)
require('sinon-mongoose');
require('../../models/homework');


describe('show homework belong to specific course ', function () {

  it('should show one homework info if there is only one homework in HWDB ', function (done) {
    var homework = mongoose.model('hwCollection');
    var homeworkMock = sinon.mock(homework);

    homeworkMock
      .expects('find')
      .withArgs({'courseName':'SE'})
      .resolves([{
          "_id" : "5a0e577a82cdf43790cc1572",
          "courseName" : "SE",
          "homeworkName" : "1",
          "dueDate" : "1209",
          "percentage" : "10",
          "homeworkDescription" : "THIS IS HW1",
          "__v" : 0,
           "dueDateExtension": "false"
      }]);

    agent
			.get('/hw/SE')
			.set('Content-Type', 'application/json')
			.end(function(err, results){
				homeworkMock.verify()
        homeworkMock.restore()
        results.body.result[0]._id.should.equal('5a0e577a82cdf43790cc1572')
        results.body.result[0].courseName.should.equal('SE');
        results.body.result[0].homeworkName.should.equal('1');
        results.body.result[0].dueDate.should.equal('1209');
				results.body.result[0].percentage.should.equal('10');
        results.body.result[0].homeworkDescription.should.equal('THIS IS HW1');
        done();
			});
  });

  it('should show more than one homework infos if there are many homeworks in HWDB ', function (done) {
    var homework = mongoose.model('hwCollection');
    var homeworkMock = sinon.mock(homework);

    homeworkMock
      .expects('find')
      .withArgs({'courseName':'SE'})
      .resolves([
        {
          "_id" : "5a0e577a82cdf43790cc1572",
          "courseName" : "SE",
          "homeworkName" : "1",
          "dueDate" : "1209",
          "percentage" : "10",
          "homeworkDescription" : "THIS IS HW1",
          "__v" : 0,
           "dueDateExtension": "false"
        } ,
        {
          "_id" : "5a192fc816aaff184898dfe9",
          "courseName" : "SE",
          "homeworkName" : "2",
          "dueDate" : "1209",
          "percentage" : "10",
          "homeworkDescription" : "THIS IS HW2",
          "__v" : 0,
           "dueDateExtension": "true"
        }
      ]);
 
    agent
			.get('/hw/SE')
			.set('Content-Type', 'application/json')
			.end(function(err, results){
				homeworkMock.verify()
        homeworkMock.restore()
        
        results.body.result[0]._id.should.equal('5a0e577a82cdf43790cc1572')
        results.body.result[0].courseName.should.equal('SE');
        results.body.result[0].homeworkName.should.equal('1');
        results.body.result[0].dueDate.should.equal('1209');
				results.body.result[0].percentage.should.equal('10');
        results.body.result[0].homeworkDescription.should.equal('THIS IS HW1');
 
        results.body.result[1]._id.should.equal('5a192fc816aaff184898dfe9')
        results.body.result[1].courseName.should.equal('SE');
        results.body.result[1].homeworkName.should.equal('2');
        results.body.result[1].dueDate.should.equal('1209');
				results.body.result[1].percentage.should.equal('10');
        results.body.result[1].homeworkDescription.should.equal('THIS IS HW2');
  
        done();
			});
  });
  
  it('should not show homework info if there is no homework in HWDB ', function (done) {
    var homework = mongoose.model('hwCollection');
    var homeworkMock = sinon.mock(homework);

    homeworkMock
      .expects('find')
      .withArgs({'courseName':'SE'})
      .resolves([]);

    agent
      .get('/hw/SE')
      .set('Content-Type', 'application/json')
      .end(function(err, results){
        homeworkMock.verify()
        homeworkMock.restore()
        results.body.result.should.be.empty()
        done();
      });
  });
  
});

describe('edit for homework infos', function() {
  it('should update the homework info if i edit it', function(done){
      var homework = mongoose.model('hwCollection');
      var homeworkMock = sinon.mock(homework);

    homeworkMock
      .expects('findOneAndUpdate')
      .withArgs({"_id":'5a0e577a82cdf43790cc1572'}, {$set:
        {
            homeworkName : "6",
            dueDate : "1211", 
            percentage : "1", 
            fileExtension : "txt", 
            homeworkDescription : "this is hw1",
            dueDateExtension : "false"
        }
    },{ new: true })
      .resolves([
        {
          "homeworkName" : "6",
          "dueDate" : "1211",
          "percentage" : "10",
          "fileExtension" : "txt", 
          "homeworkDescription" : "this is hw1",
          "dueDateExtension": "false"
        }
      ]);

    agent
			.post('/hw/editHW?homework_uuid=5a0e577a82cdf43790cc1572')
      .send( {
            homeworkName : "6",
            dueDate : "1211", 
            percentage : "1", 
            fileExtension : "txt", 
            homeworkDescription : "this is hw1",
            dueDateExtension : "false"
        })
			.set('Content-Type', 'application/json')
			.end(function(err, results){
				homeworkMock.verify()
        homeworkMock.restore()
        
        results.body.result[0].homeworkName.should.equal('6')
        results.body.result[0].dueDate.should.equal('1211')
        results.body.result[0].percentage.should.equal('10')
        results.body.result[0].fileExtension.should.equal('txt')
        results.body.result[0].homeworkDescription.should.equal('this is hw1')
        results.body.result[0].dueDateExtension.should.equal('false')
        done();
			});
  })
})