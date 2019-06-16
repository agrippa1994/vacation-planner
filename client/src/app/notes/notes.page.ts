import { Component, OnInit } from '@angular/core';
import { ModalController, IonRefresher } from '@ionic/angular';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {

  notes: any = null;

  constructor(
    private notesService: NotesService,
    private modalController: ModalController) { }

  async ngOnInit() {
    this.loadNotes();
  }

  loadNotes(refreshEvent?) {
    this.notesService.allNotes().subscribe(notes => {
      if(refreshEvent)
        refreshEvent.target.complete();

      this.notes = notes
    });
  }

}
