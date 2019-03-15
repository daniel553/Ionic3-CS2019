import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { MusicProvider } from "../../providers/music/music";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	public allMusic = [];

	/**
	This function initialice the imports
	@constructor
	*/
  constructor(
  	private loadingController: LoadingController,
  	public navCtrl: NavController, 
  	private musicProvider: MusicProvider) {
  	
  }

	/**
	* This function charge the content of our page...
	@function
	*/
  ionViewDidLoad(){
  	let allMusicLoadingController = this.loadingController.create({
  		content: "Getting Your Music From Server"
  	});
  	//Line to show a loading message
  	allMusicLoadingController.present();
  	this.musicProvider.getMusic()
  		.subscribe((musicList: any[]) => {
  			//Line to disapear the loading message when fully charged
  			allMusicLoadingController.dismiss();
  			this.allMusic = musicList
  		});	
  }

  /**
  *This function allow the user to add songs to the list
  *@function
  */
  addOneSong(refresher){
  	this.musicProvider.getOneSong()
  		.subscribe((oneSong) => {
  			this.allMusic.unshift(oneSong[0]);
  			refresher.complete();
  		});
  }

}
