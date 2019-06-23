import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';

export class Invoice {
  id?: number;
  title: string;
  cost: number;
  currency: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class CashboxService {

  constructor(private settingsService: SettingsService) {

  }
}
