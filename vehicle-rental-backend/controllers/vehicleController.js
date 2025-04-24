// controllers/vehicleController.js
const { Vehicle } = require('../models');

const getVehiclesByType = async (req, res) => {
  const { typeId } = req.query;
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
