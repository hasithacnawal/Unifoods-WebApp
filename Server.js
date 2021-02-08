const express = require("express");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("config");

const app = express();

//middleware
app.use(express.json());
app.use(fileUpload());

app.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  const file = req.files.file;
  file.mv(`${__dirname}/cilent/public/uploads/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

const db = config.get("mongoURI");

//connect
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

// //use routes
app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/admins", require("./routes/api/admins"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/adminAuth", require("./routes/api/adminAuth"));
app.use("/api/cardsAuth", require("./routes/api/cardsAuth"));
app.use("/api/cards", require("./routes/api/cards"));
app.use("/api/orders", require("./routes/api/orders"));

const port = process.env.PORT || 5500;

app.listen(port, () => console.log(`server started on port ${port}`));
