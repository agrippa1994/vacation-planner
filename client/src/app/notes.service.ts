import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from './settings.service';


export class Note {
  id: number;
  timestamp: string;
  username: string;
  note: string;
}


@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(
    private settingsService: SettingsService,
    private httpClient: HttpClient,
  ) {}

  async allNotes(): Promise<Note[]> {
    return await this.httpClient.get<Note[]>(this.settingsService.url + "/api/notes").toPromise();
  }

  async addNote(note: string): Promise<void> {
    return await this.httpClient.post<void>(this.settingsService.url + "/api/notes", {
      username: this.settingsService.username,
      note
    }).toPromise();
  }

  async deleteNote(id: number): Promise<void> {
    return await this.httpClient.delete<void>(this.settingsService.url + "/api/note/" + id).toPromise();
  }

  async updateNote(id: number, note: string): Promise<void> {
    return await this.httpClient.post<void>(this.settingsService.url + "/api/note/" + id, {
      username: this.settingsService.username,
      note
    }).toPromise();
  }

}
