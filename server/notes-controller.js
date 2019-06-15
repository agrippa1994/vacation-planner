
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
}

module.exports = {
    NotesController
};
