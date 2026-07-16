const playlistModel = require('../models/playlistModel');

class PlaylistService {
    async getAllPlaylists() {
        return await playlistModel.getAllPlaylists();
    }

    async getPlaylistMetadata(id) {
        const playlist = await playlistModel.getPlaylistMetadata(id);
        if (!playlist) {
            throw new Error(`Playlist with ID ${id} not found`);
        }
        return playlist;
    }

    async getPlaylistTracks(id) {
        const tracks = await playlistModel.getPlaylistTracks(id);
        if (!tracks || tracks.length === 0) {
            throw new Error(`No tracks found for playlist with ID ${id}`);
        }
        return tracks;
    }
}

module.exports = new PlaylistService();