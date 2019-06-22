/*
Cashbox Invoice-Objekt: { "id": "1", "title": "ttttt", "cost":1234, currency:"EUR", "description": "blabla"}
{ "sum": 999}
*/
class CashboxController {

    constructor(dao, exchangeRateAPI, request) {
        this.dao = dao;
        this.exchangeRates = null;
        //this.requestExchangeRate(exchangeRateAPI,request,0,3);
    }
    requestExchangeRate(url,request,count,max_count){
        const that = this;
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("Exchange rates initialized");
                this.exchangeRates = body;
            }else if(count<max_count){
                console.log("failed to get exchange rates");
                setTimeout(function(t){
                    console.log("Retrying "+count+"...");
                    t.requestExchangeRate(url,request,++count,max_count);
                },2000,that);
            }
        });
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
        console.log("Convert Invoices:");
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
        console.log(cost+" "+fromCurrency+" --> "+toCurrency);
        if(!this.exchangeRates || !this.exchangeRates.rates){

            //for tests
            this.exchangeRates = JSON.parse('{"base":"EUR","date":"2019-06-21","rates":{"THB":34.859,"PHP":58.253,"CZK":25.609,"BRL":4.3357,"CHF":1.1107,"INR":78.6985,"ISK":141.5,"HRK":7.4013,"BGN":1.9558,"NOK":9.686,"USD":1.1316,"CNY":7.7792,"RUB":71.5191,"SEK":10.6308,"MYR":4.7002,"SGD":1.5362,"ILS":4.0785,"TRY":6.5806,"PLN":4.2584,"NZD":1.7261,"HKD":8.8424,"RON":4.7239,"MXN":21.5698,"CAD":1.4928,"AUD":1.6386,"GBP":0.89425,"KRW":1314.41,"ZAR":16.2178,"JPY":121.64,"DKK":7.4657,"IDR":15987.0,"HUF":323.97}}');
            
            
            //throw "Error converting cost: No exchange rates present";
        }
        var rates = this.exchangeRates.rates;
        rates["EUR"] = 1;
        if(!rates[fromCurrency] || !rates[toCurrency]){
            throw "Error converting cost: No exchange rate for "+fromCurrency+" --> "+toCurrency;
        }
        var EURcost = cost/parseFloat(rates[fromCurrency]);
        return EURcost * parseFloat(rates[toCurrency]);
    }


    
}

module.exports = {
    CashboxController
};
