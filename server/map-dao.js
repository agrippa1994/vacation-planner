
class MapDao {

    constructor(db) {
        this.db = db;
    }

    async init() {
        await this.db.runAsync(`
            CREATE TABLE IF NOT EXISTS position
            (
                username TEXT UNIQUE,
                timestamp INTEGER,
                longitude REAL,
                latitude REAL
            )
        `);
    }

    async updatePositionForUser(username, timestamp, longitude, latitude) {
        return await this.db.runAsync(`
            INSERT OR REPLACE INTO
                position(username, timestamp, longitude, latitude)
            VALUES
                (?, ?, ?, ?)
        `, [username, timestamp, longitude, latitude]);
    }

    async getAllPositions() {
        return await this.db.allAsync(`
            SELECT * FROM position
        `);
    }
}

module.exports = { MapDao };
