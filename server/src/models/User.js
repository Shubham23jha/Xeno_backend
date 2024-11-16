import mongoose from "mongoose";

const { Schema } = mongoose;


const userSchema = new Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: String,
  firstName: String,
  lastName: String,
  image: String,
  email: String,
});

const User = mongoose.model('User', userSchema);

export default User;
