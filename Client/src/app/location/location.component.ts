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

  zoom = 9;
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
      lat:-10.5003747,
      lng: -10.5003747
    },
    label: {
      color: "blue",
      fontWeight :'bold',
      text: "Marker label 2"
    },
    title: "",
    info: "",
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
    this.getLocations();
    this.dropMarkers(this.locations);
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

  dropMarkers(locations: Locations[]) {
    console.log('dropMarkers', locations)
    // console.log('in drop a',this.locations[1].location_lat);
    for (const location of locations) {
      this.markers.push({
        position: {
          lat: location.location_lat,
          lng: location.location_lng,
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
      });
    }
    console.log(this.markers);
  }
  

  openInfo(marker: MapMarker, content: string) {
    this.infoContent = content;
    this.info.open(marker)
  }



  public getLocations(): void {
    {
      this.locationservice.getlocationlist().subscribe(
        (response: Locations[]) => {
          this.locations = response;
          for (const location of this.locations) {
            console.log(location);
            this.markers.push({
              position: {
                lat: location.location_lat,
                lng: location.location_lng,
              },
              label: {
                color: 'white',
                fontWeight :' italic',
                text: (location.location_info.job_type)+' job @ Customer ' + (location.location_info.customer.name),
              },
              title: location.location_title,
              info: (location.location_info.job_type)+' job @ Customer ' + (location.location_info.customer.name)  +' Contact Number: ' +(location.location_info.customer.contactNumber),
              options: {
                animation: google.maps.Animation.DROP,
              },
            });
          }
          console.log("after get locations" , this.markers);
        },
        (error: HttpErrorResponse) => alert(error.message)
      );
    }
  }


}