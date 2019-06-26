import { Component, OnInit } from '@angular/core';
import { CashboxService, Invoice, Sum } from '../cashbox.service';
import { ModalController, AlertController } from '@ionic/angular';
import { EditorComponent } from './editor/editor.component';
import { CurrencyService } from '../currency.service';
import { SettingsService } from '../settings.service';

/**
 * Component for presenting invoices, spended money and sum in different currencies
 */
@Component({
    selector: 'app-cashbox',
    templateUrl: './cashbox.page.html',
    styleUrls: ['./cashbox.page.scss'],
})
export class CashboxPage implements OnInit {
    /**
     * declare Invoice
     */
    invoices: Invoice[];
    /**
     * declare sum
     */
    sum: Sum;
    /**
     * declare sum for currencies
     * @type {string}
     */
    sumCurrency = this.settingsService.defaultCurrency;

    availableCurrencies = this.currencyService.availableCurrencies;

    /**
     * declare constructor
     * @param {CashboxService} cashboxService
     * @param {ModalController} modalController
     * @param {CurrencyService} currencyService
     * @param {AlertController} alertController
     * @param {SettingsService} settingsService
     */
    constructor(
        private cashboxService: CashboxService,
        private modalController: ModalController,
        private currencyService: CurrencyService,
        private alertController: AlertController,
        private settingsService: SettingsService,
    ) { }

    /**
     * method that Angular calls shortly after creating the component waiting on getInvoicesAndSum()
     * @returns {Promise<void>}
     */
    async ngOnInit() {
        await this.getInvoicesAndSum();
    }

    /**
     * method for summing of all invoices
     * @param refreshEvent
     * @returns {Promise<void>}
     */

    async getInvoicesAndSum(refreshEvent?) {
        try {
            this.invoices = await this.cashboxService.all();
            this.sum = await this.cashboxService.sum(this.sumCurrency);
        } catch (e) {
            const alert = await this.alertController.create({
                header: "Error",
                subHeader: "Could not load invoices",
            });

            await alert.present();
        }

        if (refreshEvent)
            refreshEvent.target.complete();
    }

    /**
     * add a new invoice
     * @returns {Promise<void>}
     */
    async addInvoice() {
        await this.showInvoiceEditor();
    }

    /**
     * method fo editing an invoice
     * @param {Invoice} invoice
     * @returns {Promise<void>}
     */
    async edit(invoice: Invoice) {
        await this.showInvoiceEditor(invoice);
    }

    /**
     * method for deleting an invoice
     * @param {Invoice} invoice
     * @returns {Promise<void>}
     */

    async delete(invoice: Invoice) {
        try {
            await this.cashboxService.delete(invoice);
            await this.getInvoicesAndSum();
        }
        catch (e) {
            const alert = await this.alertController.create({
                header: "Error",
                subHeader: `Could not delete invoice '${invoice.title}'`,
            });

            await alert.present();
        }
    }

    /**
     * method for invoice editor
     * @param {Invoice} invoiceToEdit
     * @returns {Promise<void>}
     */

    private async showInvoiceEditor(invoiceToEdit?: Invoice) {
        let componentProps = {};

        if (invoiceToEdit) {
            /**
             * pass the invoice to the editor if we want to edit it
              */
            componentProps = {
                isEditing: true,
                invoice: invoiceToEdit,
            };
        }
        /**
         * create Editor component
         * @type {HTMLIonModalElement}
         */
        const ctrl = await this.modalController.create({
            component: EditorComponent,
            componentProps,
        });

        /**
         * show editor and reload table view as soon as the editor is dismissed
         */
        await ctrl.present();
        await ctrl.onWillDismiss();
        await this.getInvoicesAndSum();
    }
}
