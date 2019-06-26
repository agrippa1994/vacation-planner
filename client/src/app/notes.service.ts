import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from './settings.service';

/**
 * export data for Note db
 */
export class Note {
    /**
     * define id as a number
     */
  id ?: number;
    /**
     * define timestamp as a Date
     */
  timestamp ?: Date;
    /**
     * define username as a string
     */
  username: string;
    /**
     * define note as a string
     */
  note: string;
    /**
     * define offline as false
     */
  offline = false;
}

@Injectable({
  providedIn: 'root'
})

export class NotesService {

  // private cachedNotes: Note[] = [];

    /**
     * parse cachedNotes as a array of notes
     * @returns {Note[]}
     */
  private get cachedNotes(): Note[] {
    try {
      const notes = JSON.parse(localStorage.getItem('cachedNotes')) as Note[];
      return Array.isArray(notes) ? notes : [];
    } catch (e) {
      return [];
    }
  }

    /**
     * stringify JSON notes
     * @param {Note[]} notes
     */
  private set cachedNotes(notes: Note[]) {
    localStorage.setItem('cachedNotes', JSON.stringify(notes));
  }

    /**
     * create a constructor
     * @param {SettingsService} settingsService
     * @param {HttpClient} httpClient
     */
  constructor(
    private settingsService: SettingsService,
    private httpClient: HttpClient,
  ) {}

    /**
     * managing notes
     * @returns {Promise<Note[]>}
     */
  async allNotes(): Promise<Note[]> {
    try {
      await this.uploadCachedNotes(); // zuerst upload der offline-notes und dann download vom server
      const serverNotes = await this.httpClient.get<Note[]>('/api/notes').toPromise();
      for (const note of serverNotes) {
        note.timestamp = new Date(note.timestamp as any * 1000); // convert to epoch time
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

    /**
     * upload notes in cache
     * @returns {Promise<void>}
     */

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

    /**
     * adding user note to the array
     * @param {string} note
     * @returns {Promise<void>}
     */
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

    /**
     * delete a note
     * @param {number} id
     * @returns {Promise<void>}
     */
  async deleteNote(id: number): Promise<void> {
    return await this.httpClient.delete<void>('/api/note/' + id).toPromise();
  }

    /**
     * updating a note
     * @param {number} id
     * @param {string} note
     * @returns {Promise<void>}
     */

  async updateNote(id: number, note: string): Promise<void> {
    return await this.httpClient.post<void>('/api/note/' + id, {
      username: this.settingsService.username,
      note
    }).toPromise();
  }

}
