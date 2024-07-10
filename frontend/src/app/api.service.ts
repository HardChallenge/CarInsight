import { Injectable } from '@angular/core'; 
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
  
@Injectable({ 
    providedIn: 'root'
}) 
export class ApiService { 
    constructor(private http: HttpClient) { } 
    getAll(){
        return this.http.get('http://localhost:3000/automobiles');
    }

    getById(id: number){
        return this.http.get(`http://localhost:3000/automobiles/${id}`);
    }

    postOne(data: any){
        return this.http.post('http://localhost:3000/automobiles', data);
    }

    postRandom(count: number){
        return this.http.post('http://localhost:3000/automobiles/random', {'count': count});
    }

    deleteById(id: number){
        return this.http.delete(`http://localhost:3000/automobiles/${id}`);
    }

    deleteByBrand(brand: string){
        return this.http.delete(`http://localhost:3000/automobiles/brand/${brand}`);
    }

    putById(id: number, data: any){
        return this.http.put(`http://localhost:3000/automobiles/${id}`, data);
    }

    putRegenerate(id: number){
        return this.http.put(`http://localhost:3000/automobiles/${id}/regenerate`, {});
    }

    patchById(id: number, data: any){
        return this.http.patch(`http://localhost:3000/automobiles/${id}`, data);
    }

}
@Injectable()
export class CarInfoService{
    constructor(private http: HttpClient) { } 

    getVinInfo(vin: string){
        return this.http.get(`http://localhost:3000/carinfo/${vin}`);
    }

    getCarInfo(queryString: string){
        return this.http.get(`http://localhost:3000/carinfo?${queryString}`);
    }
    
}

@Injectable()
export class NewsService{
    constructor(private http: HttpClient) { } 

    getNews(queryString: string){
        return this.http.get(`http://localhost:3000/news?${queryString}`);
    }
}