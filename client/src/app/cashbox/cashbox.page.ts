import { Component, OnInit } from '@angular/core';
import { CashboxService, Invoice, Sum } from '../cashbox.service';
import { ModalController, AlertController } from '@ionic/angular';
import { EditorComponent } from './editor/editor.component';
import { CurrencyService } from '../currency.service';
import { SettingsService } from '../settings.service';

@Component({
    selector: 'app-cashbox',
    templateUrl: './cashbox.page.html',
    styleUrls: ['./cashbox.page.scss'],
})
export class CashboxPage implements OnInit {

    invoices: Invoice[];
    sum: Sum;
    sumCurrency = this.settingsService.defaultCurrency;

    availableCurrencies = this.currencyService.availableCurrencies;

    constructor(
        private cashboxService: CashboxService,
        private modalController: ModalController,
        private currencyService: CurrencyService,
        private alertController: AlertController,
        private settingsService: SettingsService,
    ) { }

    async ngOnInit() {
        await this.getInvoicesAndSum();
    }

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

    async addInvoice() {
        await this.showInvoiceEditor();
    }

    async edit(invoice: Invoice) {
        await this.showInvoiceEditor(invoice);
    }

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

    private async showInvoiceEditor(invoiceToEdit?: Invoice) {
        let componentProps = {};

        if (invoiceToEdit) {
            // pass the invoice to the editor if we want to edit it
            componentProps = {
                isEditing: true,
                invoice: invoiceToEdit,
            };
        }

        // create Editor component
        const ctrl = await this.modalController.create({
            component: EditorComponent,
            componentProps,
        });

        // show editor and reload table view as soon as the editor is dismissed
        await ctrl.present();
        await ctrl.onWillDismiss();
        await this.getInvoicesAndSum();
    }
}
