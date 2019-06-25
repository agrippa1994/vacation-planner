import { Component, OnInit } from '@angular/core';
import { MapService } from '../map.service';
import * as L from "leaflet";
import { AlertController } from '@ionic/angular';

/**
 * Page for showing user position on a map
 */

declare var require : any;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
    /**
     * declare map
     */
  map: any;
    /**
     * declare markers
     * @type {{}}
     */
  markers: { [username: string]: any } = {};

    /**
     * declare parameters
     * @param {MapService} mapService
     * @param {AlertController} alertController
     */
  constructor(
    private mapService: MapService,
    private alertController: AlertController,
  ) { }

    /**
     * run methods
     * @returns {Promise<void>}
     */
  async ngOnInit() {
    await this.mapService.setup();
    await this.loadMap();
  }

    /**
     * Load Map from openstreetmap
     * set user location
     * @returns {Promise<void>}
     */

  private async loadMap() {
    try {
      const pos: Position = await this.mapService.getCurrentPosition();

      this.applyLeafletProductionBuildHack();

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
    catch (e) {
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

    /**
     * use of leaflet to show map with marker
     */
  private applyLeafletProductionBuildHack() {
    // see https://stackoverflow.com/questions/56411497/leaflet-marker-not-found-production-env-angular-7
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });
  }

    /**
     * markers settings (set / update / remove)
     * @returns {Promise<void>}
     */
  private async setMarkersOnMap() {
    if (!this.map)
      return;

    const positions = this.mapService.positions;

    for (const position of positions) {

      // We have already a marker, just update the marker position
      if (position.username in this.markers) {
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

      /**
       * Collect all usernames of the position update
        */
    const receivedUsernames: string[] = [];
    for (const position of positions) {
      receivedUsernames.push(position.username);
    }

      /**
       * Remove all local markers of users that were not part of the received payload
        */
    const currentUsernames = Object.keys(this.markers);
    for (const currentUsername of currentUsernames) {
      if (receivedUsernames.indexOf(currentUsername) === -1) {
        this.map.removeLayer(this.markers[currentUsername]);
        delete this.markers[currentUsername];
      }
    }
  }
}
