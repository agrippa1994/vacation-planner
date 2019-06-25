import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
/**
 * class for getting user positiion
 */
export class PositionService {
    /**
     * get information about current user positiion
     * @returns {Promise<Position>}
     */
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
