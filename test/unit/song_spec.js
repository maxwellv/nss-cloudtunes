'use strict';
process.env.DBNAME ='cloudtunes-test';
var expect = require('chai').expect;
var Song;

describe('Song', function(){

  before(function(done){
    var initMongo = require('../../app/lib/init-mongo');
    initMongo.db(function(){
      Song = require('../../app/models/song');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      done();
    });
  });

  describe('new', function(){
    it('should create a new Song object', function(){
      var obj ={};
      obj.name ='Thriller';
      obj.genre = 'Pop';
      obj.song = 'test.mp3';
      var s1 = new Song(obj);
      expect(s1).to.be.instanceof(Song);
      expect(s1.file).to.equal('test.mp3');
      expect(s1.genre).to.equal('Pop');
    });
  });
});
