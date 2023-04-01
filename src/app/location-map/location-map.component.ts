import {Component, OnInit} from '@angular/core';
import {LocationService} from "../location.service";
import {} from 'googlemaps';

@Component({
  selector: 'app-location-map',
  template: `
    <div id="map" style="height: 400px;"></div>
    <div><h3>altitude : <br> {{latitude}}</h3></div>
    <div><h3>longitude : <br> {{longitude}}</h3></div>
  `,
  styles: [`
    #map {
      width: 100%;
    }
  `]
})
export class LocationMapComponent implements OnInit {
  private map?: google.maps.Map;
  latitude?: number;
  longitude?: number;

  constructor(private locationService: LocationService) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      });
    }
  }

  ngOnInit(): void {

    // Get the map element
    const mapElement = document.getElementById('map');
    if (!mapElement) {
      console.error('Map element not found');
      return;
    }

    // Initialize Google Maps
    this.map = new google.maps.Map(mapElement, {
      center: { lat: 37.7749, lng: -122.4194 },
      zoom: 12
    });

    const myLatLng: google.maps.LatLngLiteral = { lat: 37.7749, lng: -122.4194 };
    // Get location from service and add marker to map
    this.locationService.getLocation('San Francisco, CA').subscribe(location => {
      const marker = new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: this.map,
        title: location.formattedAddress
      });
      if (marker && marker.getPosition()) {
        this.map?.setCenter(marker.getPosition() ?? { lat: 0, lng: 0 });
      }
    });

  }

}
