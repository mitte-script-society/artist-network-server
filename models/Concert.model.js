const mongoose = require('mongoose');
const { Schema } = mongoose;

const addressSchema = new Schema({
  street: {
      type: String,
      required: true,
  },
  number: {
      type: String,
      required: true,
  },
  zipcode: {
      type: String,
      required: true,
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
      default: 'https://res.cloudinary.com/deckhnump/image/upload/v1717238495/f_qfxg1b.png'
  },
  isPublic: {
      type: Boolean,
      required: true
  },
  city: {
      type: String,
      required: true
  },
  address: {
    type: addressSchema,
    required: true,
    default: {street: "Winsstr", number: "29", zipcode: "10439"}
  },
  location: {
    type: [Number],
    default: [0,0]
  },
  date: {
      type: Date,
      required: true
  },
  duration: {
    type: Number,
    required: true
    },
  artistCost: {
    type: Number,
    // required: true
    },
  prices: Number,
  artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
  },
  genre: {
    type: [String],
    required: true
},
  host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
  }
});

const Concert = mongoose.model('Concert', concertSchema);

module.exports = Concert;