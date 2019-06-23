import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from './settings.service';
import { Subject } from 'rxjs';
import { PositionService } from './position.service';

export class UserPosition {
  username: string;
  position: Position;
}

@Injectable({
  providedIn: 'root'
})
export class MapService {

  public positions: UserPosition[] = [];
  public positionsChanged = new Subject();
  private isSetup = false;
  private timer: any;

  constructor(
    private settingsService: SettingsService,
    private httpClient: HttpClient,
    private positionService: PositionService,
  ) {}

  async setup() {
    if(this.isSetup)
      return;

    await this.uploadMyPositionAndFetchOthersPositions();
    this.timer = setInterval(this.uploadMyPositionAndFetchOthersPositions.bind(this), 2000);
    this.isSetup = true;
  }

  cancel() {
    if(!this.isSetup)
      return;

    clearInterval(this.timer);
    this.timer = null;
    this.isSetup = false;
  }

  async getCurrentPosition(): Promise<Position> {
    return await this.positionService.getCurrentPosition();
  }

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

  private async fetchPositions() : Promise<UserPosition[]> {
    return await this.httpClient.get<UserPosition[]>("/api/positions").toPromise();
  }
}
