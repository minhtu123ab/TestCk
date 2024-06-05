import mongoose from "mongoose";

const FilmSchema = new mongoose.Schema({
  name: String,
  time: Number,
  year: Number,
  image: String,
  introduce: String,
});

const FilmModel = mongoose.model("films", FilmSchema);

export default FilmModel;
