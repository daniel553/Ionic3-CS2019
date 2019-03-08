import { Component } from '@angular/core';
import { HttpModule } from "@angular/http";
import "rxjs/add/operator/map";

import { NavController } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';

import { ProductDetailPage } from "../product-detail/product-detail";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public allProducts = []; 

	/**
	*	This is the main constructor of the page and only load once	
	*	@constructs
	*/
  constructor(private productProvider: ProductProvider, private http: HttpModule, public navCtrl: NavController) {

  }

  /**
	*	This event determines if a user can enter a page or not
  	*	Fires every time a page is being navigated to
  	*	@function
  */
  ionViewCanEnter(){

  }

  /**
	*	This event fires when all internals are set up and ready to go
  	*	Fires only once
  	*	@function
  */
  ionViewDidLoad(){
  /**
    Specifically this function load all the products
  */
    this.productProvider.getProducts()
      .subscribe((response: any[]) => {
        this.allProducts = response;
      });
  }

  /**
  *  This functions send the user to the DetailPage
  *  @function
  */
  goToProductDetailPage(product){
      this.navCtrl.push(ProductDetailPage, {
        productDetails: product
      });
  }

  /**
	*	This event signals the start of the transition to bring the page into view
  	*	Fires every time a page is being navigated to
  	*	@function
  */
  ionViewWillEnter(){

  }

  /**
	*	This event signals the page is in view and 100% active
  	*	Fires every time a page is being navigated to
  	*	@function
  */
  ionViewDidEnter(){

  }

  /**
	*	This event determines if a user can leave the current page
  	*	Fires every time a page is being navigated away from
  	*	@function
  */
  ionViewCanLeave(){

  }

  /**
	*	This event signals the start of the transition to remove the page from the view
  	*	Fires every time a page is being navigated away from
  	*	@function
  */
  ionViewWillLeave(){

  }

  /**
	*	This event signals that the page is no longer visible and has been left
  	*	Fires every time a page is being navigated away from
  	*	@function
  */
  ionViewDidLeave(){
  	
  }

  /**
	*	This event signals that the page will be unloaded and removed from memory
  	*	Fires only once and the page is destroyed 
  	*	@function
  */
  ionViewWillUnload(){

  }

}
