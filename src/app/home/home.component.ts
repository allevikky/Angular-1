import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HomeService } from './home.service';
import {  Product } from './home.module';
import { Subscription } from 'rxjs';
import { OverlayComponent } from '../overlay/overlay.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy{

  products: Product[] = [];
  productsSubs$: Subscription = new Subscription();

  @ViewChild('overlaycontent', {static: true})
  overlayContent: OverlayComponent | undefined;
  
  

    constructor(private _homeService: HomeService) {
      
    }

  ngOnInit(): void {

       this.productsSubs$ = this._homeService.getProducts().subscribe((data) => {
        this.products = data;
      });
  }

  titleClicked(e: Event, id: string): void {

    console.log(id);
    const productDetails = this.products.filter((item) => {return item.id === id});
    this.overlayContent?.displayOverlay(productDetails[0]);

  }
  
  ngOnDestroy(): void {
    this.productsSubs$.unsubscribe;
  }

}
