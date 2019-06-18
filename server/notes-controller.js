
class NotesController {

    constructor(dao) {
        this.dao = dao;
    }

    async getAllNotes(req, res) {
        try {
            res.json(await this.dao.getAllNotes());
        } catch(e) {
            res.status(500).json(e);
        }
    }

    async addNote(req, res) {
        try {
            if(!req.body || !("username" in req.body) || !("note" in req.body))
                return res.status(400).end();

            await this.dao.addNote(req.body.username, req.body.note);
            res.status(201).end();
        }
        catch(e) {
            res.status(500).json(e);
        }
    }

    async deleteNote(req, res) {
        try {
            await this.dao.deleteNote(req.params.id);
            res.status(200).end();
        }
        catch(e) {
            res.status(500).json(e);
        }
    }

    async updateNote(req, res) {
        try {
            if(!req.body || !("username" in req.body) || !("note" in req.body))
                return res.status(400).end();

            await this.dao.updateNote(req.params.id, req.body.username, req.body.note);
            res.status(200).end();
        }
        catch(e) {
            console.error(e);
            res.status(500).json(e);
        }
    }
}

module.exports = {
    NotesController
};
