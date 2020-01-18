import { InMemoryDbService } from 'angular-in-memory-web-api';
//import { Car } from '../models/car';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    // const cars = []
    return {};
  }

  // genId(cars: Car[]): number {
  //   return cars.length > 0 ? Math.max(...cars.map(car => car.id)) + 1 : 11;
  // }
}
