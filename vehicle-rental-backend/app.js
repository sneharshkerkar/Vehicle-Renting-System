// app.js or server.js
const express = require('express');
const cors = require('cors'); // ✅ Add this
const app = express();

const vehicleTypeRoutes = require('./routes/vehicleTypeRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');

// ✅ Enable CORS for all origins (safest for dev)
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Route definitions
app.use('/api/vehicle-types', vehicleTypeRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/bookings', require('./routes/booking'));


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
