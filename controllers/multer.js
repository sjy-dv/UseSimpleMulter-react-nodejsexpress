const db = require("../models");
const Mul = db.multer;

module.exports = (function () {
  const M = {};

  M.SingleAdd = async (req, res) => {
    try {
      let img = "/img/" + req.file.filename;
      const rows = await Mul.create({ img: img, img2: "", mode: "single" });
      if (!rows) throw res.send(`Query is something Wrong ...`);
      res.status(200).json({ reusult: true });
    } catch (error) {
      console.log(error);
      throw res.send(`May be.. is Error by DB\n
        Checking Error : ${error}`);
    }
  };

  M.FiedlsAdd = async (req, res) => {
    try {
      let img = "/img/" + req.files.img[0].filename;
      let img2 = "/img/" + req.files.img2[0].filename;

      const rows = await Mul.create({ img: img, img2: img2, mode: "fields" });
      if (!rows) throw res.send(`Query is something Wrong ...`);
      res.status(200).json({ reusult: true });
    } catch (error) {
      throw res.send(`May be.. is Error by DB\n
        Checking Error : ${error}`);
    }
  };

  M.ArrayAdd = async (req, res) => {
    try {
      console.log(req.files[0].filename);
      let store = [];
      for (let i = 0; i < req.files.length; i++) {
        let file = "/img/" + req.files[i].filename;
        store.push(file);
      }
      console.log(store);
      const rows = await Mul.create({
        img: store.toString(),
        img2: "",
        mode: "array",
      });
      if (rows) res.status(200).json({ result: true });
    } catch (error) {
      console.log(error);
      throw res.send(`May be.. is Error by DB\n
        Checking Error : ${error}`);
    }
  };

  M.SingleList = async (req, res) => {
    try {
      const rows = await Mul.findAll({ where: { mode: "single" } });
      if (!rows) throw res.send(`Query is something Wrong ...`);
      res.status(200).send(rows);
    } catch (error) {
      throw res.send(`May be.. is Error by DB\n
        Checking Error : ${error}`);
    }
  };

  M.FieldsList = async (req, res) => {
    try {
      const rows = await Mul.findAll({ where: { mode: "fields" } });
      if (!rows) throw res.send(`Query is something Wrong ...`);
      res.status(200).send(rows);
    } catch (error) {
      throw res.send(`May be.. is Error by DB\n
        Checking Error : ${error}`);
    }
  };

  M.ArrayList = async (req, res) => {
    try {
      const rows = await Mul.findAll({ where: { mode: "array" } });
      if (!rows) throw res.send(`Query is something Wrong ...`);
      res.status(200).send(rows);
    } catch (error) {
      throw res.send(`May be.. is Error by DB\n
        Checking Error : ${error}`);
    }
  };

  return M;
})();
