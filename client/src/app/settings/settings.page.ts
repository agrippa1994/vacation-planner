import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  username = "";

  constructor(
    private router: Router,
    private settingsService: SettingsService,
    private alertController: AlertController,
  ) {}

  ngOnInit() {
    this.username = this.settingsService.username;
  }

  async save() {
    this.settingsService.username = this.username;
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
