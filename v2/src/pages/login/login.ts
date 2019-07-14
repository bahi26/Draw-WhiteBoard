import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert } from 'ionic-angular';
import{HomePage} from '../home/home';
import{RegisterationPage} from '../registeration/registeration';
import{TabsPage} from '../tabs/tabs';
import{Storage} from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
/**style="background-image: url(../../img/test.png);"*/
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  ip="193.227.9.124:37225";   //"193.227.9.124:37225";

  constructor(public navCtrl: NavController, public navParams: NavParams,private store:Storage, public http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

 logging(user,pass)
  {
    user=user.trim();
    pass=pass.trim();
    console.log("user:",user,"pass:",pass);
    if(user!= "" && pass!=""){


   this.http.get("http://"+this.ip+"/login/?user="+user+"&pass="+pass).map(res => res.json()).subscribe(data => {
    if(data.check=== true)  {

      this.callback(data);

    }
    else{

      alert("Wrong user name or password");
    }
});



  }
    else alert("Please fill all required information");
  }



  Register()
  {

    this.navCtrl.push(RegisterationPage);
  }

  callback(data){
    console.log("data",String(data.data[0].type));
    console.log("key",data.key);
    this.store.set('logged','true');
    this.store.set('type',String(data.data[0].type)).then(val=>{
      this.store.set('key',String(data.key)).then(d =>{
        this.store.set('username',String(data.data[0].username)).then(d2 =>{
       this.store.set("user_id",String(data.data[0].id)).then(d3=>{



        this.navCtrl.push(TabsPage);
      });
         });
      });
    });
this.store.get("username").then(val=> {
  console.log("type is "+val);
});



    }

}
