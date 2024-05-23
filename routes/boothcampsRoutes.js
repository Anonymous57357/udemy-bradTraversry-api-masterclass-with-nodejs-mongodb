const express = require("express");

const router = express.Router();

const {
  createBoothCamp,
  findBoothCamps,
  findBoothCamp,
  updateBoothCamp,
  deleteBoothCamp,
  getBoothcampsInRadius,
} = require("./../controllers/bootcampsController");

// const { protect } = require("../middlewares/auth");

// includes other resourses routers
const courseRouter = require("./coursesRoutes");

// Re-route into other resource routers
router.use("/:boothcampId/courses", courseRouter);

// @route    GET /api/v1/boothcamps/radius/:zipcode/:distance
router.route("/radius/:zipcode/:distance").get(getBoothcampsInRadius);

router.post("/", createBoothCamp);
router.get("/", findBoothCamps);
router.get("/:id", findBoothCamp);
router.put("/:id", updateBoothCamp);
router.delete("/:id", deleteBoothCamp);

module.exports = router;
