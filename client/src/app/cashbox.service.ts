import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class CashboxService {

  constructor(private settingsService: SettingsService) {

  }
}
