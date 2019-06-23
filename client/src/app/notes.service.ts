import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from './settings.service';

export class Note {
  id ?: number;
  timestamp ?: string;
  username: string;
  note: string;
  offline = false;
}


@Injectable({
  providedIn: 'root'
})
export class NotesService {

  // private cachedNotes: Note[] = [];

  private get cachedNotes(): Note[] {
    try {
      const notes = JSON.parse(localStorage.getItem('cachedNotes')) as Note[];
      return Array.isArray(notes) ? notes : [];
    } catch (e) {
      return [];
    }
  }

  private set cachedNotes(notes: Note[]) {
    localStorage.setItem('cachedNotes', JSON.stringify(notes));
  }


  constructor(
    private settingsService: SettingsService,
    private httpClient: HttpClient,
  ) {}

  async allNotes(): Promise<Note[]> {
    try {
      await this.uploadCachedNotes(); // zuerst upload der offline-notes und dann download vom server
      const serverNotes = await this.httpClient.get<Note[]>('/api/notes').toPromise();
      for (const note of serverNotes) {
        note.offline = false; // notes vom server sind nicht offline
      }
      // delete all online notes from cachedNotes, because we retrieved all onlinenotes now
      this.cachedNotes = this.cachedNotes.filter(note => {
        return note.offline;
      });
      this.cachedNotes = serverNotes.concat(this.cachedNotes); // notes vom server + offline notes zusammenfügen
      return this.cachedNotes;
    } catch (e) {
      return this.cachedNotes; // nur gecachte notes zurückgeben
    }
  }

  async uploadCachedNotes() {
    // nur offline notes zum server senden
    const notesToUpload = this.cachedNotes.filter(note => {
      return note.offline;
    });
    for (const note of notesToUpload) {
      try {
        // senden der note
        await this.httpClient.post<void>('/api/notes', note).toPromise();

        // note vom cache löschen, da sie erfolgreich hochgeladen wurde
        const cachedNotes = this.cachedNotes;
        cachedNotes.splice(cachedNotes.indexOf(note), 1);
        this.cachedNotes = cachedNotes;
      } catch (e) {
      }
    }
  }

  async addNote(note: string): Promise<void> {
    const body: Note = {
      username: this.settingsService.username,
      offline: false,
      note
    };
    try {
      return await this.httpClient.post<void>('/api/notes', body).toPromise();
    } catch (e) {
      body.offline = true;
      const cachedNotes = this.cachedNotes;
      cachedNotes.push(body);
      this.cachedNotes = cachedNotes;
    }
  }

  async deleteNote(id: number): Promise<void> {
    return await this.httpClient.delete<void>('/api/note/' + id).toPromise();
  }

  async updateNote(id: number, note: string): Promise<void> {
    return await this.httpClient.post<void>('/api/note/' + id, {
      username: this.settingsService.username,
      note
    }).toPromise();
  }

}
