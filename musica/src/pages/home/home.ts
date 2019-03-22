import { Component } from '@angular/core';
import { NavController, LoadingController, ActionSheetController } from 'ionic-angular';
import { MusicProvider } from "../../providers/music/music";
import { SocialSharing } from "@ionic-native/social-sharing";

import { MusicPlayerPage } from "../music-player/music-player";

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
    private socialSharing: SocialSharing,
    private actionSheetController: ActionSheetController,
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
  			this.allMusic.unshift(oneSong);
  			refresher.complete();
  		});
  }

  /**
  *This function allow the user to share the song on social media
  *@function
  */

  shareSong(music){
    let shareSongActionSheet = this.actionSheetController.create({
      title: "Share Song With Friends",
      buttons: [
        {
          text: "Share On Facebook",
          icon: "logo-facebook",
          handler: ()=> {
            this.socialSharing.shareViaFacebook(music.name, music.image, music.music_url);
          }
        },
        {
          text: "Share On Twitter",
          icon: "logo-twitter",
          handler: ()=> {
            this.socialSharing.shareViaTwitter(music.name, music.image, music.music_url);
          }
        },
        {
          text: "Share",
          icon: "share",
          handler: ()=> {
            this.socialSharing.share(music.name, "", music.image, music.music_url);
          }
        },
        {
          text: "Cancel",
          icon: "destructive"
        }
      ]
    });
    shareSongActionSheet.present();
  }

  /**
  * This function will play the songs
  * @function
  */
  goToMusicPlayer(music){
    this.navCtrl.push(MusicPlayerPage, {
      music: music
    });
  }

  /**
  * This function add music to favorite list
  * @function
  */
  addToFavorites(music){
    this.musicProvider.addToFavorites(music);
  }
}
