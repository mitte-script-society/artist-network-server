const mongoose = require('mongoose');
const { Schema } = mongoose;

const addressSchema = new Schema({
  street: {
      type: String,
      required: true
  },
  number: {
      type: String,
      required: true
  },
  zipcode: {
      type: String,
      required: true
  }
});

const pointSchema = new Schema({
  type: {
      type: String,
      enum: ['Point'],
      required: true
  },
  coordinates: {
      type: [Number],
      required: true
  }
});

const concertSchema = new Schema({
  title: {
      type: String,
      required: true
  },
  description: {
      type: String,
      required: true
  },
  image: {
      type: String,
      required: true,
      default: 'default-image-url'
  },
  isPublic: {
      type: Boolean,
      required: true
  },
  city: {
      type: String,
      required: true
  },
  /* address: {
    type: addressSchema,
    required: true
},
  location: {
    type: pointSchema,
    required: true
  }, */
  date: {
      type: Date,
      required: true
  },
  prices: Number,
  artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      //required: true
  },
  host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      //required: true
  }
});

const Concert = mongoose.model('Concert', concertSchema);

module.exports = Concert;