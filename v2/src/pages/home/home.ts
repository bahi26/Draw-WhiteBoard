import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import{RoomPage} from '../room/room';
import{ProfilePage} from '../profile/profile';
import{Storage} from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
Room_ID:any;
rooms=[];
 hide:boolean;
key;
  constructor(public navCtrl: NavController,private http:Http, private store:Storage) {
    this.check();
//console.log(this.store.get("key"));
    //this.socket.connect();
  }
ngOnInit(){
  this.store.get("key").then(val=>{

this.key=val;
 this.http.get("http://193.227.9.124:37225/rooms?+key="+this.key).map(res => res.json()).subscribe(data => {

     this.rooms=data.rooms;
   console.log('rooms',data.rooms[1]);
   console.log('rooms',this.rooms);
   console.log('rooms',data.rooms);

});
  });


}

addNewRoom(room_name)
{
  console.log(room_name);
  
  if(room_name==undefined ||room_name==""||room_name.trim=="")
  return;
 console.log("Room"+room_name);
  var key=this.key;
  var temp={
    key :this.key,
    room_name: room_name
  };
  console.log("key "+this.key);
  this.http.post("http://193.227.9.124:37225/room",temp).map(res => res.json()).subscribe(data => {
    if(data.check==true)
    this.navCtrl.push(RoomPage,{x:data.room_id,i:this.key});


});


}

Search(input)
{
   if(input==undefined ||input.trim=="")
  return;
  this.room(input);
}

check()
{
    this.store.get("type").then(val=>{
      console.log("value "+val);
if(val=="1")
this.hide=true;
else
this.hide=false;
console.log("status "+this.hide)
  });
}
room(x)
{
    this.Room_ID=x;
  this.store.set('Room_ID',this.Room_ID);
  this.store.set('Key',this.key);

console.log(this.Room_ID,this.key);
 this.http.get("http://193.227.9.124:37225/room?room="+this.Room_ID+"&key="+this.key).map(res => res.json()).subscribe(data => {
if (data.check==true)
 { console.log('data',data);
  this.navCtrl.push(RoomPage,{x:x,i:this.key});
 }
 else alert("room doesn't exist");

});

}
profile()
{
this.navCtrl.push(ProfilePage);
}
}
