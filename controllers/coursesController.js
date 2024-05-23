const Courses = require("./../models/CourseModel");

// @desc   Get courses
// @desc   GET /api/v1/courses
// @route  GET /api/v1/bootcamps/:boothcampId/courses

const getCourses = async (req, res) => {
  let query;

  if (req.params.boothcampId) {
    query = Courses.find(req.params.boothcampId);
  } else {
    query = Courses.find().populate("bootcamp").select("name description");
  }

  const courses = await query;

  try {
    res.status(200).json({
      count: courses.length,
      success: true,
      data: courses,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// @desc   Get single courses
// @desc   GET /api/v1/course:id
// @access Public

const getCourse = async (req, res) => {
  const course = await Courses.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description",
  });

  try {
    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

// @desc   Add courses
// @desc   POST /api/v1/bootcamps/:bootcampsId/courses
// @access Public

const addCourse = async (req, res) => {
  cons;

  try {
    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

module.exports = { getCourses, getCourse };
