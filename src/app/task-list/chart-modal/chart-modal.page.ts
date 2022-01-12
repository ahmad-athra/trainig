import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import Chart from 'chart.js';
import { jsPDF } from 'jspdf';
import { TaskServiceService } from '../task-service.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-chart-modal',
  templateUrl: './chart-modal.page.html',
  styleUrls: ['./chart-modal.page.scss'],
})
export class ChartModalPage implements OnInit {

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

  constructor( private taskService:TaskServiceService,
    public modalController: ModalController) {
    // Chart.register(...registerables);
  }

  ngOnInit() {
    this.taskService.getTasks().subscribe(tasks => {
      tasks.forEach(task => {
        this.labels.push(task.details);
        this.progressValues.push(task.progress.progressValue);

      });


      let src: string;
    const ctx = <HTMLCanvasElement>(document.getElementById('Chart'));
    const newChart = new Chart(ctx, {
      type: 'bar',
      data: this.data,
      options: {
        responsive: true,
        animation: {
          onComplete: function () {

            src = this.toBase64Image();
            localStorage.setItem('img', src);

          }
        }
      }
    });
    });



    setTimeout(function(){
      window.dispatchEvent(new Event('resize'));},100);


  }



  doc = new jsPDF();

  src: string;
  ngAfterViewInit() {

  }

  sendEmail(){
    this.taskService.sendEmail().subscribe(done =>{
      console.log("done");

    });
  }

  generatePdf() {
    this.doc.text('your progress', 35, 25);
    const img = new Image();
    img.src = localStorage.getItem('img');
    this.doc.addImage(img, 'png', 50, 50, 100, 100);
    this.doc.save();

  }


  closeModal(){
    this.modalController.dismiss();
  }

}
