import { Component, Inject } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-backend-form',
  templateUrl: './backend-form.component.html',
  styleUrls: ['./backend-form.component.css']
})
export class BackendFormComponent {
  getAllIndex: number = 0;
  postRandomIndex: number = 0;
  id: number = 1;
  type: string = "VOLKSWAGEN";
  brand: string = "GOLF";
  color: string = "GREY";
  year: number = new Date().getFullYear();
  vin: string = "VWVSDJSP586975";
  count: number = 1;

  type_patch: string = "";
  brand_patch: string = "";
  color_patch: string = "";
  year_patch: number = 0;
  vin_patch: string = "";


  responseData: Map<string, any> = new Map<string, any>();

  private apiService: ApiService;
  constructor(@Inject(ApiService) apiService: ApiService) { 
    this.apiService = apiService;
  }; 

  submitGetId() {
    this.apiService.getById(this.id).subscribe({
      next: (result) => {
        this.responseData.set("GetById", JSON.parse(JSON.stringify(result)));
      },
      error: (err) => {
        this.responseData.set("GetById", JSON.parse(JSON.stringify(err.error)));
      }
    })
  };
    

  submitGetAll(){
    this.getAllIndex = 0;
    this.apiService.getAll().subscribe(
      {
        next: (result) => {
          this.responseData.set("GetAll", JSON.parse(JSON.stringify(result)));
        }, 
        error: (err) => {
          this.responseData.set("GetAll", JSON.parse(JSON.stringify(err.error)));
        },

      });
  }

  submitPostOne(){
    this.apiService.postOne({type: this.type, brand: this.brand, year: this.year, color: this.color, vin: this.vin}).subscribe({
      next: (result) => {
        this.responseData.set("PostOne", JSON.parse(JSON.stringify(result)));
      },
      error: (err) => {
        this.responseData.set("PostOne", JSON.parse(JSON.stringify(err.error)));
      }
    });
  }

  submitPostRandom(){
    this.postRandomIndex = 0;
    this.apiService.postRandom(this.count).subscribe({
      next: (result) => {
        this.responseData.set("PostRandom", JSON.parse(JSON.stringify(result)));
      },
      error: (err) => {
        this.responseData.set("PostRandom", JSON.parse(JSON.stringify(err.error)));
      }
    });
  }

  submitDeleteId(){
    this.apiService.deleteById(this.id).subscribe({
      next: (result) => {
        this.responseData.set("DeleteById", JSON.parse(JSON.stringify(result)));
      },
      error: (err) => {
        this.responseData.set("DeleteById", JSON.parse(JSON.stringify(err.error)));
      }
    });
  }

  submitDeleteBrand(){
    this.apiService.deleteByBrand(this.brand).subscribe({
      next: (result) => {
        this.responseData.set("DeleteByBrand", JSON.parse(JSON.stringify(result)));
      },
      error: (err) => {
        this.responseData.set("DeleteByBrand", JSON.parse(JSON.stringify(err.error)));
      }
    });
  }

  submitPutId(){
    this.apiService.putById(this.id, {type: this.type, brand: this.brand, year: this.year, color: this.color, vin: this.vin}).subscribe({
      next: (result) => {
        this.responseData.set("PutById", JSON.parse(JSON.stringify(result)));
      },
      error: (err) => {
        this.responseData.set("PutById", JSON.parse(JSON.stringify(err.error)));
      }
    });
  }

  submitPutRegenerate(){
    this.apiService.putRegenerate(this.id).subscribe({
      next: (result) => {
        this.responseData.set("PutRegenerate", JSON.parse(JSON.stringify(result)));
      },
      error: (err) => {
        this.responseData.set("PutRegenerate", JSON.parse(JSON.stringify(err.error)));
      }
    });
  }

  submitPatchId(){
    let object: any = {};
    if(this.type_patch !== ""){
      object["type"] = this.type_patch;
    }
    if(this.brand_patch !== ""){
      object["brand"] = this.brand_patch;
    }
    if(this.color_patch !== ""){
      object["color"] = this.color_patch;
    }
    if(this.year_patch !== 0){
      object["year"] = this.year_patch;
    }
    if(this.vin_patch !== ""){
      object["vin"] = this.vin_patch;
    }
    this.apiService.patchById(this.id, object).subscribe({
      next: (result) => {
        this.responseData.set("PatchById", JSON.parse(JSON.stringify(result)));
      },
      error: (err) => {
        this.responseData.set("PatchById", JSON.parse(JSON.stringify(err.error)));
      }
    });

    this.type_patch = "";
    this.brand_patch = "";
    this.color_patch = "";
    this.year_patch = 0;
    this.vin_patch = "";
  }



  nextObject(method: string){
    switch(method){
      case "GetAll":
        this.getAllIndex = (this.getAllIndex + 1) % this.responseData.get("GetAll").data.length;
        break;
      case "PostRandom":
        this.postRandomIndex = (this.postRandomIndex + 1) % this.responseData.get("PostRandom").data.length;
        break;
    }
  }

  previousObject(method: string){
    switch(method){
      case "GetAll":
        if (this.getAllIndex === 0) {
          this.getAllIndex = this.responseData.get("GetAll").data.length - 1;
        } else {
          this.getAllIndex = (this.getAllIndex - 1) % this.responseData.get("GetAll").data.length;
        }
        break;
      case "PostRandom":
        if (this.postRandomIndex === 0) {
          this.postRandomIndex = this.responseData.get("PostRandom").data.length - 1;
        } else {
          this.postRandomIndex = (this.postRandomIndex - 1) % this.responseData.get("PostRandom").data.length;
        }
        break;
    }
  }
}
