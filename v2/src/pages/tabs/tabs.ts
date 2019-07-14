import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{ NotebookPage} from '../notebook/notebook';
import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';
/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = NotebookPage;
  tab3Root = ProfilePage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
   
  }

 

}
