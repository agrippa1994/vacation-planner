import { Component, OnInit } from '@angular/core';
import { ModalController, IonRefresher } from '@ionic/angular';
import { NotesService } from '../notes.service';

/**
 * Component for handling notes
 */

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {
    /**
     * generate parameters
     * @param {NotesService} notesService
     * @param {ModalController} modalController
     */
  constructor(
    private notesService: NotesService,
    private modalController: ModalController) { }

    /**
     * define variable
     * @type {null}
     */
  notes: any = null;
    /**
     * define variable
     * @type {string}
     */
  message: any = '';
    /**
     * define variable
     * @type {boolean}
     */
  newMessageButton = false;

    /**
     * run method this.loadNotes()
     * @returns {Promise<void>}
     */
  async ngOnInit() {
    await this.loadNotes();
  }

    /**
     * method for loading notes
     * @param refreshEvent
     * @returns {Promise<void>}
     */
  async loadNotes(refreshEvent?) {
    try {
      this.notes = await this.notesService.allNotes();
    } catch (e) {}

    if (refreshEvent) {
      refreshEvent.target.complete();
    }
  }

    /**
     * button for adding a new note
     */
  addNote() {
    this.newMessageButton = true;
  }

    /**
     * button for sending a note
     */
  async sendMessage() {
    try {
      await this.notesService.addNote(this.message);
      await this.loadNotes();
      this.message = '';
      this.newMessageButton = false;
    } catch (e) {}
  }
    /**
     * button for sending a note
     */
  async deleteMessage(id) {
    try {
    this.notesService.deleteNote(id);
    setTimeout(() => {
      this.loadNotes();
    }, 1000);
    } catch (e) {
    }
  }
}
