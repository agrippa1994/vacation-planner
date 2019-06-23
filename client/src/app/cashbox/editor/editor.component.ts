import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Invoice, CashboxService } from 'src/app/cashbox.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {

  invoice = new Invoice();

  availableCurrencies = {
    "EUR": "Teletubbieland - Euro",
    "USD": "US - Dollar",
    "GBP": "UK - Pound",
    "PLN": "Poland - Zloty",
    "RUB": "Russia - Rubel",
    "THB": "Thailand - Baht"
  }

  constructor(
    private modalController: ModalController,
    private cashboxService: CashboxService,
    private alertController: AlertController,
  ) { }

  ngOnInit() {}

  async close() {
    await this.modalController.dismiss();
  }

  async saveAndClose() {
    try {
      await this.cashboxService.add(this.invoice);
      await this.modalController.dismiss();
    } catch(e) {
      const alert = await this.alertController.create({
        buttons: ["OK"],
        header: "Error",
        subHeader: "Error while creating invoice"
      });

      await alert.present();
    }
  }

}
