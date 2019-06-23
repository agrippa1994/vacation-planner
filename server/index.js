
const express = require("express");
const bodyParser = require("body-parser");
const util = require("util");
const schedule = require("node-schedule");
const app = express();
const expressWs = require("express-ws")(app);
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const request = require('request');
const EXCHANGE_RATE_API_URL = "https://api.exchangeratesapi.io/latest";

const { Controller } = require("./controller");
const { NotesController } = require("./notes-controller");
const { NotesDao } = require("./notes-dao");

const { CashboxController } = require("./cashbox-controller");
const { CashboxDao } = require("./cashbox-dao");

const { MapController } = require("./map-controller");
const { MapDao } = require("./map-dao");

async function bootstrap() {
    const db = new sqlite3.Database("./db_data/db.sqlite3");

    // promisify DB
    db.allAsync = util.promisify(db.all);
    db.runAsync = util.promisify(db.run);

    // create DAO objects (data access object)
    const notesDao = new NotesDao(db);
    const mapDao = new MapDao(db);
    const cashboxDao = new CashboxDao(db);

    // initalize DAOs (creating tables and so on)
    await notesDao.init();
    await mapDao.init();
    await cashboxDao.init();

    // create controllers
    const notesController = new NotesController(notesDao);
    const mapController = new MapController(mapDao);
    const cashboxController = new CashboxController(cashboxDao,EXCHANGE_RATE_API_URL,request,schedule);

    // connect routes with controller methods
    const apiRouter = express.Router();
    apiRouter.get("/notes", notesController.getAllNotes.bind(notesController));
    apiRouter.post("/notes", notesController.addNote.bind(notesController));
    apiRouter.delete("/note/:id", notesController.deleteNote.bind(notesController));
    apiRouter.put("/note/:id", notesController.updateNote.bind(notesController));

    //cashbox CRUD
    apiRouter.get("/cashbox", cashboxController.getAllInvoices.bind(cashboxController));
    apiRouter.get("/cashbox/id/:id", cashboxController.getInvoice.bind(cashboxController));
    apiRouter.post("/cashbox", cashboxController.addInvoice.bind(cashboxController));
    apiRouter.delete("/cashbox/:id", cashboxController.deleteInvoice.bind(cashboxController));
    apiRouter.put("/cashbox/:id", cashboxController.updateInvoice.bind(cashboxController));

    //convert currency
    apiRouter.get("/cashbox/sum/:currency", cashboxController.summerizeInvoices.bind(cashboxController)); 
    apiRouter.get("/cashbox/sum/", cashboxController.summerizeInvoices.bind(cashboxController)); 
    apiRouter.get("/cashbox/converted/:currency", cashboxController.convertedInvoices.bind(cashboxController)); 

    apiRouter.get("/positions", mapController.handleGetAllPositions.bind(mapController));
    apiRouter.post("/position", mapController.handlePostPosition.bind(mapController));

    // mount routers and start web server
    app.use(cors());
    app.use(bodyParser.json());
    app.use("/api", apiRouter);
    app.use(express.static("./www"));
    app.listen(3000);
}

bootstrap();
