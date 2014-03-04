'use strict';

var Mongo = require('mongodb');
var Artist = require('../models/artist');
var Song = require('../models/song');
var Album = require('../models/album');
var _ = require('lodash');

exports.index = function(req, res){
  Artist.findAll(function(artists){
    console.log(artists);
    res.render('home/home', {title: 'Cloud Tunes', artists:artists});
  });
};

exports.artist = function(req, res){
  res.render('home/artist', {title: 'Artist List', artistID:req.params.id});
};

exports.createArtist = function(req, res){
  var artist = new Artist(req.body);
  if (req.files.cover.name === ''){
    artist.addCover(undefined);
  } else {
    artist.addCover(req.files.cover.path);
  }

  artist.insert(function(){
    res.redirect('/');
  });
};

exports.show = function(req, res){
  var Id = req.params.id.toString();
  Artist.findById(Id, function(artist){
    _.extend(artist, Artist.prototype);
    artist.findAlbums(function(albums){
      console.log('ARTIST ALBUMS:');
      console.log(albums);
      var firstAlbum = albums[0];
      _.extend(firstAlbum, Album.prototype);
      //test with one album
      firstAlbum.findSongs(function(songs){
        res.render('home/artist', {title: artist.name, artist: artist, albums: albums, songs: songs});
      });
    });
  });
};

exports.createSong = function(req, res){
  var song = new Song(req.body);
  song.insert(function(){
    res.redirect('artist/'+req.body.id);
  });
};

exports.createAlbum = function(req, res){
  var album = new Album(req.body);
  var artistId = Mongo.ObjectID(req.body.id);
  album.addCover(req.files.cover.path);
  album.insert(function(err, record){
    record = record[0];
    Album.findByName(record.name, function(foundAlbum){
      Artist.findById(artistId, function(foundArtist){
        foundArtist = new Artist(foundArtist);
        if (foundArtist.albums[0] === 'placeholder'){
          foundArtist.albums = [foundAlbum._id.toString()];
        } else {
          foundArtist.albums.push(foundAlbum._id.toString());
        }
        foundArtist.update(function(){
          res.redirect('artist/'+req.body.id);
        });
      });
    });
  });
};
