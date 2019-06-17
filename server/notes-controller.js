
class NotesController {

    constructor(dao) {
        this.dao = dao;
    }
    //Helpers
    validateNote(note, checkForId){

        if(checkForId && !note.id || isNaN(note.id)){
            throw "Not a valid note. Id needed";
        }
        if(!note.completed || typeof note.completed !== 'string'){
            note.completed = 'false';
        } 
        if(note.completed!=='false' && note.completed!=='true' ){
            note.completed = 'false';
        }
        note.author = !note.author ? "":note.author;
        note.title = !note.title ? "":note.title;
        note.note = !note.note ? "":note.note;
        return note;
    }
    //GET
    async getAllNotes(req, res) {
        try {
            res.json(await this.dao.getAllNotes());
        } catch(e) {
            res.status(500).json(e);
        }
    }
    async getAllNotesFromAuthor(req, res) {
        try {
            if(req.params.author && req.params.author.length>0){
                res.json(await this.dao.getAllNotesFromAuthor(req.params.author));
            }
            res.status(404);       
            
        } catch(e) {
            res.status(500).json(e);
        }
    }
    async getAllCompletedNotes(req, res) {
        try {
            res.json(await this.dao.getAllCompletedNotes());
        } catch(e) {
            res.status(500).json(e);
        }
    }
    async getNoteById(req, res) {
        try {
            if(req.params.id && !isNaN(req.params.id)){
                res.json(await this.dao.getNoteById(req.params.id));
            }
            res.status(404);
        } catch(e) {
            res.status(500).json(e);
        }
    }
    //POST
    async addNote(req, res) {
        try {
            var note = null;
            try{               
                note = this.validateNote(req.body, false);
            }catch(e){
                res.status(400).json(e);
                return;
            }         
            res.json(await this.dao.addNote(note.author, note.note, note.title, note.completed));
        } catch(e) {
            console.log(e);
            res.status(500).json(e);
        }
    }
    //PUT
    async updateNote(req, res) {
        try {
            var note = null;
            try{
                console.log(req.body);
                note = this.validateNote(req.body,true);
            }catch(e){
                res.status(400).json(e);
                return;
            }  
            res.json(await this.dao.updateNote(note.id,note.author, note.note, note.title, note.completed));
        } catch(e) {
            console.log(e);
            res.status(500).json(e);
        }
    }
    //DELETE
    async deleteNote(req, res) {
        try {
            var note = null;
            try{
                note = this.validateNote({ id: req.params.id},true);
            }catch(e){
                res.status(400).json(e);
                return;
            }
            res.json(await this.dao.deleteNote(note.id));
        } catch(e) {
            res.status(500).json(e);
        }
    }
    async deleteAllNotes(req, res) {
        try {
            res.json(await this.dao.deleteAllNotes());
        } catch(e) {
            res.status(500).json(e);
        }
    }
}

module.exports = {
    NotesController
};
