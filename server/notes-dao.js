
class NotesDao {
    constructor(db) {
        this.db = db;
    }

    async init() {
        await this.db.runAsync(`
            CREATE TABLE IF NOT EXISTS note
            (
                id INTEGER PRIMARY KEY,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                username TEXT,
                note TEXT
            )
        `);
    }

    async getAllNotes() {
        return await this.db.allAsync(`
            SELECT
                id, username, note, strftime('%s', timestamp) as timestamp
            FROM note
        `);
    }

    async addNote(username, note) {
        return await this.db.allAsync(`
            INSERT INTO
                note(id, username, note)
            VALUES (NULL, ?, ?)`, [username, note]);
    }

    async deleteNote(id) {
        return await this.db.allAsync(`
            DELETE FROM note
            WHERE id = ?`, [id]);
    }

    async updateNote(id, username, note) {
        return await this.db.allAsync(`
            UPDATE
                note
            SET
                username = ?,
                note = ?,
                timestamp = datetime('now')
            WHERE
                id = ?
            `, [username, note, id]);
    }
}

module.exports =  {
    NotesDao
};
