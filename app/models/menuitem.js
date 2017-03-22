let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//menuitem schema definition
let MenuitemSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }  
  },
  { 
    versionKey: false
  }
);

// Sets the createdAt parameter equal to the current time
MenuitemSchema.pre('save', next => {
  now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

//Exports the BookSchema for use elsewhere.
module.exports = mongoose.model('menuitem', MenuitemSchema);
