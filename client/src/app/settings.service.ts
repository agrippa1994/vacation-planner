import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public username = "";
  public url = "";

  get areSettingsValid() {
    return this.username.length > 0 && this.url.length > 0;
  }

  constructor() {
    try {
      const obj = JSON.parse(localStorage.getItem("settings"));
      this.username = obj["username"] || "";
      this.url = obj["url"] || "";
    }
    catch(e) {}
  }

  save() {
    localStorage.setItem("settings", JSON.stringify({ username: this.username, url: this.url }));
  }
}
