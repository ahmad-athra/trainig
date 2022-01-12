import { Injectable } from '@angular/core';
import { Task } from './task';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  // tasks: Task[] =[
  //   {
  //     _id : 't1',
  //     name : 'task 1',
  //     progress: 40,
  //     completed: true
  //   },
  //   {
  //     _id : 't2',
  //     name : 'task 2',
  //     progress: 20,
  //     completed: false
  //   }
  // ];
  constructor(
    private http: HttpClient
  ) { }

  getTasks(){
    return this.http.get<Task[]>(`http://localhost:4000/gettasks`);
  }

  getTaskById(id: string){
    return this.http.get<Task>(`http://localhost:4000/getonetask/${id}`);
  }

  deleteTaskById(id: string){
    return this.http.delete<Task>(`http://localhost:4000/deletetask/${id}`);
  }
  addTask(newTask: any){
    return this.http.post<any>(`http://localhost:4000/newtask`,newTask);
  }

  updateTask(id: string ,newTask: any){
    return this.http.put<any>(`http://localhost:4000/updatetask/${id}`,newTask);
  }

  sendEmail(){

    let ImgUrl = localStorage.getItem('img');
    console.log(ImgUrl);
    let neededInfo = {
      email:"shefaadali@gmail.com",
      subject:"your progress",
      imgUrl:ImgUrl
    }

    return this.http.post<any>(`http://localhost:4000/sendEmail`,neededInfo);


  }
}
