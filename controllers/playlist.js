const playlistService = require('../services/playlistService');

const getAllPlaylists = async (req, res) => {
    try {
        const playlists = await playlistService.getAllPlaylists();
        res.status(200).json(playlists);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const getPlaylistMetadata = async (req, res) => {
    try {
        const playlist = await playlistService.getPlaylistMetadata(req.params.id);
        res.status(200).json(playlist);
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: error.message });
    }
};

const getPlaylistTracks = async (req, res) => {
    try {
        const tracks = await playlistService.getPlaylistTracks(req.params.id);
        res.status(200).json(tracks);
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: error.message });
    }
};

module.exports = {
    getAllPlaylists,
    getPlaylistMetadata,
    getPlaylistTracks
};