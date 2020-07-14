const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
  taskName: {
    type: String,
    required: true,
    trim: true
  },
  taskState: {
    type: Boolean,
    default: false
  },
  taskDate: {
    type: Date,
    default: Date.now()
  },
  taskProject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }
});

module.exports = mongoose.model('Task', TaskSchema);