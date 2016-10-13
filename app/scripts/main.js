/**
 *  mg-audioPlayer
 *  (c) elizabeth nothrup <elizabethnorthrup415@gmail.com>
 */
(function() {
  'use strict';
  // Define the `marysApp` module
  angular
    .module('marysMusicApp', [])
    .factory('QueueService', QueueService)
    .controller('musicPlaylist', musicPlaylist)
    .controller('musicPlayer', musicPlayer);

})();


/**
 * @namespace musicPlaylist
 * @desc application music playlist controller
 * @memberOf Controllers
 */
function musicPlaylist($scope, QueueService, $rootScope) {
  'use strict';
  $scope.playlist = [];
  $scope.onSongClick = onSongClick;
  $scope.songSlected = null;
  activate();

  $scope.$on('songChange', function(event, song) {
    $scope.songSlected = song;
  });

  function onSongClick(songIndex) {
    QueueService.songChange(songIndex);
  }

  function activate() {
    $scope.playlist = QueueService.all();
    console.log($scope.playlist);
  }
}



/**
 * @namespace musicPlayer
 * @desc application music player
 * @memberOf Controllers
 */
function musicPlayer($scope, $document, QueueService) {
  'use strict';
  $scope.currentSong;
  $scope.playSong = playSong; 
  $scope.pauseSong = pauseSong;
  $scope.muteVolume = muteVolume;
  $scope.unmuteVolume = unmuteVolume;
  $scope.nextSong = nextSong;
  $scope.previousSong = previousSong;
  $scope.showMuteButton = true;
  $scope.showPlayButton = true;
  activate();
  var audioPlayer;
  
  $scope.$on('songChange', function(event, song) {
    playSong(song);
  });
  

  //Function I create to play music urls
  function loadSongByUrl(songUrl) {
    audioPlayer.src = songUrl;
  }
  
  //function I create to play music when I click the play button
  function playSong(song) {
    console.log(song);
    if(song) {
      $scope.songSlected = song;
      $scope.currentSong = song;
      loadSongByUrl(song.songUrl);
    }
    audioPlayer.play();
    $scope.showPlayButton = false;
  }
  
  //function I create to pause music when I click the pause button
  function pauseSong() {
    audioPlayer.pause();
    $scope.showPlayButton = true;      
  }
  
  //function I create to mute volume when I click the mute button
  function muteVolume() {
    audioPlayer.volume = 0.0;
    $scope.showMuteButton = false;
  }
  
  //function I create to un-mute volume when I click the unmute button
  function unmuteVolume() {
    audioPlayer.volume = 1.0;
    $scope.showMuteButton = true;
  }

  function nextSong() {
    QueueService.next();
  }

  function previousSong() {
    QueueService.previous();
  }

      

  function activate() {
    // create audio object to play music
    audioPlayer = $document[0].createElement('audio');
    console.log(audioPlayer);
    // refrence from w3 schools on html5 audio player
    //    http://www.w3schools.com/tags/ref_av_dom.asp
  }
  

}


/**
 * @namespace musicPlayer
 * @desc QueueService
 * @memberOf Services
 */
function QueueService($rootScope) {
  'use strict';
  var index = 0;
  var currentSong;
  var queue = [ 
    {
      songUrl: 'https://firebasestorage.googleapis.com/v0/b/lizbizz-af753.appspot.com/o/01_boyfriend.mp3?alt=media&token=7ff76be9-8088-40ee-9709-3745dbebcdc1',
      album:'Boyfriend',
      title:'Boyfriend',
      artist:'Best Coast',
      albumCover: 'https://firebasestorage.googleapis.com/v0/b/lizbizz-af753.appspot.com/o/bestcoast.jpg?alt=media&token=efc16796-acd5-4d07-8b90-0b723f2deaa7'
    },
    {
      songUrl: 'https://firebasestorage.googleapis.com/v0/b/lizbizz-af753.appspot.com/o/02_building_with.mp3?alt=media&token=73541767-1331-4145-ba0e-f1c4802afac5',
      album:'Entroducing',
      title:'Building steam with a grain of salt',
      artist:'DJ Shadow',
      albumCover:'https://firebasestorage.googleapis.com/v0/b/lizbizz-af753.appspot.com/o/entroducing.jpg.jpg?alt=media&token=bfe3cb9e-8876-4ad1-94b5-79d019ed11a4'
    },
    {
      songUrl: 'https://firebasestorage.googleapis.com/v0/b/lizbizz-af753.appspot.com/o/03_plus.mp3?alt=media&token=83a32059-f59e-426c-8173-2c2c6aa7af81',
      album:'At Play vol.3',
      title:'Plus',
      artist:'Deadmau5',
      albumCover:'https://firebasestorage.googleapis.com/v0/b/lizbizz-af753.appspot.com/o/deadmau5.jpg.jpg?alt=media&token=261e0048-d3ee-4803-a673-bb69da460ae0',
    }];
  return {
    all: all,
    songChange: songChange,
    next: next,
    previous: previous
  };

  function next() {
    index = index + 1;
    if (index >= queue.length) {
      index = 0;
    }
    console.log('index - ' + index);
    $rootScope.$broadcast('songChange', queue[index]);
  }

  function previous() {
    index = index - 1;
    if (index < 0) {
      index = (queue.length - 1);
    }
    console.log('index - ' + index);
    $rootScope.$broadcast('songChange', queue[index]);
  }

  function songChange(song) {
    index = queue.indexOf(song);
    console.log('index - ' + index);
    $rootScope.$broadcast('songChange', song);
  }
  
  function all() {
    return queue;
  }

}
