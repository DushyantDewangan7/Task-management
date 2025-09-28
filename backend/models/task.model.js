import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
    dueDate: { type: Date },
    status:["pending", "in-progress", "completed"],
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"          
    },
    assignedTo: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"          
    },
    
}, { timestamps: true });

export const Task = mongoose.model('Task', taskSchema);