'use strict';

var Artist = require('../models/artist');
var Song = require('../models/song');
var Album = require('../models/album');

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
  Artist.findById(Id, function(record){
    res.render('home/artist', {title: record.name, artist: record});
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
  album.addCover(req.files.cover.path);
  album.insert(function(){
    res.redirect('artist/'+req.body.id);
  });
};
