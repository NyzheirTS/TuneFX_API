const fs = require("fs");
const path = require("path");

const MUSIC_DIR = "/music";
const COVER_ART_DIR = "/cover_art";
const THUMBNAIL_DIR = "/thumbnail";

/**
 * Returns a readable stream for a track.
 */
function getTrackStream(trackId) {
    // validate trackId is a number
    if (!/^\d+$/.test(trackId)) {
        throw new Error("INVALID_TRACK_ID");
    }

    // Music files are stored as 6-digit filenames first 3 are folder whole 6 is the filename.
    const paddedId = String(trackId).padStart(6, "0");
    const folder = paddedId.substring(0, 3);

    const filePath = path.join(
        MUSIC_DIR,
        folder,
        `${paddedId}.mp3`
    );

    if (!fs.existsSync(filePath)) {
        throw new Error(`TRACK_NOT_FOUND: ${filePath}`);
    }

    return {
        mimeType: "audio/mpeg",
        stream: fs.createReadStream(filePath)
    };
}

/**
 * Returns the absolute path to a track's cover art.
 */
function getCoverArt(trackId) {
    // images are stored as cover_art_<trackId>.jpg in the COVER_ART_DIR
    if (!/^\d+$/.test(trackId)) {
        throw new Error("INVALID_TRACK_ID");
    }

    const filePath = path.join(
        COVER_ART_DIR,
        `cover_art_${trackId}.jpg`
    );

    if (!fs.existsSync(filePath)) {
        throw new Error(`COVER_NOT_FOUND: ${filePath}`);
    }

    return filePath;
}

function getThumbnail(trackId) {
    // images are stored as cover_thumb_<trackId>.webp in the THUMBNAIL_DIR
    if (!/^\d+$/.test(trackId)) {
        throw new Error("INVALID_TRACK_ID");
    }

    const filePath = path.join(
        THUMBNAIL_DIR,
        `cover_thumb_${trackId}.jpg`
    );

    if (!fs.existsSync(filePath)) {
        throw new Error(`THUMBNAIL_NOT_FOUND: ${filePath}`);
    }

    return filePath;
}

module.exports = {
    getTrackStream,
    getCoverArt,
    getThumbnail
};