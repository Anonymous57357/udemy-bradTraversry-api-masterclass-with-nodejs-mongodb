const express = require("express");

const router = express.Router({ mergeParams: true });

const { protect } = require("../middlewares/auth");
const { getCourses, getCourse } = require("../controllers/coursesController");

// @desc GET /api/v1/

router.get("/", getCourses);
router.get("/:id", getCourse);

module.exports = router;
