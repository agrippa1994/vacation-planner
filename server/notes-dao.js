
class NotesDao {
    constructor(db) {
        this.db = db;
    }

    async getAllNotes() {
        return await this.db.allAsync("SELECT * FROM note");
    }
}

module.exports =  {
    NotesDao
};
