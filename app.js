const express = require("express");
const app = express();
const morgan = require("morgan");
const glbalErrorHandler = require("./middlewares/globalErrorHandler");
const cookieParser = require("cookie-parser");

// Import Routes
const boothCampsRouter = require("./routes/boothcampsRoutes");
// const coursesRouter = require("./routes/coursesRoutes");
// const authRouter = require("./routes/authRoute");

// Body parser
app.use(express.json());

// Cookie Parser
app.use(cookieParser());

// third party middleware
app.use(morgan("dev"));

// URL Encoded
app.use(express.urlencoded({ extended: false }));

// Mount Routers
app.use("/api/v1/boothcamps", boothCampsRouter);
// app.use("/api/v1/courses", coursesRouter);
// app.use("/api/v1/auth", authRouter);

// custom errorHandler
app.use(glbalErrorHandler);

module.exports = app;
