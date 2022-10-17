import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'jBkQzf0e4rr5YtQsMAFvUdG880LSjAHe'

  private _historial: string[] = [];

  // Cambiar any por otro tipo

  public results: any[] = [];


get historial() {

  return [...this._historial];
}

constructor(private http: HttpClient) {}



searchGifs(query: string = "") {

  query = query.trim().toLowerCase();

if(!this._historial.includes(query)) {
  this._historial.unshift(query);
  this._historial = this._historial.splice(0,5)
}

this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=jBkQzf0e4rr5YtQsMAFvUdG880LSjAHe&q=${query}&limit=10`)
.subscribe((resp: any) => {
  console.log(resp.data);

  this.results = resp.data;

})

}


}
