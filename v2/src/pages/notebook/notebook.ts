import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{Storage} from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {SinglePage} from'../single/single';

/**
 * Generated class for the NotebookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notebook',
  templateUrl: 'notebook.html',
})
export class NotebookPage {
  key;
  id;
  ip="193.227.9.124:37225";   //"192.168.43.158:3000";
  images=[];
  boards=[];
  view: string = "note";
  constructor(public navCtrl: NavController, public navParams: NavParams,private http:Http, private store:Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotebookPage');
  }



  ngOnInit(){
    this.store.get("key").then(val=>{
      this.key=val;
      this.store.get("user_id").then(val1=>{
        console.log("id of user",val1);
        this.id=val1;
        console.log("http://"+this.ip+"/notebook?key="+this.key);
        this.http.get("http://"+this.ip+"/notebook?key="+this.key).map(res => res.json()).subscribe(data => {

          let no=data.data[0].note_book;
          for(let i=1;i<= no;i++){
            this.images.push({src:"http://"+this.ip+"/images/"+this.id+"p"+i+".jpg",name:"p"+i+".jpg"});


          }
          console.log("links_no",data.data[0].note_book);
          console.log("links",this.images);

        });

        this.http.get("http://"+this.ip+"/boards?key="+this.key).map(res => res.json()).subscribe(data => {
          console.log("http://"+this.ip+"/boards?key="+this.key);
          let temp=data.data;

          for(let i=0;i< temp.length;i++){
            this.boards.push({src:"http://"+this.ip+"/images/"+temp[i].id+".jpg",name:temp[i].name+'_'+temp[i].id+".jpg"});


          }
          console.log("boards",this.boards.length);


        });

      });


    });




  }

  viewimage(x){

    this.navCtrl.push(SinglePage,{"name":x.name,"src":x.src});


  }
}
