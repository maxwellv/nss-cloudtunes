'use strict';
//model

module.exports = Song;
//var fs = require('fs');
//var path = require('path');
var songs = global.nss.db.collection('songs');
//var Mongo = require('mongodb');

function Song(object){
  this.name = object.name;
  this.file = object.song;
  this.genre = object.genre;
}

Song.prototype.insert = function(fn){
  songs.insert(this, function(err, record){
    fn(err);
  });
};
