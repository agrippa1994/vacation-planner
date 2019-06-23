import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Invoice, CashboxService } from 'src/app/cashbox.service';
import { CurrencyService } from 'src/app/currency.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {

  isEditing = false;
  invoice = new Invoice();
  availableCurrencies = this.currencyService.availableCurrencies

  constructor(
    private modalController: ModalController,
    private cashboxService: CashboxService,
    private alertController: AlertController,
    private currencyService: CurrencyService,
  ) { }

  async close() {
    await this.modalController.dismiss();
  }

  async saveAndClose() {
    try {
      if(this.isEditing)
        await this.cashboxService.update(this.invoice);
      else
        await this.cashboxService.add(this.invoice);
      await this.modalController.dismiss();
    } catch(e) {
      const alert = await this.alertController.create({
        buttons: ["OK"],
        header: "Error",
        subHeader: "Error while creating or updating the invoice"
      });

      await alert.present();
    }
  }

}
