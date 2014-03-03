(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('#newArtist').click(clickNewArtist);
    $('#newAlbum').click(clickNewAlbum);
    $('#newSong').click(clickNewSong);
  }

  function clickNewArtist(){
    $('#newArtistForm').toggleClass('hide');
  }

  function clickNewAlbum(){
    $('#newAlbumForm').toggleClass('hide');
  }

  function clickNewSong(){
    $('#newSongForm').toggleClass('hide');
  }

})();

