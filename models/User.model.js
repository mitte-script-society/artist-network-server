const mongoose = require('mongoose');
const { Schema } = mongoose;

const referenceSchema = new Schema ( {
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
  }, 
  content: {
    type: String,
    required: true
  }
})

const userSchema = new Schema(
  {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        default: 'default-image-url'
    },
    bookmarkedEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Concert'
    }],
    followedArtists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    city: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    isArtist: {
        type: Boolean
    },
    moreThanOne: {
        type: Boolean,
        default: false
    },
    groupName: {
      type: String,
      required: function() { return  this.isArtist && this.moreThanOne }
  },
    artistMembers: [{
        type: String,
        required: function() {return this.isArtist && this.moreThanOne }
    }],
    artistDescription: {
        type: String,
        required: function() { return this.isArtist}
    },
    artistFee: {
        type: Number,
        required: function() {return this.isArtist}
    },
    artistPictures: [{
        type: String
    }],
    artistVideos: [{
        type: String
    }],
    artistAudio: [{
        type: String
    }],
    artistWebsite: {
        type: String
    },
    artistGenre: {
        type: [String]
    },
    artistConcerts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Concert'
    }],
    artistReferences: [{
        type: [referenceSchema]
    }]
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
