const express = require('express');
const router = express.Router();

const trackController = require('../controllers/tracks');
const playlistController = require('../controllers/playlist');
const mediaController = require('../controllers/media');


// Define routes for tracks
router
    .get('/tracks', trackController.trackList) // Route to get all tracks
    .get('/tracks/:id', trackController.getTrackById) // Route to get a specific track by ID


router
    .get('/playlists', playlistController.getAllPlaylists) // Route to get all playlists
    .get('/playlists/:id', playlistController.getPlaylistMetadata) // Route to get playlist metadata by ID
    .get('/playlists/:id/tracks', playlistController.getPlaylistTracks); // Route to get tracks of a specific playlist by ID

router
    .get('/stream/:id', mediaController.getTrackStream) // Route to stream a track by ID
    .get('/image/:id', mediaController.getCoverArt) // Route to get cover art for a track by ID
    .get('/thumbnail/:id', mediaController.getThumbnail); // Route to get thumbnail for a track by ID

module.exports = router;