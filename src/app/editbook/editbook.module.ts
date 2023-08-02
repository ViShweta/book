import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditbookPageRoutingModule } from './editbook-routing.module';

import { EditbookPage } from './editbook.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditbookPageRoutingModule
  ],
  declarations: [EditbookPage]
})
export class EditbookPageModule {}
