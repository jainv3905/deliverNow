import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

interface location{
  data: any,
  status: boolean
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  value=''
  inputText: string = '';
  input: boolean = false
  obj: object;
  currentLocation: string;
  locationDetails: any;

  constructor(private http: HttpClient){}

  onInputChange(){
    console.log(this.inputText, "inputtttttttt")
    if(this.inputText.length> 0){
      this.input = true;
    }
    
    // console.log(this.inputText, "xfcgvbhjnk");
    this.http.get<location>(`http://191.101.229.162:47000/api/v1/user/get-location?name=${this.inputText}`)
    .subscribe(res => {
      // console.log(res.data.predictions, "resssss")
      this.obj = res.data.predictions;
    }, (err) => {
      console.log(err, "err");
    })
  }

  onclick(values : string){
    console.log(values, "eventtt");
    this.inputText = values
    this.input = false
  }

  onSubmit(form){
    console.log(form, 'fgvhbjk')
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.currentLocation = `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`;
          console.log(this.currentLocation, "xdcfgvbhj");

          const apiKey = 'AIzaSyCGmrsyl4cNgdSzXELMguT82taHAhXvNk4'; // Replace with your Google Maps API key

          const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${apiKey}`;

         this.http.get(url)
      .subscribe(
        (response: any) => {
          console.log(response, "zdfgvhbjerxtcfgv")
          if (response.status === 'OK' && response.results.length > 0) {
            this.locationDetails = response.results[0].formatted_address;
            console.log(this.locationDetails, "locationnnnnnn");
            this.inputText = this.locationDetails
          } else {
            console.log('Failed to retrieve location details.');
          }
        },
        (error) => {
          console.log('Error occurred while retrieving location details:', error);
        }
      );
        },
        (error) => {
          console.log('Error occurred while retrieving location:', error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }
}
