import { Component, OnInit } from '@angular/core';
import { ModalController, IonRefresher } from '@ionic/angular';
import { NotesService } from '../notes.service';
import {timestamp} from "rxjs/operators";


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
  id: any = 0;

  async ngOnInit() {
    await this.loadNotes();
  }

  async loadNotes(refreshEvent?) {
    try {
      this.notes = await this.notesService.allNotes();
    }
    catch(e) {}

    if(refreshEvent)
      refreshEvent.target.complete();
  }

  addNote() {
    this.newMessageButton = true;
  }

  async sendMessage() {
    try {
      await this.notesService.addNote(this.message);
      await this.loadNotes();
      this.message = '';
    } catch (e) {}
  }

  async deleteMessage() {

    this.notesService.deleteNote(this.id);
  }
}
