const mongoose = require('mongoose');
const { Schema } = mongoose;

const referenceSchema = new Schema ( {
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  senderName:{
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }, 
  content: {
    type: String,
    required: true
  }
})

const Reference = mongoose.model("Reference", referenceSchema);
module.exports = Reference;
