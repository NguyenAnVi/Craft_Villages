const express = require("express");
const createError = require("http-errors");
const cors = require("cors");

const config = require("./config/config");
const testRouter = require("./routes/users");

const app = express();
const PORT = config.app.PORT;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", testRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT} http://localhost:${PORT}`);
});
