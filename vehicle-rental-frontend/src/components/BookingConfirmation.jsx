import React from 'react';
import { useLocation } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const BookingConfirmation = () => {
  const { state } = useLocation();
  const booking = state?.booking;

  if (!booking) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600 text-lg">
        No booking information found.
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full animate-fade-in space-y-6">
        <div className="flex items-center justify-center text-green-500">
          <CheckCircleOutlineIcon sx={{ fontSize: 64 }} />
        </div>
        <h2 className="text-2xl font-bold text-center text-green-600">Booking Confirmed!</h2>
        <div className="space-y-2 text-gray-700">
          <p><strong>Name:</strong> {booking.firstName} {booking.lastName}</p>
          <p><strong>Vehicle Type:</strong> {booking.vehicleType}</p>
          <p><strong>Vehicle Model:</strong> {booking.vehicleModel}</p>
          <p><strong>Booking Dates:</strong> {new Date(booking.startDate).toLocaleDateString()} — {new Date(booking.endDate).toLocaleDateString()}</p>
        </div>
        <div className="text-center pt-4">
          <a
            href="/"
            className="inline-block mt-4 px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition"
          >
            Make Another Booking
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
