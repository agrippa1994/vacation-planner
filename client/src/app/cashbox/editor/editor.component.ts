import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Invoice, CashboxService } from 'src/app/cashbox.service';
import { CurrencyService } from 'src/app/currency.service';

/**
 * Component for adding a new invoice
 */
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {
    /**
     * define variable
     * @type {boolean}
     */
  isEditing = false;
    /**
     * define variable
     * @type {Invoice}
     */
  invoice = new Invoice();
    /**
     * define variable
     * @type {{EUR: string; USD: string; GBP: string; PLN: string; RUB: string; THB: string}}
     */
  availableCurrencies = this.currencyService.availableCurrencies

    /**
     * define constructor
     * @param {ModalController} modalController - create a Modal
     * @param {CashboxService} cashboxService
     * @param {AlertController} alertController
     * @param {CurrencyService} currencyService
     */
  constructor(
    private modalController: ModalController,
    private cashboxService: CashboxService,
    private alertController: AlertController,
    private currencyService: CurrencyService,
  ) { }

    /**
     * Dismiss the modal overlay after it has been presented.
     * @returns {Promise<void>}
     */

  async close() {
    await this.modalController.dismiss();
  }

    /**
     * method for saving data and closing alert window
     * @returns {Promise<void>}
     */
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
