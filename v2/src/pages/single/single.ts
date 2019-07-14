import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SinglePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-single',
  templateUrl: 'single.html',
})
export class SinglePage {
name;
src;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.name=  navParams.get("name");
   this.src= navParams.get("src");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SinglePage');
  }

}
