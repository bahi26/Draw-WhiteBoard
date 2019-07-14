import { Component,NgZone , ViewChild } from '@angular/core';
import * as io from 'socket.io-client';
import { NavController , Content ,FabContainer,NavParams} from 'ionic-angular';
import{Storage} from '@ionic/storage';
import {Socket, SocketIoConfig} from 'ng-socket-io';
import {HomePage} from "../home/home";

@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})
export class RoomPage {

  @ViewChild(Content) content : Content;
  messages :any = [];
  //socketHost :string ="http://localhost:3000/";

  chat:any;
  username: string;
  userTypeMsg : string="";
  zone:any;
  check:boolean;
  hide:boolean;
  hideMe:boolean;
  public buttonClicked: boolean = false; //Whatever you want to initialise it as
  room_id:any;
  user_id:any;


  constructor(public navCtrl: NavController,private navparams:NavParams,private store:Storage,private socket: Socket) {
    console.log("room_id" ,navparams.get("x"));
    console.log("user_id" ,navparams.get("i"));
    this.checkFun();
this.closeRoom();
this.store.get("username").then(val=>{

this.username=val;

  });
  
    this.room_id=navparams.get("x");
    this.user_id=navparams.get("i");
    console.log("Enter Constructor and room_id is : "+ this.room_id);
    console.log("user_entered: "+ this.user_id);
    this.socket.connect();
    this.socket.emit("connectt",{room:this.room_id,user:this.user_id});
    this.zone = new NgZone({enableLongStackTrace : false});
    this.socket.on("chat message",msg => {
console.log("username "+this.username);
      console.log("push msg");
      this.zone.run( () => {
        this.messages.push(msg);
        this.content.scrollToBottom();
      });
    });

    this.socket.on("User typing",data => {
      this.zone.run( () => {
        this.userTypeMsg = data.username + " is typing a message .....";
        this.content.scrollToBottom();
        setTimeout(() => {
            this.userTypeMsg = ''
          }, 5000)
      });
    });
  }
  close()
  {
    this.socket.emit("close");
  }

   chatSend(v)
   {
     let data ={
      message : v.chatText
     // username : this.username,
     // room_id:this.room_id
    }

     console.log("Enter Send"+data.message);
     this.socket.emit("new message",data);
     this.chat='';
   }
leave()
{
  this.socket.emit("leave");
  this.navCtrl.push(HomePage);
}
  eventHandler()
   {


    this.socket.emit('typing');
   }

  Show() {
  this.hideMe = true;
}

closeRoom()
{
  this.socket.on("close",msg => {
    alert(msg.message);
   this.leave();
  });
  }

  ShowNotebook()
  {
    this.hide=true;
  }

checkFun()
{
  this.socket.on('enter',(result)=> {
      this.check=result.check;
     
    });
}


}
