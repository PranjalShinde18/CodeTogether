// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const taskSchema = new Schema({
    
//     projectId: {
//         type: Schema.Types.ObjectId,
//         ref: 'Project',
//         required: true
//     },

//     title: {
//         type: String,
//         required: true
//     },

//     description: {
//         type: String

//     },

//     assignedTo: {
//         type: Schema.Types.ObjectId,
//         ref: 'User'
//     },

//     status: {
//         type: String,
//         enum: ['pending', 'in progress', 'completed'],
//         default: 'pending'
//     },

//     createdAt: {
//         type: Date,
//         default: Date.now
//     },

//     dueDate: {
//         type: Date

//     }

// },
//     { timestamps: true });

// const Task = mongoose.model('Task', taskSchema);

// module.exports = Task;
