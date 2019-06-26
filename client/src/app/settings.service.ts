import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
    /**
     * define variable
     * @type {string}
     */
  public username = "";
    /**
     * define default for currency
     * @type {string}
     */
  public defaultCurrency = "EUR";

    /**
     * define variable
     * @returns {boolean}
     */
  get areSettingsValid() {
    return this.username.length > 0 && this.defaultCurrency.length > 0;
  }

    /**
     * parse JSON data
     */

  constructor() {
    try {
      const obj = JSON.parse(localStorage.getItem("settings"));
      this.username = obj["username"] || "";
      this.defaultCurrency = obj["defaultCurrency"] || "EUR";
    }
    catch(e) {}
  }

    /**
     * save default value into storage
     * @example JSON.stringify({ username: aga, defaultCurrency: EURO }
     */

  save() {
    localStorage.setItem("settings", JSON.stringify({ username: this.username, defaultCurrency: this.defaultCurrency }));
  }
}
