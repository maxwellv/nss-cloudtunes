'use strict';

var d = require('../lib/request-debug');
var initialized = false;

module.exports = function(req, res, next){
  if(!initialized){
    initialized = true;
    load(req.app, next);
  }else{
    next();
  }
};

function load(app, fn){
  var home = require('../routes/home');

  app.get('/', d, home.index);
  app.get('/artist/:id', d, home.show);
  app.post('/artist', d, home.createArtist);
  app.post('/album', d, home.createAlbum);
  console.log('Routes Loaded');
  fn();
}

