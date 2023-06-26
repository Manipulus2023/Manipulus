import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Job } from '../job/job';
import { HttpErrorResponse } from '@angular/common/http';
import { locationService } from './location.service';
import { Locations, NewLocation } from './locations';
import { FormControl, FormsModule, NgForm } from '@angular/forms';
import { Customer } from '../customer/customer';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  searchControl = new FormControl();
  autocomplete: google.maps.places.Autocomplete | undefined;

  lastClickedLat:number | undefined;
  lastClickedLng: number | undefined;
  public customers!: Customer;
  public customersList: Customer[] = [];
  public locations : Locations[] =[];
  public customerId!: number;
  geocoder: google.maps.Geocoder | undefined;

  constructor(private location_service: locationService) {
    this.lastClickedLat = undefined;
    this.lastClickedLng = undefined;
  }
  private initGeocoder() {
    this.geocoder = new google.maps.Geocoder();
  }
  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
      this.initGeocoder();
    })
    this.dropMarkers(this.locations);
    this.getCustomers();

    this.initAutocomplete();

  } private initAutocomplete() {
    const input = document.getElementById('search-input') as HTMLInputElement;
    this.autocomplete = new google.maps.places.Autocomplete(input, { types: ['geocode'] });
    this.autocomplete.addListener('place_changed', () => {
      const place: google.maps.places.PlaceResult | undefined = this.autocomplete?.getPlace();

      if (place?.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        // Do something with the selected location
        console.log('Selected location:', lat, lng);
        // Call your desired method or perform any other actions here
      }
    });
  }

  search() {
    const query = this.searchControl.value;
    if (query && this.geocoder) {
      this.geocoder.geocode({ address: query }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results && results.length > 0) {
          const location = results[0].geometry.location;
          const lat = location.lat();
          const lng = location.lng();

          // Do something with the selected location
          this.center={
            lat: lat,
            lng: lng,
          }
          console.log('Selected location:', lat, lng);
          // Call your desired method or perform any other actions here
        } else {
          console.log('Geocode was not successful for the following reason:', status);
        }
      });
    }
  }

  public findCustomerById(customerId: number): void {
    {
      this.location_service.findCustomerById(customerId).subscribe(
        (response: Customer) => {
          this.customers = response;
          console.log(this.customers);
        },
        (error: HttpErrorResponse) => alert(error.message)
      );
    }
  }

  public getCustomers(): void {
    {
      this.location_service.getCustomerList().subscribe(
        (response: Customer[]) => {
          this.customersList = response.filter(
            (customer) => customer.active_status
          );
          console.log(this.customersList);
        },
        (error: HttpErrorResponse) => alert(error.message)
      );
    }
  }

  title = 'angular-google-maps-app';

  @ViewChild('myGoogleMap', { static: false })
  map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false })
  info!: MapInfoWindow;

  zoom = 12;
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
 
 
  markers = {
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
  } as  any;
  
  infoContent = ''

  eventHandler(event: any ,name:string){
    console.log(event,name);
    // Add marker on double click event
    if(name === 'mapClick'){
      this.dropMarker(event)
    }
  }
  dropMarker(event: any) {
    console.log('dropMarker', event)
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
  
    this.markers = ({
      position: {
        lat: lat,
        lng: lng,
      },
      label: {
        color: 'blue',
        fontWeight: 'bold',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: 'Marker info ' + (this.markers.length + 1),
      options: {
        animation: google.maps.Animation.DROP,
      },
    });
    console.log('dropMarker lat', lat)
    this.lastClickedLat = lat;
    this.lastClickedLng = lng;
    console.log(this.lastClickedLat);

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

  // submitForm(form: NgForm) {
  //   console.log(form.value);
  //   console.log(form.value.location_lat ,"form.value.location_lat");
  //   const locationData:NewLocation = {
  //     location_lat: form.value.location_lat,
  //     location_lng: form.value.location_lng
  //   };

  //   console.log(locationData,"locationData");
  
  //   const customerId: number = this.customerId;  // Get the customerId from the component's variable
  
  
  //   this.location_service.addlocation(locationData,customerId).subscribe(
  //     (response: NewLocation) => {
  //       console.log(response);
  //       // Perform any additional actions after successfully adding the location
  //     },
  //     (error: HttpErrorResponse) => {
  //       console.error(error);
  //       // Handle any errors that occur during the request
  //     }
  //   );
  
  //   // Reset the form after submission if needed
  //   form.reset();
  // }
  
  
submitForm(form: NgForm) {
    console.log(form.value);
  
    const locationData: NewLocation = {
      location_title: form.value.location_title,
      location_lat: form.value.latitude,
      location_lng: form.value.longitude
    };
  
    console.log("locationData" ,locationData, "locationData");
  
    this.location_service.addlocation(locationData, this.customerId).subscribe(
      (response: NewLocation) => {
        console.log(response);
        // Perform any additional actions after successfully adding the location
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        // Handle any errors that occur during the request
      }
    );
  
    // Reset the form after submission if needed
    form.reset();
  }
  

  // public getLocations(): void {
  //   {
  //     this.locationservice.getlocationlist().subscribe(
  //       (response: Locations[]) => {
  //         this.locations = response;
  //         for (const location of this.locations) {
  //           console.log(location);
  //           this.markers.push({
  //             position: {
  //               lat: location.location_lat,
  //               lng: location.location_lng,
  //             },
  //             label: {
  //               color: 'white',
  //               fontWeight :' italic',
  //               text: (location.location_info.job_type)+' job @ Customer ' + (location.location_info.customer.name),
  //             },
  //             title: location.location_title,
  //             info: (location.location_info.job_type)+' job @ Customer ' + (location.location_info.customer.name)  +' Contact Number: ' +(location.location_info.customer.contactNumber),
  //             options: {
  //               animation: google.maps.Animation.DROP,
  //             },
  //           });
  //         }
  //         console.log("after get locations" , this.markers);
  //       },
  //       (error: HttpErrorResponse) => alert(error.message)
  //     );
  //   }
  // }


  // Add new customer using customer service and reset form
  // public addlocation(addForm: NgForm): void {
  //   this.location_service.addlocation(addForm.value ,customerId ).subscribe(
  //     (response: Customer) => {
  //       console.log(response);
  //       this.getCustomers();
  //       this.dtoptions = {
  //         retrieve: true,
  //       };

  //       addForm.reset();
  //       window.location.reload();
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  }


