import { Component, OnInit, ViewEncapsulation } from '@angular/core';

interface City {
  id: number;
  city_name: string;
  prov_name: string;
}

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CitiesComponent implements OnInit {

  cityList: City[] = [
    { id: 1, city_name: 'Bandung', prov_name: 'Jawa Barat' },
    { id: 2, city_name: 'Jakarta', prov_name: 'DKI Jakarta' },
    { id: 3, city_name: 'Surabaya', prov_name: 'Jawa Timur' },
    { id: 4, city_name: 'Yogyakarta', prov_name: 'DI Yogyakarta' },
    { id: 5, city_name: 'Semarang', prov_name: 'Jawa Tengah' },
    { id: 6, city_name: 'Medan', prov_name: 'Sumatera Utara' },
    { id: 7, city_name: 'Tangerang', prov_name: 'Banten' },
    { id: 8, city_name: 'Denpasar', prov_name: 'Bali' },
    { id: 9, city_name: 'Makasar', prov_name: 'Sulawesi Selatan' }
  ];

  newCity: City = { id: 0, city_name: '', prov_name: '' };
  isEditMode = false;
  editIndex: number | null = null;

  constructor() { }

  ngOnInit() {
    console.log('City Component Init');
  }

  addCity() {
    if (!this.newCity.city_name.trim() || !this.newCity.prov_name.trim()) {
      return;
    }

    const nextId = this.cityList.length > 0 ? Math.max(...this.cityList.map(c => c.id)) + 1 : 1;
    this.cityList.push({
      id: nextId,
      city_name: this.newCity.city_name.trim(),
      prov_name: this.newCity.prov_name.trim()
    });
    this.resetForm();
  }

  startEdit(city: City, index: number) {
    this.isEditMode = true;
    this.editIndex = index;
    this.newCity = Object.assign({}, city);
  }

  saveCity() {
    if (this.editIndex === null) {
      return;
    }
    if (!this.newCity.city_name.trim() || !this.newCity.prov_name.trim()) {
      return;
    }

    this.cityList[this.editIndex] = {
      id: this.newCity.id,
      city_name: this.newCity.city_name.trim(),
      prov_name: this.newCity.prov_name.trim()
    };
    this.resetForm();
  }

  cancelEdit() {
    this.resetForm();
  }

  deleteCity(index: number) {
    this.cityList.splice(index, 1);
    this.resetForm();
  }

  private resetForm() {
    this.isEditMode = false;
    this.editIndex = null;
    this.newCity = { id: 0, city_name: '', prov_name: '' };
  }
}
