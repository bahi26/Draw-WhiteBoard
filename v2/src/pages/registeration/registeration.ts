import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import {HomePage } from '../home/home';
import{Storage} from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import{TabsPage} from '../tabs/tabs';

declare var cordova: any;
import{LoginPage} from '../login/login';
/**
 * Generated class for the RegisterationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registeration',
  templateUrl: 'registeration.html',
})
export class RegisterationPage {
  lastImage: string = null;
  loading: Loading;
  type;
  imageFileName;
  selectedFile;
  ip="193.227.9.124:37225";
  constructor(private store:Storage, public http: Http,public navCtrl: NavController, public navParams: NavParams,public alerCtrl: AlertController, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterationPage');
  }

  Register(user,pass,img)
  {
    user=user.trim();
    pass=pass.trim();

    //console.log('data',user+' '+pass+' '+this.type);
    console.log("img ",this.selectedFile);

    if(user!= "" && pass!=""){
      let temp={
        user:user,
        pass:pass,
        type:this.type,


      } ;


      this.http.post("http://"+this.ip+"/register/",temp).map(res => res.json()).subscribe(data => {
        if(data.check=== true)  {

          this.callback(data);

          this.navCtrl.push(HomePage);
        }
        else{

          alert(data.data);
        }
      });




    }
    else alert("Please fill all required information");

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
  onFileChanged(event) {

    this.selectedFile = event.target.files[0];
    console.log("hiiiii",this.selectedFile);
    let temp={

      image:this.selectedFile
    };
    this.http.post("http://"+this.ip+"/upload",temp).map(res => res.json()).subscribe();

  }


}

