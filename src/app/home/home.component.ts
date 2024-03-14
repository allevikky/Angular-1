import { Component, OnDestroy, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import {  Product } from './home.module';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy{
  products: Product[] = [];
  productsSubs$: Subscription = new Subscription();
  
  

    constructor(private _homeService: HomeService) {
      
    }

  ngOnInit(): void {

       this.productsSubs$ = this._homeService.getProducts().subscribe((data) => {
        this.products = data;
      });
  }

  
  ngOnDestroy(): void {
    this.productsSubs$.unsubscribe;
  }

}
