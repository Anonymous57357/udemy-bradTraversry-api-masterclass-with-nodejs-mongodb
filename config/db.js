const mongoose = require("mongoose");
// db connection

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.DATABASE_CONN);
  console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;
