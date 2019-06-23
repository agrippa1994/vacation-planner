import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  public readonly availableCurrencies = {
    "EUR": "Teletubbieland - Euro",
    "USD": "US - Dollar",
    "GBP": "UK - Pound",
    "PLN": "Poland - Zloty",
    "RUB": "Russia - Rubel",
    "THB": "Thailand - Baht"
  };

  constructor() { }
}
