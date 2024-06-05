import FilmModel from "../models/FilmModel.js";
import upload from "../MulterConfig.js";

const FilmController = {
  GetAll: async (req, res) => {
    try {
      const { name, sort } = req.query;
      let query = {};
      let sortDirection = 1;

      if (name) {
        const nameQuery = name.toLowerCase();
        query.name = { $regex: nameQuery, $options: "i" };
      }

      if (sort && sort.toLowerCase() === "desc") {
        sortDirection = -1;
      }

      const data = await FilmModel.find(query).sort({ year: sortDirection });

      if (data.length === 0) {
        return res.status(404).send({ message: "Không có phim nào" });
      }

      res.status(200).send({ data });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },

  CreateFilm: async (req, res) => {
    try {
      const { name, time, year, image, introduce } = req.body;
      if (!name || !time || !year || !image || !introduce) {
        return res.status(400).send({ message: "Vui lòng nhập đủ thông tin" });
      }
      const newData = await FilmModel.create({
        name,
        time,
        year,
        image,
        introduce,
      });
      res.status(200).send({ message: "Tạo mới thành công", data: newData });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },

  UpdateFilm: [
    upload.single("image"),
    async (req, res) => {
      try {
        const { name, time, year, introduce } = req.body;
        const { id } = req.params;

        // Kiểm tra xem có dữ liệu nào để cập nhật không
        if (
          name === undefined &&
          time === undefined &&
          year === undefined &&
          introduce === undefined &&
          req.file === undefined
        ) {
          return res
            .status(400)
            .send({ message: "Không có dữ liệu để cập nhật" });
        }

        const updateData = {};

        if (name !== undefined) {
          updateData.name = name;
        }
        if (time !== undefined) {
          updateData.time = time;
        }
        if (year !== undefined) {
          updateData.year = year;
        }
        if (introduce !== undefined) {
          updateData.introduce = introduce;
        }
        if (req.file !== undefined) {
          updateData.image = req.file.path;
        }

        const newData = await FilmModel.findByIdAndUpdate(id, updateData, {
          new: true,
        });
        if (!newData) {
          return res.status(404).send({ message: "Phim không tồn tại" });
        }

        res.status(200).send({ message: "Cập nhật thành công", data: newData });
      } catch (err) {
        res.status(500).send({ message: err.message });
      }
    },
  ],

  DeleteFilm: async (req, res) => {
    try {
      const { id } = req.params;
      const filmDelete = await FilmModel.findByIdAndDelete(id);
      if (!filmDelete) {
        return res.status(404).send({ message: "Phim không tồn tại" });
      }
      res.status(200).send({ message: "Xóa thành công" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },

  GetFilmByName: async (req, res) => {
    try {
      const { keyword } = req.query;
      const keywordName = keyword.toLowerCase();
      const data = await FilmModel.find({
        name: { $regex: keywordName, $options: "i" },
      });
      if (data.length === 0) {
        return res.status(404).send({ message: "Không có phim nào" });
      }
      res.status(200).send({ data });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },

  GetSortFilmYear: async (req, res) => {
    try {
      let sortDirection = 1;
      const { sort } = req.query;

      if (sort && sort.toLowerCase() === "desc") {
        sortDirection = -1;
      }

      const data = await FilmModel.find().sort({ year: sortDirection });
      res.status(200).send({ data });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
};

export default FilmController;
