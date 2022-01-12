import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../task';
import { TaskServiceService } from '../task-service.service';
import { StorageService } from 'src/app/storage.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
})
export class AddTaskPage implements OnInit {

  id: string;
  wantedTask: Task ={
    details:'',
    _id:'',
    progress:{
      _id:'',
      progressValue: 0,
      date:new Date()
    },
    completed:false
    };

  taskProgress: number;
  taskName: string;

  constructor(
    private route: ActivatedRoute,
    private service: TaskServiceService,
    private storage :StorageService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paraMap =>{
      this.id = paraMap.get('id');
        if(this.id !== null){
        this.service.getTaskById(this.id).subscribe(task =>{
          this.wantedTask = task;
        });
        console.log(this.wantedTask);
      }


    });
  }



  progressChange($event){
    this.taskProgress = $event.detail.value;
  }

  nameChange($event){
    this.taskName=$event.detail.value;

  }

  async submitTask(){

    this.wantedTask.details = this.taskName;
    this.wantedTask.progress.progressValue = this.taskProgress;
    if (this.id === null){
      const body = {
        details: this.wantedTask.details,
        progress: {
          progressValue: this.wantedTask.progress.progressValue,
          date:new Date()
        },
        completed:this.wantedTask.completed

      };
      await this.storage.set('task', body);
      this.service.addTask(body).subscribe(task=>{
        console.log('done');
      });

    }else{

      if(this.taskProgress === 100){
        this.wantedTask.completed = true;
      }
      const body = {
        details: this.wantedTask.details,
        progress: {
          _id: this.wantedTask.progress._id,
          progressValue: this.wantedTask.progress.progressValue,
          date:new Date()
        },
        completed:this.wantedTask.completed
      };
      this.service.updateTask(this.id,body).subscribe(task=>{
        console.log('updated');
    });

   }
}
}
