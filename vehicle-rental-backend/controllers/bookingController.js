const { Booking } = require('../models');

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

    const booking = await Booking.create({
      firstName,
      lastName,
      wheels,
      vehicleTypeId,
      vehicleId,
      startDate,
      endDate,
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error("Booking creation failed:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
