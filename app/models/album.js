'use strict';

module.exports = Album;
var albums = global.nss.db.collection('albums');
var songs = global.nss.db.collection('songs');
var Mongo = require('mongodb');
var fs = require('fs');
var path = require('path');

function Album(album){
  this._id = album._id ? Mongo.ObjectID(album._id.toString()) : album._id;
  this.name = album.name;
  this.relDate = album.relDate;
  this.songs = album.songs ? album.songs : [ 'placeholder' ];
  this.coverImage = album.coverImage ? album.coverImage : '/img/placeholder_album.jpg';
}

Album.prototype.addCover = function(oldpath){
  var dirname = this.name.replace(/\s/g, '').toLowerCase();
  var abspath = __dirname + '/../static';
  var relpath = '/audios/' + dirname;
  fs.mkdirSync(abspath + relpath);

  var extension = path.extname(oldpath);
  relpath += '/cover' + extension;
  fs.renameSync(oldpath, abspath + relpath);

  this.coverImage = relpath;
};

Album.prototype.insert = function(fn){
  albums.insert(this, function(err, record){
    fn(err, record);
  });
};

Album.findAll = function(fn){
  albums.find().toArray(function(err, records){
    fn(err, records);
  });
};

Album.findById = function(id, fn){
  var _id = Mongo.ObjectID(id.toString());
  albums.findOne({_id:_id}, function(err, records){
    fn(records);
  });
};

Album.findByName = function(name, fn){
  albums.findOne({name:name}, function(err, records){
    fn(records);
  });
};

//function returns all the songs in an array for the given album
Album.prototype.findSongs = function (fn){
  songs.find({'_id': { $in: this.songs}}).toArray(function(err, records){
    fn(records);
  });
};

/*
//This returns an array of songs associated with a particular album
//Grunt doenst like the function in the loop, dont know a way around this
//ERRORS HERE
Album.prototype.findSongs = function(fn){
  var songObjects = [];
  albums.find({'_id':this._id}, {'songs':1}).toArray(function(err, records){
    for(var i = 0; i < records.length; i++){
      songs.findOne({'_id': records[i]._id, function(err, song){
        songs.push(songObjects);
      });
      });
    }
    fn(songObjects);
  });
};
*/
