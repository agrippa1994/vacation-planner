/*
Cashbox Invoice-Objekt: { "id": "1", "title": "ttttt", "cost":1234, currency:"EUR", "description": "blabla"}
{ "sum": 999}
*/
class CashboxDao {
    constructor(db) {
        this.db = db;
    }

    async init() {
        await this.db.runAsync(`
            CREATE TABLE IF NOT EXISTS invoice
            (
                id INTEGER PRIMARY KEY,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                title TEXT,
                cost INTEGER,
                currency TEXT,
                description TEXT
            )
        `);
    }

    async getInvoice(id) {
        console.log(id);
        return await this.db.allAsync(`
            SELECT
                *
            FROM invoice
            WHERE id = ?
        `,[id]);
    }

    async getAllInvoices() {
        return await this.db.allAsync(`
            SELECT
                *
            FROM invoice
        `);
    }
    
    async addInvoice(title, cost, currency, description) {
        return await this.db.allAsync(`
            INSERT INTO
                invoice(id, title, cost, currency, description)
            VALUES (NULL, ?, ?, ?, ?)`, [title, cost, currency, description]);
    }

    async deleteInvoice(id) {
        return await this.db.allAsync(`
            DELETE FROM invoice
            WHERE id = ?`, [id]);
    }

    async updateInvoice(id, title, cost, currency, description) {
        console.log(id, title, cost, currency, description);
        return await this.db.allAsync(`
            UPDATE
                invoice
            SET
                title = ?,
                cost = ?,
                timestamp = datetime('now'),
                currency = ?,
                description = ?
            WHERE
                id = ?
            `, [title, cost, currency, description, id]);
    }


}

module.exports =  {
    CashboxDao
};
