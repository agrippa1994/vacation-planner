
const express = require("express");
const bodyParser = require("body-parser");
const util = require("util");
const app = express();
const expressWs = require("express-ws")(app);
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const { Controller } = require("./controller");
const { NotesController } = require("./notes-controller");
const { NotesDao } = require("./notes-dao");

async function bootstrap() {
    const db = new sqlite3.Database("./db.sqlite3");

    // promisify DB
    db.allAsync = util.promisify(db.all);
    db.runAsync = util.promisify(db.run);

    // create DAO objects (data access object)
    const notesDao = new NotesDao(db);

    // initalize DAOs (creating tables and so on)
    await notesDao.init();

    // create controllers
    const notesController = new NotesController(notesDao);

    // connect routes with controller methods
    const apiRouter = express.Router();
    apiRouter.get("/notes", notesController.getAllNotes.bind(notesController));
    apiRouter.get("/notes/completed", notesController.getAllCompletedNotes.bind(notesController));
    apiRouter.get("/notes/author/:author", notesController.getAllNotesFromAuthor.bind(notesController));

    apiRouter.post("/notes", notesController.addNote.bind(notesController));
    apiRouter.put("/notes", notesController.updateNote.bind(notesController));
    apiRouter.delete("/notes", notesController.deleteAllNotes.bind(notesController));
    // mount routers and start web server
    app.use(cors());
    app.use(bodyParser.json());
    app.use("/api", apiRouter);
    app.listen(3000);
}

bootstrap();
