import { Component, OnInit } from '@angular/core';
import { ModalController, IonRefresher } from '@ionic/angular';
import { NotesService } from '../notes.service';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {

  constructor(
    private notesService: NotesService,
    private modalController: ModalController) { }

  notes: any = null;
  message: any = '';
  newMessageButton = false;

  async ngOnInit() {
    await this.loadNotes();
  }

  async loadNotes(refreshEvent?) {
    try {
      this.notes = await this.notesService.allNotes();
    } catch (e) {}

    if (refreshEvent) {
      refreshEvent.target.complete();
    }
  }

  addNote() {
    this.newMessageButton = true;
  }

  async sendMessage() {
    try {
      await this.notesService.addNote(this.message);
      await this.loadNotes();
      this.message = '';
      this.newMessageButton = false;
    } catch (e) {}
  }

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
