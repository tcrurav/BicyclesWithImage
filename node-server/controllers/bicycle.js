// Load required packages
var Bicycle = require('../models/bicycle');


// router.post('/upload',upload.single('file'),function(req, res, next) {
//   console.log(req.file);
//   if(!req.file) {
//     res.status(500);
//     return next(err);
//   }
//   res.json({ fileUrl: 'http://localhost:3000/images/' + req.file.filename });
// })

// Create endpoint /api/bicycles for POSTS
exports.postBicycles = function (req, res) {
  // Create a new instance of the Bicycle model
  var bicycle = new Bicycle();

  // Set the bicycle properties that came from the POST data
  bicycle.brand = req.body.brand;
  bicycle.model = req.body.model;
  bicycle.filename = '';
  if (req.file) {
    bicycle.filename = req.file.filename;
  }

  // Save the bicycle and check for errors
  bicycle.save(function (err) {
    if (err)
      res.send(err);

    res.json({ message: 'Bicycle added!', data: bicycle });
  });
};

// Create endpoint /api/bicycles for GET
exports.getBicycles = function (req, res) {
  // Use the Bicycle model to find all bicycle
  Bicycle.find(function (err, bicycles) {
    if (err)
      res.send(err);

    res.json(bicycles);
  });
};

// Create endpoint /api/bicycles/:bicycle_id for GET
exports.getBicycle = function (req, res) {
  // Use the Bicycle model to find a specific bicycle
  Bicycle.findById(req.params.bicycle_id, function (err, bicycle) {
    if (err)
      res.send(err);

    res.json(bicycle);
  });
};

// Create endpoint /api/bicycles/:bicycle_id for PUT
exports.putBicycle = function (req, res) {
  // Use the Bicycle model to find a specific bicycle
  Bicycle.findById(req.params.bicycle_id, function (err, bicycle) {
    if (err)
      res.send(err);

    // Update the existing bicycle 
    bicycle.brand = req.body.brand;
    bicycle.model = req.body.model;
    bicycle.filename = '';
    if (req.file) {
      bicycle.filename = req.file.filename;
    }

    // Save the bicycle and check for errors
    bicycle.save(function (err) {
      if (err)
        res.send(err);

      res.json(bicycle);
    });
  });
};

// Create endpoint /api/bicycles/:bicycle_id for DELETE
exports.deleteBicycle = function (req, res) {
  // Use the Bicycle model to find a specific bicycle and remove it
  Bicycle.findByIdAndRemove(req.params.bicycle_id, function (err) {
    if (err)
      res.send(err);

    res.json({ message: 'Bicycle removed!' });
  });
};