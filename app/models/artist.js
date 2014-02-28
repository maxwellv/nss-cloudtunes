'use strict';

module.exports = Artist;
var artists = global.nss.db.collection('artists');
var Mongo = require('mongodb');
var fs = require('fs');
var path = require('path');

function Artist(artist){
  this._id = artist._id ? Mongo.ObjectID(artist._id.toString()) : artist._id;
  this.name = artist.name;
  this.albums = artist.albums ? artist.albums : [ 'placeholder' ];
  this.coverImage = artist.coverImage ? artist.coverImage : '/img/placeholder_album.jpg';
}

Artist.prototype.addCover = function(oldpath){
  if (oldpath === undefined){
    var placeholder = __dirname + '/../static/img/placeholder_album.jpg';
    oldpath = __dirname + '/../static/img/placeholder_album_copy.jpg';
    fs.createReadStream(placeholder).pipe(fs.createWriteStream(oldpath));
  }
  var dirname = this.name.replace(/\s/g,'').toLowerCase();
  var abspath = __dirname + '/../static';
  var relpath = '/img/' + dirname;
  fs.mkdirSync(abspath + relpath);

  var extension = path.extname(oldpath);
  relpath += '/cover' + extension;
  fs.renameSync(oldpath, abspath + relpath);

  this.coverImage = relpath;
};

Artist.prototype.insert = function(fn){
  artists.insert(this, function(err, record){
    fn(err, record);
  });
};

Artist.findAll = function(fn){
  artists.find().toArray(function(err, records){
    fn(records);
  });
};

Artist.findById = function(id, fn){
  var _id = Mongo.ObjectID(id.toString());
  artists.findOne({_id:_id}, function(err, artist){
    fn(artist);
  });
};

