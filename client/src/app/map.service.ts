import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from './settings.service';
import { Subject } from 'rxjs';
import { PositionService } from './position.service';

/**
 * export class UserPosition
 */
export class UserPosition {
  /**
   * define username as a string
   */
  username: string;
    /**
     * define position as a Position
     */
  position: Position;
}
/**
 * @ignore
 */
@Injectable({
  providedIn: 'root'
})
/**
 * export MapService
 */
export class MapService {
    /**
     * define array for user positions
     * @type {any[]}
     */
  public positions: UserPosition[] = [];
    /**
     * define variable for user position changes
     * @type {Subject<any>}
     */
  public positionsChanged = new Subject();
    /**
     * define variable for position settings
     * @type {boolean}
     */
  private isSetup = false;
    /**
     * define variable for time
     */
  private timer: any;

    /**
     * set parameters
     * @param {SettingsService} settingsService
     * @param {HttpClient} httpClient
     * @param {PositionService} positionService
     */

  constructor(
    private settingsService: SettingsService,
    private httpClient: HttpClient,
    private positionService: PositionService,
  ) {}

    /**
     * position upload every 2 sec
     * @returns {Promise<void>}
     */
  async setup() {
    if(this.isSetup)
      return;

    await this.uploadMyPositionAndFetchOthersPositions();
    this.timer = setInterval(this.uploadMyPositionAndFetchOthersPositions.bind(this), 2000);
    this.isSetup = true;
  }

    /**
     * stop chasing the position
     */
  cancel() {
    if(!this.isSetup)
      return;

    clearInterval(this.timer);
    this.timer = null;
    this.isSetup = false;
  }

    /**
     * get info. about current user position
     * @returns {Promise<Position>}
     */
  async getCurrentPosition(): Promise<Position> {
    return await this.positionService.getCurrentPosition();
  }

    /**
     * new user position
     * @param {Position} position
     * @returns {Promise<Object>}
     */

  private async updatePosition(position: Position) {
    return this.httpClient.post("/api/position", {
      username: this.settingsService.username,
      position: {
        timestamp: position.timestamp,
        coords: {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        },
      },
    }).toPromise();
  }

    /**
     * actual users position
     * @returns {Promise<void>}
     */
  private async uploadMyPositionAndFetchOthersPositions() {
    try {
      const position = await this.getCurrentPosition();
      await this.updatePosition(position);
      this.positions = await this.fetchPositions();
      this.positionsChanged.next();
    }
    catch(e) {
      console.error("Error uploading positions or fetching others positions", e);
    }
  }

    /**
     * get user localisation data to promise
     * @returns {Promise<UserPosition[]>}
     */

  private async fetchPositions() : Promise<UserPosition[]> {
    return await this.httpClient.get<UserPosition[]>("/api/positions").toPromise();
  }
}
