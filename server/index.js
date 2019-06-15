
const express = require("express");
const util = require("util");
const app = express();
const expressWs = require("express-ws")(app);
const sqlite3 = require("sqlite3").verbose();

const { Controller } = require("./controller");
const { NotesController } = require("./notes-controller");
const { NotesDao } = require("./notes-dao");

// create DAO objects (data access object)
const db = new sqlite3.Database("./db.sqlite3");

// promisify DB
db.allAsync = util.promisify(db.all);

const notesDao = new NotesDao(db);

// create controllers
const ctrl = new Controller(app);
const notesController = new NotesController(notesDao);

// connect routes with controller methods
const apiRouter = express.Router();
apiRouter.get("/notes", notesController.getAllNotes.bind(notesController));

// mount routers and start web server
app.use("/api", apiRouter);
app.listen(3000);
