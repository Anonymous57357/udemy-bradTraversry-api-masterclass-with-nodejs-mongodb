// const globalErrorHandler = (err, req, res, next) => {
//   // status
//   // message
//   // stack
//   const stack = err.stack;
//   const message = err.message;
//   const status = err.status ? err.status : "failed";
//   const statusCode = err?.statusCode ? err.statusCode : 500;
//   // send response
//   res.status(statusCode).json({
//     stack,
//     status,
//     message,
//   });
// module.exports = globalErrorHandler;

const ErrorResponse = require("./../utils/errorResponse");

const globalErrorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // Log to console for dev
  console.log(err);

  // Mongoose bad ObjectId ("CastError")
  console.log(err.name);
  if (err.name || "CastError") {
    const message = `Boothcamp not found id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key --> while creting a product ( name = "MongoServerError") or code =  11000
  if (err.code || 11000) {
    const message = `Duplicate field value entered`;
    // const message = Object.values(err.error).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error --> while creating a product the body is empty (name = "ValidationError")
  if (err.name || "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = globalErrorHandler;
