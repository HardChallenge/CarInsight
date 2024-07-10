import { Component, Inject } from '@angular/core';
import { CarInfoService } from '../api.service';

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.css']
})
export class CarInfoComponent {
  constructor(private carInfoService: CarInfoService) { }

  vin: string = 'WVWZZZAUZKP558796';
  parameters = {
    make: '',
    model: '',
    year: '',
    fuel_type: 'All',
    limit: 10
  }

  searchCarsIndex: number = 0;
  
  carInfoResponse: Map<string, any> = new Map<string, any>();
  

  submitVinDecoder(){
    this.carInfoService.getVinInfo(this.vin).subscribe({
      next: (result) => {
        this.carInfoResponse.set("VinDecoder", JSON.parse(JSON.stringify(result)));
      },
      error: (err) => {
        this.carInfoResponse.set("VinDecoder", JSON.parse(JSON.stringify(err.error)));
      }
    })
  }

  submitSearchCars(){
    this.searchCarsIndex = 0;
    let queryString = '';
    if (this.parameters.make){
      queryString += `make=${this.parameters.make}&`;
    }
    if (this.parameters.model){
      queryString += `model=${this.parameters.model}&`;
    }
    if (this.parameters.year){
      queryString += `year=${this.parameters.year}&`;
    }
    if (this.parameters.fuel_type !== 'All'){
      queryString += `fuel_type=${this.parameters.fuel_type}&`;
    }
    if (this.parameters.limit){
      queryString += `limit=${this.parameters.limit}`;
    }

    this.carInfoService.getCarInfo(queryString).subscribe({
      next: (result) => {
        this.carInfoResponse.set("SearchCars", JSON.parse(JSON.stringify(result)));
      },
      error: (err) => {
        this.carInfoResponse.set("SearchCars", JSON.parse(JSON.stringify(err.error)));
      }
    })
  }

  nextObject(){
    this.searchCarsIndex = (this.searchCarsIndex + 1) % this.parameters.limit;
  }

  previousObject(){
    if (this.searchCarsIndex === 0) {
      this.searchCarsIndex = this.parameters.limit - 1;
    } else {
      this.searchCarsIndex = (this.searchCarsIndex - 1) % this.parameters.limit;
    }
  }
}
