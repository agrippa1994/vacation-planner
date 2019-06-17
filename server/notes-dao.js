
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
                title TEXT,
                note TEXT,
                completed BOOL
            )
        `);
    }
    //CREATE
    async addNote(author, note, title, completed) {
        return await this.db.allAsync(`
            INSERT INTO
                note(author, note, title, completed)
            VALUES (?, ?, ?, ?)`, [author, note, title, completed]);
    }
    //READ
    async getAllNotes() {
        return await this.db.allAsync(`
            SELECT
                *
            FROM note
        `);
    }
    async getAllNotesFromAuthor(author) {
        return await this.db.allAsync(`
            SELECT
                *
            FROM note
            WHERE author = '`+author+`'
        `);
    }
    async getAllCompletedNotes() {
        return await this.db.allAsync(`
            SELECT
                *
            FROM note
            WHERE completed = 'true'
        `);
    }
    //UPDATE
    async updateNote(id,author, note, title, completed) {
        var updateStatement = `UPDATE notes `;
        if(author){
            updateStatement+= `SET author = '`+author+`'`;
        }
        if(note){
            updateStatement+= `SET note = '`+note+`'`;
        }
        if(title){
            updateStatement+= `SET title = '`+title+`'`;
        }
        if(completed){
            updateStatement+= `SET completed = '`+completed+`'`;
        }
        if(id){
            updateStatement+= `WHERE id = '`+id+`'`;
        }
        return await this.db.allAsync(updateStatement);
    }
    //DELETE
    async deleteAllNotes() {
        return await this.db.allAsync(`
        DELETE FROM note
        `);
    }
    async deleteNote(id) {
        return await this.db.allAsync(`
        DELETE FROM note
        WHERE id = '`+id+`'
        `);
    }
    
    
}

module.exports =  {
    NotesDao
};
