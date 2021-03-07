const cluster = require("cluster");
const isWin = process.platform === "win32";
const fs = require("fs");

if (cluster.isMaster) {
  let Check_Cpu = require("os").cpus().length;

  for (var i = 0; i < Check_Cpu; i++) {
    console.log(`Master${process.pid} have many slave clusters ${i}`);
    cluster.fork();
  }

  cluster.on("exit", function (worker) {
    console.log(`Worker ${worker.id} is died`);
    cluster.fork();
  });

  const db = require("./models");

  (async () => {
    await db.sequelize.sync({ force: false }).catch((error) => {
      if (error) {
        let file_check = fs.existsSync("./ErrorDB.log");
        if (file_check) {
          fs.appendFileSync("./ErrorDB.log", error);
        } else {
          fs.writeFileSync("./ErrorDB.log", error, "utf8");
        }
      }
    });
  })();
}

if ((!cluster.isMaster && !isWin) || (cluster.isMaster && isWin)) {
  const express = require("express");
  const app = express();
  const cors = require("cors");
  const compression = require("compression");
  const port = 8081;
  const path = require("path");
  const corsOption = {
    origin: [
      "http://localhost:3000",
      "http://localhost:5000",
      "http://localhost:8081",
    ],
    credentials: true,
  };

  app.use(cors());
  app.use(cors(corsOption));
  app.use(compression());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use("/img", express.static("./uploads"));

  setTimeout(function () {
    console.log(`worker : ${process.pid} is join`);
    if (cluster.isWorker) {
      console.log("worker is running");
    } else {
      console.log("worker is not running");
    }
  }, 1000);

  const Router = require("./routes");

  app.use("/api/multer", Router.mulRouter);

  app.listen(port, (error) => {
    if (error) {
      let file_check = fs.existsSync("./serverbug.log");
      if (file_check) {
        fs.appendFileSync("./serverbug.log", error);
      } else {
        fs.writeFileSync("./serverbug.log", error, "utf8");
      }
    }
  });
}
