const { Booking, Vehicle } = require('../models');
const { Op } = require('sequelize');

exports.createBooking = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      wheels,
      vehicleTypeId,
      vehicleId,
      startDate,
      endDate,
    } = req.body;

    const start = new Date(startDate);
    const end = new Date(endDate);

    // 🔍 Check for overlapping bookings
    const overlappingBooking = await Booking.findOne({
      where: {
        vehicleId,
        [Op.or]: [
          {
            startDate: {
              [Op.between]: [start, end],
            },
          },
          {
            endDate: {
              [Op.between]: [start, end],
            },
          },
          {
            [Op.and]: [
              { startDate: { [Op.lte]: start } },
              { endDate: { [Op.gte]: end } },
            ],
          },
        ],
      },
    });

    if (overlappingBooking) {
      return res.status(409).json({
        message:
          'This vehicle is already booked for the selected date range. Please select a different vehicle or a different date.',
      });
    }

    // 🚗 Fetch the vehicle name before creating booking
    const vehicle = await Vehicle.findByPk(vehicleId);
    if (!vehicle) {
      return res.status(400).json({
        message: 'Selected vehicle does not exist.',
      });
    }

    // ✅ Create booking with vehicleName included
    const booking = await Booking.create({
      firstName,
      lastName,
      wheels,
      vehicleTypeId,
      vehicleId,
      vehicleName: vehicle.name, // new field
      startDate: start,
      endDate: end,
    });

    return res.status(201).json(booking);

  } catch (error) {
    console.error('Error while creating booking:', error);

    if (error.name === 'SequelizeValidationError') {
      console.error('Validation errors:', error.errors);
      return res.status(400).json({
        message: 'Validation error(s) occurred.',
        errors: error.errors.map(err => err.message),
      });
    }

    return res.status(500).json({
      message: 'Something went wrong while booking. Please try again later.',
      error: error.message,
    });
  }
};
