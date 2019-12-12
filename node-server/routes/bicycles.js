var express = require('express');
var router = express.Router();
var upload = require('../multer/upload');

var bicycleController = require('../controllers/bicycle');

// Create endpoint handlers for /bicycles
router.route('/')
  .post(upload.single('file'), bicycleController.postBicycles)
  .get(bicycleController.getBicycles);

// Create endpoint handlers for /bicycles/:bicycle_id
router.route('/:bicycle_id')
  .get(bicycleController.getBicycle)
  .put(upload.single('file'), bicycleController.putBicycle)
  .delete(bicycleController.deleteBicycle);

module.exports = router;