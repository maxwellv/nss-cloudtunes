'use strict';
process.env.DBNAME= 'cloudtunes-test';
var expect = require('chai').expect;
//var exec = require('child_process').exec;
//var fs = require('fs');
var Artist;
describe('Artist', function(){

  before(function(done){
    var initMongo = require('../../app/lib/init-mongo');
    initMongo.db(function(){
      Artist = require('../../app/models/artist');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      done();
    });
  });

  describe('new', function(){
    it('should create a new Artist object', function(){
      var obj ={};
      obj.name = 'Michael Jackson';
      obj.albums = [];
      var a1 = new Artist(obj);
      expect(a1).to.be.instanceof(Artist);
      expect(a1.name).to.equal('Michael Jackson');
      expect(a1.albums).to.have.length(0);
    });
  });

  describe('#insert', function(){
    it('should insert an artist into the databbase', function(done){
      var obj ={};
      obj.name = 'Michael Jackson';
      obj.albums = [];
      var a1 = new Artist(obj);
      a1.insert(function(err){
        expect(err).to.equal(null);
        expect(a1).to.have.property('_id');
        expect(a1._id.toString()).to.have.length(24);
        done();
      });
    });
  });


});


