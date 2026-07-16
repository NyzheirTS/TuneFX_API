const mediaService = require('../services/mediaService');

const getTrackStream = async (req, res) => {
    try {
        const trackStream = await mediaService.getTrackStream(req.params.id);
        res.setHeader('Content-Type', trackStream.mimeType);
        res.setHeader('Accept-Ranges', 'bytes');
        trackStream.stream.pipe(res);
    } catch (error) {
        switch(error.message) {
            case 'INVALID_TRACK_ID':
                res.status(400).json({ error: error.message });
                break;
            case 'TRACK_NOT_FOUND':
                res.status(404).json({ error: error.message });
                break;
            default:
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

const getCoverArt = async (req, res) => {
    try {
        const trackId = req.params.id;
        const filePath = await mediaService.getCoverArt(trackId);

        res.sendFile(filePath);

    } catch (error) {
        switch(error.message) {
            case 'INVALID_TRACK_ID':
                res.status(400).json({ error: error.message });
                break;
            case 'COVER_NOT_FOUND':
                res.status(404).json({ error: error.message });
                break;
            default:
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

module.exports = {
    getTrackStream,
    getCoverArt
};  