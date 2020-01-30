const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = mongoose.Types.ObjectId;
const contactSchema = new Schema({
  userId: {
    type: String,
  },
  relationId: {
    type: ObjectId,
    default: ObjectId()
  },
  email: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  mobile: {
    type: String
  }
}, {
  timestamps: true
});
/*
  * if you want allow the user to add contact's email or phone once you can uncomment the two line below
*/
// contactSchema.index({ userId: 1, email: 1 }, {unique: true});
// contactSchema.index({ userId: 1, mobile: 1 }, {unique: true});
module.exports = mongoose.model('Contact', contactSchema);
