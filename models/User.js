const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'faculty', 'admin'],
    required: true
  },
  profile: {
    firstName: String,
    lastName: String,
    department: String,
    semester: Number,
    enrollmentNumber: String,
    skills: [{
      name: String,
      level: Number,
      endorsements: Number
    }],
    badges: [{
      name: String,
      description: String,
      earnedAt: Date
    }],
    streaks: {
      current: Number,
      longest: Number,
      lastActive: Date
    },
    codingStats: {
      problemsSolved: Number,
      contestsParticipated: Number,
      ranking: Number,
      skillScore: Number
    }
  },
  enrolledCourses: [{
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    },
    progress: Number,
    enrolledAt: Date
  }],
  enrolledTracks: [{
    track: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CodingTrack'
    },
    progress: Number,
    enrolledAt: Date
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);