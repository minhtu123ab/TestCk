import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  salt: String,
});

const UserModel = mongoose.model("Users", UserSchema);

export default UserModel;
