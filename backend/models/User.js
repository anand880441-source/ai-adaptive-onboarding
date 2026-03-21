const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: function() {
      return !this.provider; // Password not required for OAuth users
    }
  },
  avatar: {
    type: String,
    default: ''
  },
  provider: {
    type: String,
    enum: ['google', 'github', null],
    default: null
  },
  providerId: {
    type: String,
    default: ''
  },
  stats: {
    nodesCompleted: { type: Number, default: 0 },
    synthesisRate: { type: Number, default: 0 },
    activePaths: { type: Number, default: 0 }
  },
  moduleProgress: [{
    moduleId: String,
    title: String,
    status: { type: String, enum: ['not-started', 'in-progress', 'completed'], default: 'not-started' },
    progress: { type: Number, default: 0 },
    completedAt: Date,
    startedAt: Date
  }],
  currentRoadmap: {
    resumeSummary: String,
    skills: [{
      name: String,
      level: String,
      category: String
    }],
    skillGaps: [{
      name: String,
      currentLevel: String,
      requiredLevel: String,
      priority: String,
      reason: String
    }],
    roadmap: [{
      id: String,
      title: String,
      description: String,
      reasoning: String,
      duration: String
    }]
  },
  settings: {
    notifications: { type: Boolean, default: true },
    darkMode: { type: Boolean, default: true },
    privacyLevel: { type: String, default: 'High' }
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function() {
  if (this.isModified('password') && this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.calculateCompletionPercentage = function() {
  if (!this.currentRoadmap?.roadmap || this.currentRoadmap.roadmap.length === 0) {
    return 0;
  }
  const completedModules = this.moduleProgress.filter(m => m.status === 'completed').length;
  return Math.round((completedModules / this.currentRoadmap.roadmap.length) * 100);
};

module.exports = mongoose.model('User', userSchema);
