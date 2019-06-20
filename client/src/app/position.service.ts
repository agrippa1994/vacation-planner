import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  getCurrentPosition(): Promise<Position> {
    return new Promise((resolve: (value: Position) => void, reject) => {
      navigator.geolocation.getCurrentPosition((success) => {
        resolve(success);
      }, error => {
        reject(error);
      });
    });
  }
}
