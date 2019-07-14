import { Component , ViewChild, Renderer} from '@angular/core';
import { Platform } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import{Storage} from '@ionic/storage';

/**
 * Generated class for the CanvNotebookComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'canv-notebook',
  templateUrl: 'canv-notebook.html'
})
export class CanvNotebookComponent {

  @ViewChild('myCanvas') canvas: any;
  canvasElement: any;
  lastX : number;
  lastY : number;
  id:0;
  date: any;
  lastRX : number;
  lastRY : number;
  isDown :boolean;
  currentColor : string ='#C91F37';
  currentSize : number =5;
  AvailableColors : any;
  CanvasWidth :any;
  CanvasHeight :any;

  constructor(public platform: Platform,private store:Storage, public renderer:Renderer,  private socket: Socket) {

    console.log('Hello CanvasDrawComponent Component');
    this.AvailableColors = [
     '#C91F37',
     '#19B5FE',
     '#5B3256',
     '#FFB61E'
    ];
  }

 




  ngAfterViewInit(){
   this.CanvasWidth = "600px";
    this.CanvasHeight ="400px";
    console.log(this.CanvasWidth);
    console.log(this.CanvasHeight);
    this.canvasElement=this.canvas.nativeElement;
    this.renderer.setElementAttribute(this.canvasElement,'width',this.CanvasWidth+'');
    this.renderer.setElementAttribute(this.canvasElement,'height',this.CanvasHeight+'');
  }
 sendmouseS(xpos, ypos,t) {
  // We are sending!

  
  // Make a little object with  and y
  var ev = {
    pageX: xpos,
    pageY: ypos,
    type: t
  };

  // Send that object to the socket
  this.socket.emit('mouse',ev);
}


 sendmouseM(xpos, ypos,col,s) {
  // We are sending!

  
  // Make a little object with  and y
  var ev = {
    pageX: xpos,
    pageY: ypos,
    type:'move',
    color:col,
    size:s

  };

  // Send that object to the socket
  this.socket.emit('mouse',ev);
}

  changeColor(c){

    this.currentColor = c;
  }

  changeSize(s){
   this.currentSize=s;

  }


  handleStartNote(ev)
  {
   console.log("starrtttttnotebook");
    this.lastX = ev.pageX;
    this.lastY = ev.pageY-50;
    this.isDown = true;
   // this.sendmouseS(this.lastX,this.lastY,'start');
    //console.log(this.lastX,this.lastY);
  }

  handleMoveNote(ev)
  {
  console.log("moveeenotebook");

    if(!this.isDown){return;}
  console.log(ev);

    let ctx = this.canvasElement.getContext('2d');
    ctx.strokeStyle=this.currentColor;
    let currentX = ev.pageX;
    let currentY = ev.pageY-50;


    ctx.beginPath();
    ctx.moveTo(this.lastX,this.lastY);
    ctx.lineTo(currentX,currentY);
    ctx.lineWidth =this.currentSize;
    ctx.stroke();

    this.lastX = currentX;
    this.lastY = currentY;
    
//this.sendmouseM(this.lastX,this.lastY,this.currentColor,this.currentSize);
  }

  handleEndNote(ev)
  {
    console.log("Endddnotebook"+ev);
    this.isDown = false;

var Data ={
image:  this.canvasElement.toDataURL('image/jpg').replace(/^data:image\/\w+;base64,/, "")
    };
    

this.socket.emit('Notebook',Data);

   // this.sendmouseS(this.lastX,this.lastY,'end');
  }
  newPage()
  {
    var SavedData ={
image:  this.canvasElement.toDataURL('image/jpg').replace(/^data:image\/\w+;base64,/, "")
    };
    

this.socket.emit('SaveNotebook',SavedData);
    this.canvasElement=this.canvas.nativeElement;
    this.renderer.setElementAttribute(this.canvasElement,'width',this.CanvasWidth+'');
    this.renderer.setElementAttribute(this.canvasElement,'height',this.CanvasHeight+'');
  }


}
