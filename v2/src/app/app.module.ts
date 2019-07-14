import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpModule} from '@angular/http';
import { LoginPage } from '../pages/login/login';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { HomePage } from '../pages/home/home';
import { CanvasDrawComponent } from '../components/canvas-draw/canvas-draw'
import { CanvNotebookComponent } from '../components/canv-notebook/canv-notebook'
import{RoomPage} from '../pages/room/room';
import{RegisterationPage} from '../pages/registeration/registeration';
import {SinglePage} from '../pages/single/single';
import {NotebookPage } from'../pages/notebook/notebook';
import { ProfilePage } from '../pages/profile/profile';
import  {TabsPage} from '../pages/tabs/tabs';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
var config: SocketIoConfig = { url: '193.227.9.124:37225', options: {} };
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CanvasDrawComponent,
    CanvNotebookComponent,
    LoginPage,
  RoomPage,
  RegisterationPage,
  ProfilePage,
  TabsPage,
  NotebookPage,
  SinglePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    SocketIoModule.forRoot(config),
     IonicStorageModule.forRoot({name:'__mydb',driverOrder:['localstorage']

     })
  ],
  
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
  RoomPage,
  RegisterationPage,
  ProfilePage,
  TabsPage,
  NotebookPage,
  SinglePage
  ],
  providers: [
    StatusBar,
    SplashScreen,

    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
