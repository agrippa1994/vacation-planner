
class NotesDao {
    constructor(db) {
        this.db = db;
    }

    async init() {
        await this.db.runAsync(`
            CREATE TABLE IF NOT EXISTS note
            (
                id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                author TEXT,
                title TEXT,
                note TEXT,
                completed BOOL
            )
        `);
    }
    //CREATE
    async addNote(author, note, title, completed) {
        console.log(author, note, title, completed);
        return await this.db.runAsync(`
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
    async getNoteById(id) {
        return await this.db.allAsync(`
            SELECT
                *
            FROM note
            WHERE id = '`+id+`'
        `);
    }
    //UPDATE
    async updateNote(id,author, note, title, completed) {
        var updateStatement = `UPDATE note SET `;
        if(author){
            updateStatement+= `author = '`+author+`',`;
        }
        if(note){
            updateStatement+= `note = '`+note+`',`;
        }
        if(title){
            updateStatement+= `title = '`+title+`',`;
        }
        if(completed){
            updateStatement+= `completed = '`+completed+`',`;
        }
        updateStatement = updateStatement.substr(0,updateStatement.length-1);
        if(id && !updateStatement.endsWith('SET')){
            updateStatement+= ` WHERE id = '`+id+`' `;
            console.log(updateStatement);
            return await this.db.runAsync(updateStatement);        
        }
        throw "No valid note to update";
        
    }
    //DELETE
    async deleteAllNotes() {
        return await this.db.runAsync(`
        DELETE FROM note
        `);
    }
    async deleteNote(id) {
        return await this.db.runAsync(`
        DELETE FROM note
        WHERE id = '`+id+`'
        `);
    }
    
    
}

module.exports =  {
    NotesDao
};
