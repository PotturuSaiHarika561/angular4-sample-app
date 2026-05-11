import { Component, OnInit } from '@angular/core';
import { City } from '../models/city.model';
import { CityService } from '../services/city.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {

  cities: City[] = [];
  form: City = this.empty();
  isEdit = false;

  search = '';
  filtered: City[] = [];

  constructor(private cityService: CityService) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.cities = this.cityService.getAll();
    this.applyFilter();
  }

  applyFilter(): void {
  const q = (this.search || '').toLowerCase().trim();
  if (!q) {
    this.filtered = this.cities.slice();
    return;
  }

  this.filtered = this.cities.filter(c =>
    c.name.toLowerCase().indexOf(q) !== -1 ||
    c.state.toLowerCase().indexOf(q) !== -1 ||
    c.country.toLowerCase().indexOf(q) !== -1
  );
}

  startAdd(): void {
    this.isEdit = false;
    this.form = this.empty();
  }

  startEdit(city: City): void {
    this.isEdit = true;
    this.form = { ...city };
    window.scrollTo(0, 0);
  }

  save(): void {
    if (!this.form.name || !this.form.name.trim()) { alert('City name required'); return; }
    if (!this.form.state || !this.form.state.trim()) { alert('State required'); return; }
    if (!this.form.country || !this.form.country.trim()) { alert('Country required'); return; }
   if (this.form.population == null || this.form.population < 0) {
  alert('Population must be >= 0');
  return;
}

    if (this.isEdit) {
      const ok = this.cityService.update(this.form);
      if (!ok) alert('City not found!');
    } else {
      this.cityService.add(this.form);
    }

    this.refresh();
    this.startAdd();
  }

  remove(city: City): void {
    if (!confirm('Delete ' + city.name + '?')) return;
    this.cityService.delete(city.id);
    this.refresh();
  }

  private empty(): City {
    return { id: 0, name: '', state: '', country: '', population: 0 };
  }
}