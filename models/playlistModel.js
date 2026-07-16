const db = require("../config/database");

class PlaylistModel {
    async getAllPlaylists() {
        const result = await db.query(`SELECT * FROM playlist`);
        return result.rows;
    }

    async getPlaylistMetadata(id) {
        const result = await db.query(`SELECT * FROM playlist WHERE playlist_id = $1`, [id]);
        return result.rows[0];
    }

    async getPlaylistTracks(id) {
        const query = `
        Select 
            t.track_id,
            t.date_created,
            t.genre_top,
            t.listens,
            t.duration,
            t.title,
            a.artist_name as artist_name,
            ab.title as album_title,
            pt.track_order as playorder
        from playlist_tracks pt
        join tracks t
            on pt.track_id = t.track_id
        join artist a
            on t.artist_id = a.artist_id
        left join album ab
            on t.album_id = ab.album_id
        where pt.playlist_id = $1
        order by pt.track_order;
        `;

        const result = await db.query(query, [id]);
        return result.rows;
    }
}

module.exports = new PlaylistModel();