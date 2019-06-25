import { Injectable } from '@angular/core';
/**
 * @ignore
 */
@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

    /**
     * define available Currencies
     * @type {{EUR: string; USD: string; GBP: string; PLN: string; RUB: string; THB: string}}
     */
  public readonly availableCurrencies = {
    "EUR": "Euro",
    "USD": "US - Dollar",
    "GBP": "UK - Pound",
    "PLN": "Poland - Zloty",
    "RUB": "Russia - Rubel",
    "THB": "Thailand - Baht"
  };

    /**
     * @ignore
     */
  constructor() { }
}
