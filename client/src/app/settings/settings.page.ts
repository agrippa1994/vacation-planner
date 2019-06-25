import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CurrencyService } from '../currency.service';

/**
 * Component for login
 */
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
    /**
     * declare username
     * @type {string}
     */
  username = "";
    /**
     * declare default currency as EUR
     * @type {string}
     */
  defaultCurrency = "EUR";
    /**
     * declare available currencies
     * @type {{EUR: string; USD: string; GBP: string; PLN: string; RUB: string; THB: string}}
     */
  availableCurrencies = this.currencyService.availableCurrencies;

    /**
     * declare parameters
     * @param {Router} router
     * @param {SettingsService} settingsService
     * @param {AlertController} alertController
     * @param {CurrencyService} currencyService
     */
  constructor(
    private router: Router,
    private settingsService: SettingsService,
    private alertController: AlertController,
    private currencyService: CurrencyService,
  ) {}

    /**
     * run method
     */
  ngOnInit() {
    this.username = this.settingsService.username;
  }

    /**
     * save user settings
     * @returns {Promise<void>}
     */
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
