import UserModel from "../models/UserModel.js";
import bcrypt, { hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const UserController = {
  CreateUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password)
        throw new Error("Vui lòng nhập đầy đủ thông tin");
      const salt = bcrypt.genSaltSync(10);
      const password2 = hashSync(password, salt);
      await UserModel.create({
        username: username,
        password: password2,
        salt: salt,
      });
      res.status(200).send({
        message: "Đăng kí thành công",
      });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },

  LoginUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      const findUsername = await UserModel.findOne({ username: username });
      if (!findUsername) {
        throw new Error("Tài khoản không tồn tại");
      }
      const password2 = hashSync(password, findUsername.salt);
      if (password2 === findUsername.password) {
        const token = jwt.sign({ id: findUsername.id }, SECRET_KEY, {
          expiresIn: "1h",
        });
        res.status(200).send({
          message: "Đăng nhập thành công",
          token: token,
        });
      } else {
        throw new Error("Mật khẩu không đúng");
      }
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },

  LogoutUser: async (req, res) => {
    try {
      res.status(200).send({
        message: "Đăng xuất thành công",
      });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
};

export default UserController;
