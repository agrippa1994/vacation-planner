import { Component, OnInit } from '@angular/core';
import { CashboxService } from '../cashbox.service';
import { ModalController } from '@ionic/angular';
import { EditorComponent } from './editor/editor.component';

@Component({
    selector: 'app-cashbox',
    templateUrl: './cashbox.page.html',
    styleUrls: ['./cashbox.page.scss'],
})
export class CashboxPage implements OnInit {
    expenses = [];
    expenseAmount = 0;
    total = [];
    addExpenseReason(newExpenseReason: string) {
        if (newExpenseReason) {
            this.expenses.push(newExpenseReason);
        }
    }

    clear(newExpenseReason: string) {
        if (newExpenseReason) {
            this.expenses.pop();
        }
    }

    /*totalExpense(newExpenseAmount: string) {
        if (newExpenseAmount) {
            this.total.push(newExpenseAmount);
            /!*this.total = +((this.expenseAmount) + (this.expenseAmount));*!/
        }
        }*/



    /*total: number;
    totalExpense(old:number, new:number) {
        this.total = +old + +new;

    }*/
    /*totalExpense(newExpenseAmount: string ) {
        if (newExpenseAmount) {
          this.expenses += + newExpenseAmount;
        }
    }*/

    constructor(
        private cashboxService: CashboxService,
        private modalController: ModalController,
    ) { }

    ngOnInit() {

    }

    async addInvoice() {
        const ctrl = await this.modalController.create({ component: EditorComponent });
        await ctrl.present();
    }

}
