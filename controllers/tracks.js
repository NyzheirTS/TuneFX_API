const trackService = require('../services/trackService');

const trackList = async (req, res) => {
    try {
        const tracks = await trackService.getAllTracks();
        res.status(200).json(tracks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const getTrackById = async (req, res) => {
    try {
        const track = await trackService.getTrackById(req.params.id);
        res.status(200).json(track);
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: error.message });
    }
};


module.exports = {
    trackList,
    getTrackById
}