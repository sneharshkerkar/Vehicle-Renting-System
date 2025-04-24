// controllers/vehicleController.js
const { Vehicle } = require('../models');

const getVehiclesByType = async (req, res) => {
  const typeId = parseInt(req.query.typeId, 10);

  if (!typeId || isNaN(typeId)) {
    return res.status(400).json({ message: 'Invalid or missing typeId parameter' });
  }

  try {
    const vehicles = await Vehicle.findAll({
      where: { vehicleTypeId: typeId }
    });
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicles', error });
  }
};

module.exports = { getVehiclesByType };
