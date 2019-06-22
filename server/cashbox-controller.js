/*
Cashbox Invoice-Objekt: { "id": "1", "title": "ttttt", "cost":1234, currency:"EUR", "description": "blabla"}
{ "sum": 999}
*/
class CashboxController {

    constructor(dao, exchangeRateAPI,request,schedule) {
        this.dao = dao;
        this.exchangeRates = null;
        this.exchangeRateAPI = exchangeRateAPI;
        this.request = request;

        //Update Exchange Rates once every day
        const that = this;
        this.requestExchangeRate(this.exchangeRateAPI,0,3,this.request,this.schedule);
        schedule.scheduleJob('0 0 * * *', () => { that.requestExchangeRate(that.exchangeRateAPI,0,3,that.request,that.schedule); });
    }
 
    async getAllInvoices(req, res) {
        try {
            var invoices = await this.dao.getAllInvoices();
            var that = this;
            invoices = invoices.map(i => {i.cost = that.parseToDisplayCosts(i.cost); return i});
            res.json(invoices);
        } catch(e) {
            res.status(500).json(e);
        }
    }
    async getInvoice(req, res) {
        try {
            if(!req.params.id){
                res.status(404).json({ responseText: "NotFound"});
                return;
            }
            var invoice = await this.dao.getInvoice(req.params.id);
            var that = this;
            invoice = invoice.map(i => {i.cost = that.parseToDisplayCosts(i.cost); return i});
            res.json(invoice);
        } catch(e) {
            res.status(500).json(e);
        }
    }

    async addInvoice(req, res) {
        try {
            if(!req.body || !("title" in req.body) || !("cost" in req.body) || !("currency" in req.body))
                return res.status(400).end();

            await this.dao.addInvoice(req.body.title, this.parseToDBCosts(req.body.cost), req.body.currency, req.body.description);
            res.status(201).end();
        }
        catch(e) {
            console.log(e);
            res.status(500).json(e);
        }
    }

    async deleteInvoice(req, res) {
        try {
            await this.dao.deleteInvoice(req.params.id);
            res.status(200).end();
        }
        catch(e) {
            res.status(500).json(e);
        }
    }

    async updateInvoice(req, res) {
        try {
            if(!req.body || !("title" in req.body) || !("cost" in req.body) || !("currency" in req.body))
                return res.status(400).end();

            await this.dao.updateInvoice(req.params.id, req.body.title, this.parseToDBCosts(req.body.cost), req.body.currency, req.body.description);
            res.status(200).end();
        }
        catch(e) {        
            res.status(500).json(e);
        }
    }
    async convertedInvoices(req, res) {
        try {
            var currency = req.params.currency?req.params.currency:"EUR";
            var invoices = await this.convertAllInvoices(currency);
            res.status(200).json(invoices);
        }
        catch(e) {
            console.error(e);
            res.status(500).json(e);
        }
    }
    async summerizeInvoices(req,res){
        try{
            var currency = req.params.currency?req.params.currency:"EUR";
            var invoices = await this.convertAllInvoices(currency);
            var sum = 0;
            for(var i=0;i<invoices.length;i++){
                sum += invoices[i].cost;
            }
            res.status(200).json({
                sum: sum,
                currency: currency
            });
        }
        catch(e) {
            console.error(e);
            res.status(500).json(e);
        }
    }
    async convertAllInvoices(currency){
        var invoices = await this.dao.getAllInvoices();
        var that = this;
        invoices = invoices.map(i => {
            i.cost = that.convertToCurrency(that.parseToDisplayCosts(i.cost),i.currency,currency);
            i.currency = currency;
            return i;
        });
        return invoices;
    }

    parseToDBCosts(c){
        if(isNaN(c)){
            c = 0;
        }
        c = parseFloat(c);
        return Math.floor(c * 100);
    }
    parseToDisplayCosts(c){
        if(isNaN(c)){
            c = 0;
        }
        c = parseFloat(c);
        return c/100;
    }
    //Converte over EUR
    convertToCurrency(cost,fromCurrency, toCurrency){
        if(!this.exchangeRates || !this.exchangeRates.rates){
           throw "Error converting cost: No exchange rates present";
        }
        var rates = this.exchangeRates.rates;
        rates["EUR"] = 1;
        if(!rates[fromCurrency] || !rates[toCurrency]){
            throw "Error converting cost: No exchange rate for "+fromCurrency+" --> "+toCurrency;
        }
        var EURcost = cost/parseFloat(rates[fromCurrency]);
        return EURcost * parseFloat(rates[toCurrency]);
    }
    requestExchangeRate(url,count,max_count,request){
        const that = this;
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("Exchange rates initialized");
                that.exchangeRates = JSON.parse(body);
            }else if(count<max_count){
                console.log("failed to get exchange rates");
                setTimeout(function(t){
                    console.log("Retrying "+count+"...");
                    t.requestExchangeRate(url,++count,max_count,request);
                },2000,that);
            }
        });
    }


    
}

module.exports = {
    CashboxController
};
