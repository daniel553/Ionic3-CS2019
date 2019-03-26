import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ProductProvider } from "../../providers/product/product";


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
	public bestSellerProducts = [];

  constructor(private productProvider: ProductProvider, public navCtrl: NavController) {

  }
  /**
  *	This function have in stand by the list of best products
  *	@function 
  */
  ionViewDidLoad(){
  	this.productProvider.getProducts()
  		.subscribe((allProducts: Array<any>)=> {
  			this.bestSellerProducts = allProducts.filter(product=> product.bestSeller == true);
  			console.log(this.bestSellerProducts);
  		});
  }

}
