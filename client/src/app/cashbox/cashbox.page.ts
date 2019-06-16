import { Component, OnInit } from '@angular/core';
import { CashboxService } from '../cashbox.service';

@Component({
  selector: 'app-cashbox',
  templateUrl: './cashbox.page.html',
  styleUrls: ['./cashbox.page.scss'],
})
export class CashboxPage implements OnInit {

  constructor(private cashboxService: CashboxService) { }

  ngOnInit() {
  }

}
