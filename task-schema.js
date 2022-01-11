const mongoose = require('mongoose');


const progressSchema = mongoose.Schema({
    progressValue: { type: Number, required: false },
    date: { type: Date, required: false }
})
const task = mongoose.Schema({
        details: { type: String, required: false },
        progress: { type: progressSchema, required: false },
        completed: { type: Boolean, required: false }
    }

);





module.exports = mongoose.model('task', task)