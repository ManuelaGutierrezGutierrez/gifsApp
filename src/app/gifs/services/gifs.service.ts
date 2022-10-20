import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'jBkQzf0e4rr5YtQsMAFvUdG880LSjAHe'

  private _historial: string[] = [];

  public results: Gif[] = [];


get historial() {

  return [...this._historial];
}

constructor(private http: HttpClient) {

  if(localStorage.getItem('historial')) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.results = JSON.parse(localStorage.getItem('results')!) || []
  }

}



searchGifs(query: string = "") {

  query = query.trim().toLowerCase();

if(!this._historial.includes(query)) {
  this._historial.unshift(query);
  this._historial = this._historial.splice(0,10)

  localStorage.setItem('historial', JSON.stringify(this._historial))
}

this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=jBkQzf0e4rr5YtQsMAFvUdG880LSjAHe&q=${query}&limit=10`)
.subscribe((resp) => {
  console.log(resp.data);

  this.results = resp.data;
  localStorage.setItem('results', JSON.stringify(this.results))

})

}


}
