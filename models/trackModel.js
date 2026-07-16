const db = require("../config/database");

class TrackModel {

    async getAllTracks() {
        const result = await db.query(`SELECT * FROM tracks`);
        return result.rows;
    }

    async getTrackById(id) {
        const query = ` 
            Select 
                t.track_id,
                t.date_created,
                t.genre_top,
                t.listens,
                t.duration,
                t.title,
                a.artist_name as artist_name,
                ab.title as album_title
            from tracks t
            join artist a on t.artist_id = a.artist_id
            join album ab on t.album_id = ab.album_id
            where t.track_id = $1
        `;

        const result = await db.query(query, [id]);
        return result.rows[0];
    }

}


module.exports = new TrackModel();