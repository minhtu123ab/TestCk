import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import FilmController from "./controllers/FilmController.js";
import cors from "cors";
import UserController from "./controllers/UserController.js";
import MiddlewareToken from "./middlewares/MiddlewareToken.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;
const DATABASE_NAME = process.env.DATABASE_NAME;

mongoose
  .connect(`mongodb://localhost:27017/${DATABASE_NAME}`, {})
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Database connection error:", err));

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}...`);
});

app.get("/films", FilmController.GetAll);
app.post("/films", FilmController.CreateFilm);
app.put("/films/:id", FilmController.UpdateFilm);
app.delete("/films/:id", FilmController.DeleteFilm);
app.get("/films/name/keyword", FilmController.GetFilmByName); // Nếu bạn muốn giữ phương thức này
app.get("/films/sort/year", FilmController.GetSortFilmYear); // Nếu bạn muốn giữ phương thức này

app.post("/register", UserController.CreateUser);
app.post("/login", UserController.LoginUser);
app.post("/logout", MiddlewareToken, UserController.LogoutUser);
