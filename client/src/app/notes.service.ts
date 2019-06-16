import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(
    private settingsService: SettingsService,
    private httpClient: HttpClient,
  ) {}

  allNotes() {
    return this.httpClient.get(this.settingsService.url + "/api/notes");
  }
}
