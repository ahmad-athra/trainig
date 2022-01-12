import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChartModalPageRoutingModule } from './chart-modal-routing.module';

import { ChartModalPage } from './chart-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChartModalPageRoutingModule
  ],
  declarations: [ChartModalPage]
})
export class ChartModalPageModule {}
