import { Component } from '@angular/core';
import { HttpModule } from "@angular/http";
import "rxjs/add/operator/map";

import { NavController, ModalController } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';

import { ProductDetailPage } from "../product-detail/product-detail";
import { FilterModalPage } from "../filter-modal/filter-modal";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public allProducts = []; 
  private femaleSelected = true;
  private maleSelected = true;

	/**
	*	This is the main constructor of the page and only load once	
	*	@constructs
	*/
  constructor(private modalController: ModalController, private productProvider: ProductProvider, private http: HttpModule, public navCtrl: NavController) {

  }

  /**
	*	This event determines if a user can enter a page or not
  	*	Fires every time a page is being navigated to
  	*	@function
  */
  ionViewCanEnter(){

  }

  /**
  *  This function make the functionality to the bottom right button
  *  @function
  */
  openFilterModal(){
    let filterStateFromMainPage = {
      femaleSelected: this.femaleSelected,
      maleSelected: this.maleSelected
    };

    let openFilterModal = this.modalController.create(FilterModalPage, filterStateFromMainPage);
    openFilterModal.onDidDismiss((filterState)=>{
      this.femaleSelected = filterState.femaleSelected;
      this.maleSelected = filterState.maleSelected;
      
      this.productProvider.getProducts()
        .subscribe((allProducts: any[])=>{
          let products = allProducts;
          if(filterState.maleSelected && filterState.femaleSelected){
            this.allProducts = products;
            return;
          } else if(!filterState.maleSelected && !filterState.femaleSelected){
            this.allProducts = [];
            return;
          }else if(!filterState.maleSelected && filterState.femaleSelected){
            this.allProducts = products.filter((product)=>{
               return product.gender !== "male";
            });
          }else{
            this.allProducts = products.filter((product)=>{
               return product.gender !== "female";
            });
          }
        });
    });
    openFilterModal.present();
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
