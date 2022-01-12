import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { ChartsModule } from 'ng2-charts/ng2-charts'
//import { ChartsModule } from 'ng2-charts/ng2-charts';


import { TaskListPage } from './task-list.page';

const routes: Routes = [
  {
    path: '',
    component: TaskListPage
  },  {
    path: 'chart-modal',
    loadChildren: () => import('./chart-modal/chart-modal.module').then( m => m.ChartModalPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    //ChartsModule

  ],
  exports: [RouterModule],
})
export class TaskListPageRoutingModule {}
