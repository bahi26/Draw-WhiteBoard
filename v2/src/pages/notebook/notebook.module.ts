import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotebookPage } from './notebook';

@NgModule({
  declarations: [
    NotebookPage,
  ],
  imports: [
    IonicPageModule.forChild(NotebookPage),
  ],
})
export class NotebookPageModule {}
