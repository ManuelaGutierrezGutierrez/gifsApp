import { Component, ElementRef, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  @ViewChild("txtSearch") txtBuscar!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService){}

  search() {
   const value =  this.txtBuscar.nativeElement.value;

   if ( value.trim().length === 0) {
    return
   }

   this.gifsService.searchGifs(value)

   this.txtBuscar.nativeElement.value = "";

  }




}
