import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CashboxPage } from './cashbox.page';
import { EditorComponent } from './editor/editor.component';

const routes: Routes = [
  {
    path: '',
    component: CashboxPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CashboxPage, EditorComponent],
  entryComponents: [EditorComponent]
})
export class CashboxPageModule {}
