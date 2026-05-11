import { Injectable } from '@angular/core';
import { City } from '../models/city.model';

@Injectable()
export class CityService {
  private cities: City[] = [
    { id: 1, name: 'Chennai', state: 'Tamil Nadu', country: 'India', population: 11000000 },
    { id: 2, name: 'Hyderabad', state: 'Telangana', country: 'India', population: 10000000 }
  ];

  private nextId = 3;

  getAll(): City[] {
    return this.cities.slice();
  }

  add(city: City): void {
    city.id = this.nextId++;
    this.cities.unshift({ ...city });
  }

  update(city: City): boolean {
    const idx = this.cities.findIndex(c => c.id === city.id);
    if (idx === -1) return false;
    this.cities[idx] = { ...city };
    return true;
  }

  delete(id: number): boolean {
    const before = this.cities.length;
    this.cities = this.cities.filter(c => c.id !== id);
    return this.cities.length !== before;
  }
}