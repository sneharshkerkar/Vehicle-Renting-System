import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const SubmitStep = ({ formData, prevStep, resetForm }) => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      await axios.post("http://localhost:3000/api/bookings", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        wheels: formData.wheels,
        vehicleTypeId: formData.vehicleTypeId,
        vehicleId: formData.vehicleId,
        startDate: formData.startDate,
        endDate: formData.endDate
      });

      setSubmitted(true);
      setLoading(false);
      resetForm();
    } catch (err) {
      setLoading(false);
      setError("Failed to submit booking. Please try again.");
      console.error(err);
    }
  };

  if (submitted) {
    return (
      <div className="space-y-4 text-center">
        <h2 className="text-2xl font-bold text-green-600">Booking Confirmed!</h2>
        <p>Thank you, your booking has been successfully submitted.</p>
        <Button variant="contained" onClick={resetForm}>Book Another Vehicle</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Review your booking</h2>
      <ul className="text-sm space-y-1">
        <li><strong>Name:</strong> {formData.firstName} {formData.lastName}</li>
        <li><strong>Wheels:</strong> {formData.wheels}</li>
        <li><strong>Vehicle Type:</strong> {formData.vehicleType}</li>
        <li><strong>Model:</strong> {formData.vehicleModel}</li>
        <li><strong>Start Date:</strong> {formData.startDate}</li>
        <li><strong>End Date:</strong> {formData.endDate}</li>
      </ul>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="flex justify-between">
        <Button variant="outlined" onClick={prevStep}>Back</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Submit Booking"}
        </Button>
      </div>
    </div>
  );
};

export default SubmitStep;
