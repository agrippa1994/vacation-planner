
class NotesController {

    constructor(dao) {
        this.dao = dao;
    }
    //Helpers
    async validateNote(note, checkForId = false){
        console.log(note);
        if(checkForId && note.id){
            throw "Not a valid note. Id needed";
        }
        if(!note.completed || typeof note.completed !== 'string'){
            note.completed = 'false';
        } 
        if(note.completed!=='false' && note.completed!=='true' ){
            note.completed = 'false';
        }
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
    //POST
    async addNote(req, res) {
        try {
            console.log(req.body);
            var note = null;
            try{
                note = validateNote(req.body);
            }catch(e){
                console.log(e);
                res.status(400).json(e);
                return;
            }         
            res.json(await this.dao.addNote(note.author, note.note, note.title, note.completed));
        } catch(e) {
            res.status(500).json(e);
        }
    }
    //PUT
    async updateNote(req, res) {
        try {
            var note = null;
            try{
                note = validateNote(req.body,true);
            }catch(e){
                res.status(400).json(e);
                return;
            }  
            res.json(await this.dao.updateNote(note));
        } catch(e) {
            res.status(500).json(e);
        }
    }
    //DELETE
    async deleteNote(req, res) {
        try {
            var note = null;
            try{
                note = validateNote(req.body,true);
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
