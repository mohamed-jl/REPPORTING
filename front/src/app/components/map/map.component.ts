import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit{
  startDate: string;
  endDate: string;

  constructor(private httpClient: HttpClient) {
    this.startDate = '';
    this.endDate = '';
  }

  ngOnInit(): void {
    const map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy;  <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    }).addTo(map);
  }

  getSites(numberOfSites: number | string): void {
    const startDate = this.startDate;
    const endDate = this.endDate;

    this.httpClient.get<any[]>(`http://10.82.11.8:8080/RestMap/rest/map/getSites/${startDate}/${endDate}/${numberOfSites}`)
      .subscribe((data) => {
        const map = L.map('map');
        map.setView([0, 0], 2);

        L.tileLayer('YOUR_TILE_LAYER_URL', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        }).addTo(map);

        data.forEach((site) => {
          const marker = L.marker([site.latitude, site.longitude]).addTo(map);
          marker.bindPopup(`
            <strong>Name:</strong> ${site.name}<br>
            <strong>Duree:</strong> ${site.duree}<br>
            <strong>CA:</strong> ${site.ca}<br>
            <strong>NbAbonne:</strong> ${site.nbabonne}<br>
            <strong>NbAppel:</strong> ${site.nbappel}
          `);
        });
      });
  }
}
