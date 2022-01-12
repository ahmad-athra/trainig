/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable object-shorthand */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Task } from './task';
import { TaskServiceService } from './task-service.service';
import { IonRouterOutlet } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { jsPDF } from 'jspdf';
import { ModalController } from '@ionic/angular';
import { ChartModalPage } from './chart-modal/chart-modal.page';



import Chart from 'chart.js';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit {


  tasks: Task[];
  modalOpened: boolean;
  labels = [];
  progressValues = [];
  data = {
    labels: this.labels,
    datasets: [{
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: this.progressValues,
    }]
  };

  doc = new jsPDF();

  src: string;

  ngAfterViewInit() {
    // let src: string;
    // const ctx = <HTMLCanvasElement>(document.getElementById('baseChart'));
    // const newChart = new Chart(ctx, {
    //   type: 'bar',
    //   data: this.data,
    //   options: {
    //     responsive: true,
    //     animation: {
    //       onComplete: function () {

    //         src = this.toBase64Image();
    //         localStorage.setItem('img', src);

    //       }
    //     }
    //   }
    // });

  }//

  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(private taskService: TaskServiceService,
    public routerOutlet: IonRouterOutlet,
    private route: ActivatedRoute,
    public modalController: ModalController
  ) {
    //Chart.register(...registerables);
  }

  ngOnInit() {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      tasks.forEach(task => {
        this.labels.push(task.details);
        this.progressValues.push(task.progress.progressValue);
      });
    });
  }

  ionViewDidEnter() {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });


  }





  deleteTask(id) {


    this.taskService.deleteTaskById(id).subscribe(res => {
      this.taskService.getTasks().subscribe(tasks => {
        this.tasks = tasks;
      });

    });

  }


  completeTask(id) {
    let newinfo: Task;
    this.taskService.getTaskById(id).subscribe(task => { //get task info
      newinfo = task;
      newinfo.completed = true;
      newinfo.progress.progressValue = 100;
      this.taskService.updateTask(id, newinfo).subscribe(res => { //update task info

        this.taskService.getTasks().subscribe(tasks => {
          this.tasks = tasks;

        });
      });
    });
  }

  openModal() {

    this.modalOpened = true;


  }


  closeModal() {
    this.modalOpened = false;
  }

  generatePdf() {
    this.doc.text('your progress', 35, 25);
    const img = new Image();
    img.src = localStorage.getItem('img');
    this.doc.addImage(img, 'png', 50, 50, 100, 100);
    this.doc.save();

  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ChartModalPage,
      cssClass: 'my-custom-class'

    });
    return await modal.present();
  }
}


