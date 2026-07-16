const trackModel = require("../models/trackModel");

class TrackService {
    async getTrackById(id) {
        const track = await trackModel.getTrackById(id);
        if (!track) {
            throw new Error(`Track with ID ${id} not found`);
        }

        return {
            track_id: track.track_id,
            date_created: track.date_created,
            genre_top: track.genre_top,
            listens: track.listens,
            duration: track.duration,
            title: track.title,
            artist_name: track.artist_name,
            album_title: track.album_title
        };
    }

    async getAllTracks() {
        return await trackModel.getAllTracks();
    }
}

module.exports = new TrackService();