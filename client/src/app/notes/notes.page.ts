import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {

  constructor(
    private notesPage: NotesService,
    private modalController: ModalController) { }

  async ngOnInit() {
    const modal = await this.modalController.create({
      component: NotesPage
    });

    //await modal.present();

  }

}
