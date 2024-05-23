const BoothCamp = require("./../models/boothcampsModel");
const geocoder = require("../utils/geoCoder");
const ErrorResponse = require("./../utils/errorResponse");
const asyncHandler = require("./../middlewares/async");

const createBoothCamp = async (req, res, next) => {
  try {
    const boothCamp = await BoothCamp.create(req.body);

    res.status(201).json({
      status: "success",
      data: boothCamp,
    });
  } catch (err) {
    next(err);
  }
};

const findBoothCamps = asyncHandler(async (req, res) => {
  // // query params
  // // location.state=RI&housing=false
  // // console.log(req.query);
  // // let query;

  // // let queryStr = JSON.stringify(req.query);

  // // queryStr = queryStr.replace(
  // //   /\b(gt|gte|lt|lte|in)\b/g,
  // //   (match) => `$${match}`
  // // );
  // // query = BoothCamp.find(JSON.parse(queryStr));

  // // practice section (ADVANCED FILTERING)
  // // let query;

  // // let queryStr = JSON.stringify(req.query);

  // // queryStr = queryStr.replace(
  // //   /\b(gte|gt|lte|lt|in)\b/g,
  // //   (match) => `$${match}`
  // // );

  // // query = BoothCamp.find(JSON.parse(queryStr));

  // let query;

  // // Copy req.query
  // const reqQuery = { ...req.query };

  // // Fields to exclude
  // const removeFields = ["select", "sort", "page", "limit"];

  // // Loop over removeFields and delete them from reqQuery
  // removeFields.forEach((param) => delete reqQuery[param]);

  // // Create query string
  // let queryStr = JSON.stringify(reqQuery);

  // // create operetors {$gte , $gt, $lte, $lt}
  // queryStr = queryStr.replace(
  //   /\b(gte|gt|lte|lt|in)\b/g,
  //   (match) => `$${match}`
  // );

  // // Finding resource
  // query = BoothCamp.find(JSON.parse(queryStr)).populate("courses");

  // // Select fields
  // if (req.query.select) {
  //   const fields = req.query.select.split(",").join(" ");
  //   query = query.select(fields);
  // }

  // // sort
  // if (req.query.sort) {
  //   const sortBy = req.query.sort.split(",").join(" ");
  //   query = query.sort(sortBy);
  // } else {
  //   query = query.sort("-createdAt");
  // }

  // // Pagination
  // const page = parseInt(req.query.page, 10) || 1;
  // const limit = parseInt(req.query.limit, 10) || 3;
  // const startIndex = (page - 1) * limit; // starting page
  // const endIndex = page * limit;
  // const total = await BoothCamp.countDocuments();

  // query = query.skip(startIndex).limit(limit);

  // // Executing query
  // const boothCamps = await query;

  // // Pagination Result
  // const pagination = {};

  // if (endIndex < total) {
  //   pagination.next = {
  //     page: page + 1,
  //     limit,
  //   };
  // }

  // if (startIndex > 0) {
  //   pagination.prev = {
  //     page: page - 1,
  //     limit,
  //   };
  // }

  // // const boothCamps = await BoothCamp.find(req.query);
  // // const boothCamps = await query;

  const boothCamps = await BoothCamp.find();

  res.status(200).json({
    count: boothCamps.length,
    success: true,
    data: {
      boothCamps,
    },
  });
});

const findBoothCamp = async (req, res, next) => {
  try {
    const boothCamp = await BoothCamp.findById(req.params.id);

    if (!boothCamp) {
      return new ErrorResponse(
        `Boothcamp not found with id of ${req.parms.id}`,
        404
      );
    }

    res.status(200).json({
      success: true,
      data: boothCamp,
    });
  } catch (err) {
    next(err);
  }
};

const updateBoothCamp = async (req, res, next) => {
  try {
    const boothCamp = await BoothCamp.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!boothCamp) {
      return new ErrorResponse(
        `Boothcamp not found with id of ${req.parms.id}`,
        404
      );
    }
    res.status(200).json({
      status: "success",
      data: boothCamp,
    });
  } catch (err) {
    next(err);
  }
};

const deleteBoothCamp = async (req, res, next) => {
  try {
    const boothCamp = await BoothCamp.findByIdAndDelete(req.params.id);
    if (!boothCamp) {
      return new ErrorResponse(
        `Boothcamp not found with id of ${req.parms.id}`,
        404
      );
    }
    res.status(200).json({
      status: "success",
      data: {},
    });
  } catch (err) {
    next(err);
  }
};

// @desc     GET boothcamps within a rasdius
// @route    GET /api/v1/boothcamps/radius/:zipcode/:distance
// @access   Private
const getBoothcampsInRadius = async (req, res) => {
  const { zipcode, distance } = req.params;

  // Get lat/lan from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // calc radius using radius
  // divide distance by radius of earth
  // Earth Radius = 3,963 mi / 6,378 km

  const radius = distance / 3963;

  const boothcamps = await BoothCamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  {
    try {
      res.status(200).json({
        success: true,
        count: boothcamps.length,
        data: boothcamps,
      });
    } catch (err) {
      next(err);
    }
  }
};

module.exports = {
  createBoothCamp,
  findBoothCamps,
  findBoothCamp,
  updateBoothCamp,
  deleteBoothCamp,
  getBoothcampsInRadius,
};
