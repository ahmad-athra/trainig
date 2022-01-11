const { redirect } = require('express/lib/response');
const mongoose = require('mongoose');
const task = require('./task-schema')



class DataBase {


    constructor() {
        this.Url = "mongodb+srv://Maryam:1234@clinic.gyi0b.mongodb.net/task?retryWrites=true&w=majority"
    }


    connect() {
        mongoose.connect(this.Url, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                console.log('database connected successfully')
            })
            .catch((err) => {
                console.log(err);
            })
    }


    addTask(body) {
        return new Promise((resolve, reject) => {


            let newTask = new task(body);
            newTask.save()
                .then(doc => {
                    resolve(doc);
                })
                .catch(err => {
                    reject(err);
                });


        })

    }

    getTasks() {
        return new Promise((resolve, reject) => {
            task.find()
                .then(data => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                })
        })
    }

    getTaskById(id) {
        return new Promise((resolve, reject) => {
            task.findById(id)
                .then(data => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                })
        })
    }


    deleteTaskById(id) {
        return new Promise((resolve, reject) => {
            task.findByIdAndDelete(id)
                .then((data) => resolve(data))
                .catch((err) => reject(err))
        })
    }

    updateTaskById(id, newInfo) {
        return new Promise((resolve, reject) => {
            task.findByIdAndUpdate(id, newInfo)
                .then((data) => {
                    resolve(data);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }

}
module.exports = DataBase;