// controllers/vehicleTypeController.js
const { VehicleType } = require('../models');

const getVehicleTypes = async (req, res) => {
  try {
    const { wheels } = req.query;

    let types;
    if (wheels) {
      const category = wheels === '2' ? 'Bike' : 'Car';
      types = await VehicleType.findAll({
        where: { category }
      });
    } else {
      types = await VehicleType.findAll();
    }

    res.status(200).json(types);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicle types', error });
  }
};

module.exports = { getVehicleTypes };
