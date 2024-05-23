const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

// load env vars
dotenv.config({ path: "./config/config.env" });

// loading models
const BoothCamp = require("./models/boothcampsModel");
const Course = require("./models/CourseModel");

// connect to db
mongoose.connect(process.env.DATABASE_CONN);

// reading JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
);

// import into DB
const importData = async () => {
  try {
    await BoothCamp.create(bootcamps);
    await Course.create(courses);
    console.log("Data imported succesfully...".green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// export into DB
const deleteData = async () => {
  try {
    await BoothCamp.deleteMany();
    await Course.deleteMany();
    console.log("Data exported succesfully...".red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};
console.log(process.argv);

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
