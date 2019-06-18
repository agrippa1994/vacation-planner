import { Component, OnInit } from '@angular/core';
import { MapService } from '../map.service';
import * as L from "leaflet";
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  map: any;
  markers: { [username: string]: any } = {};

  constructor(
    private mapService: MapService,
    private alertController: AlertController,
  ) { }

  async ngOnInit() {
    await this.mapService.setup();
    await this.loadMap();
  }

  private async loadMap() {
    try {
      const pos: Position = await this.mapService.getCurrentPosition();
      this.map = L.map("map", {
        center: [pos.coords.latitude, pos.coords.longitude],
        zoom: 13
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
      await this.setMarkersOnMap();

      this.mapService.positionsChanged.subscribe(async () => {
        await this.setMarkersOnMap();
      });
    }
    catch(e) {
      console.error(e);
      const alarmCtrl = await this.alertController.create({
        backdropDismiss: false,
        message: `Please enable geolocation services in order to see the map\n${JSON.stringify(e)}`,
        header: "Error while showing the map",
        buttons: ["OK"],
      });

      await alarmCtrl.present();
    }
  }

  private async setMarkersOnMap() {
    if(!this.map)
      return;

    const positions = this.mapService.positions;

    for(const position of positions) {

      // We have already a marker, just update the marker position
      if(position.username in this.markers) {
        this.markers[position.username].setLatLng([
          position.position.coords.latitude,
          position.position.coords.longitude,
        ]).update();
      }
      // We do not have a marker, create a new one
      else {
        const marker = L.marker([position.position.coords.latitude, position.position.coords.longitude], {
          title: position.username
        })
        .addTo(this.map)
        .bindPopup(`${position.username}`);

        this.markers[position.username] = marker;
      }
    }

    // Collect all usernames of the position update
    const receivedUsernames: string[] = [];
    for(const position of positions) {
      receivedUsernames.push(position.username);
    }

    // Remove all local markers of users that were not part of the received payload
    const currentUsernames = Object.keys(this.markers);
    for(const currentUsername of currentUsernames) {
      if(receivedUsernames.indexOf(currentUsername) === -1) {
        this.map.removeLayer(this.markers[currentUsername]);
        delete this.markers[currentUsername];
      }
    }
  }
}
