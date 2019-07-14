import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  rooms_list: any[];
  ip="193.227.9.124:37225";   //"193.227.9.124:37225";
  key;
  userid;
  username;
  constructor(public navCtrl: NavController, public navParams: NavParams,private store: Storage, public http: Http) {
  }



  callback(data) {

    this.rooms_list = data.data;
    console.log('data', data);

  }





  ngOnInit(){
    this.store.get("key").then(val=>{
      this.key=val;
      this.store.get("user_id").then(val1 =>{
        this.userid=val1;
        this.store.get("username").then(val2 =>{
          this.username=val2;
          this.http.get("http://"+this.ip+"/personal_rooms/?key=" + this.key).map(res => res.json()).subscribe(data =>
            this.callback(data));
        });

      });

    });
  }



}




