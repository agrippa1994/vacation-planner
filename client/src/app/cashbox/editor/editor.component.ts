import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Invoice } from 'src/app/cashbox.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {

  invoice = new Invoice();

  availableCurrencies = {
    "EUR": "Euro",
    "USD": "US Dollar",
  }

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  async close() {
    await this.modalController.dismiss();
  }

}
