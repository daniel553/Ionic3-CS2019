import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MediaPlugin, MediaObject } from "@ionic-native/media";

/**
 * Generated class for the MusicPlayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-music-player',
  templateUrl: 'music-player.html',
})
export class MusicPlayerPage {
  public music = {};	
  private songMedia: MediaObject = null;
  private isMusicPaused = false;
	/**
	*This function initiallize all the imports
	*@constructor
	*/
  constructor(
  	private mediaPlugin: MediaPlugin,
  	public navCtrl: NavController, 
  	public navParams: NavParams) {
  		this.music = this.navParams.get("music");
  }

  /**
	*This function charge the content of the json selected file
	*@function
  */
  ionViewDidLoad() {
    
  }

  /**
	This function will exit the music player propertly
	*@function
  */
  ionViewWillLeave(){
  	this.stopMusic();
  }

  /**
	*This function play the selected music
	*@function
  */
  playMusic(){
  	if(this.songMedia === null){
  		this.songMedia = this.mediaPlugin.create(this.music["music_url"]);
  		this.songMedia.play();
  	}else{
  		if(this.isMusicPaused === true){
  			this.songMedia.play();
  			this.isMusicPaused = false;
  		}
  	}
  }

  /**
	*This function pause the selected music
	*@function
  */
  pauseMusic(){
  	if(this.songMedia !== null){
  		this.songMedia.pause();
  		this.isMusicPaused = true;
  	}
  }

  /**
	*This function stop the selected music
	*@function
  */
  stopMusic(){
  	if(this.songMedia !== null){
  		this.songMedia.stop();
  		this.songMedia.release();
  		this.songMedia = null;
  	}
  }
}
