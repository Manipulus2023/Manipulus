import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Job } from '../job/job';
import { HttpErrorResponse } from '@angular/common/http';
import { locationService } from './location.service';
import { Locations } from './locations';
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {


  public locations : Locations[] =[];
  constructor(private locationservice: locationService) { }

  title = 'angular-google-maps-app';

  @ViewChild('myGoogleMap', { static: false })
  map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false })
  info!: MapInfoWindow;

  zoom = 8;
  maxZoom = 15;
  minZoom = 2;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    mapTypeId: 'hybrid',
    maxZoom:this.maxZoom,
    minZoom:this.minZoom,
  }
 
 
  markers = [{
    position: {
      lat: 6.703119222637678,
      lng: 80.04732607841797
    },
    label: {
      color: "blue",
      fontWeight :'bold',
      text: "Marker label 1"
    },
    title: "Marker title 1",
    info: "Marker info 1",
    options: {
      animation: 2
    }
  }, {
    position: {
      lat: 6.766877533363286,
      lng: 79.98003481865234
    },
    label: {
      color: "blue",
      fontWeight :'bold',
      text: "Marker label 2"
    },
    title: "Marker title 2",
    info: "Marker info 2",
    options: {
      animation: 2
    }
  }]  as  any;



  
  infoContent = ''

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
  }

  eventHandler(event: any ,name:string){
    console.log(event,name);
    
    // Add marker on double click event
    if(name === 'mapDblclick'){
      this.dropMarker(event)
    }
  }

  dropMarker(event:any) {
    this.markers.push({
      position: {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      },
      label: {
        color: 'blue',
        fontWeight :'bold',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: 'Marker info ' + (this.markers.length + 1),
      options: {
        animation: google.maps.Animation.DROP,
      },
    })
    console.log(this.markers)
  }

  openInfo(marker: MapMarker, content: string) {
    this.infoContent = content;
    this.info.open(marker)
  }



}