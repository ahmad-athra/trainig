import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TaskListPage } from './task-list/task-list.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'task-list',
    pathMatch: 'full'
  },
  {
    path: 'task-list',
    loadChildren: () => import('./task-list/task-list.module').then( m => m.TaskListPageModule)
  },
  {
    path: 'add-task',
    loadChildren: () => import('./task-list/add-task/add-task.module').then( m => m.AddTaskPageModule)
  },
  {
    path: 'add-task/:id',
    loadChildren: () => import('./task-list/add-task/add-task.module').then( m => m.AddTaskPageModule)
  },
  {
    path:'chart',
    loadChildren:() => import ('./task-list/chart-modal/chart-modal.module').then(m=>m.ChartModalPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
