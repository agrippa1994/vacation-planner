import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CurrencyService } from '../currency.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  username = "";
  defaultCurrency = "EUR";
  availableCurrencies = this.currencyService.availableCurrencies;

  constructor(
    private router: Router,
    private settingsService: SettingsService,
    private alertController: AlertController,
    private currencyService: CurrencyService,
  ) {}

  ngOnInit() {
    this.username = this.settingsService.username;
  }

  async save() {
    this.settingsService.username = this.username;
    this.settingsService.defaultCurrency = this.defaultCurrency;
    this.settingsService.save();

    if(!this.settingsService.areSettingsValid) {
      const controller = await this.alertController.create({
        message: "Settings are not valid",
        header: "Error",
        buttons: ["OK"]
      });

      await controller.present();
      return;
    }

    if(this.router.url.indexOf("tabs") === -1)
      this.router.navigate(["tabs"]);
  }
}
