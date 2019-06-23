import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public username = "";
  public defaultCurrency = "EUR";

  get areSettingsValid() {
    return this.username.length > 0 && this.defaultCurrency.length > 0;
  }

  constructor() {
    try {
      const obj = JSON.parse(localStorage.getItem("settings"));
      this.username = obj["username"] || "";
      this.defaultCurrency = obj["defaultCurrency"] || "EUR";
    }
    catch(e) {}
  }

  save() {
    localStorage.setItem("settings", JSON.stringify({ username: this.username, defaultCurrency: this.defaultCurrency }));
  }
}
