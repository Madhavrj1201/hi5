const mongoose = require('mongoose');

const skillHeatmapSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  skills: [{
    category: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    level: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  }],
  weeklyActivity: [{
    week: Date,
    problemsSolved: Number,
    hoursSpent: Number,
    skillsImproved: [String]
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('SkillHeatmap', skillHeatmapSchema);