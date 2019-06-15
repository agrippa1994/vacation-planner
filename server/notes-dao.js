
class NotesDao {
    constructor(db) {
        this.db = db;
    }

    async init() {
        await this.db.runAsync(`
            CREATE TABLE IF NOT EXISTS note
            (
                id ROWID,
                author TEXT,
                note TEXT,
                completed BOOL
            )
        `);
    }

    async getAllNotes() {
        return await this.db.allAsync(`
            SELECT
                *
            FROM note
        `);
    }

    async addNote(autor, note, completed) {
        return await this.db.allAsync(`
            INSERT INTO
                note(author, note, completed)
            VALUES (?, ?, ?)`, [author, note, completed]);
    }
}

module.exports =  {
    NotesDao
};
