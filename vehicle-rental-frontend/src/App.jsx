import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';

import NameStep from './components/NameStep';
import WheelsStep from './components/WheelsStep';
import VehicleTypeStep from './components/VehicleTypeStep';
import ModelStep from './components/ModelStep';
import DateRangeStep from './components/DateRangeStep';
import BookingConfirmation from './components/BookingConfirmation';
import ToastNotification from './components/ToastNotification'; // Import the ToastNotification component

const BookingForm = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    wheels: '',
    vehicleType: '',
    vehicleTypeId: '',
    vehicleModel: '',
    vehicleModelId: '',
    startDate: '',
    endDate: '',
  });
  const [errorMessage, setErrorMessage] = useState(null); // State to handle error messages

  const updateForm = (newData) => setFormData((prev) => ({ ...prev, ...newData }));
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/bookings', formData);
      console.log('Booking successful:', res.data);

      navigate('/confirmation', {
        state: {
          booking: {
            ...formData,
            ...res.data,
          }
        }
      });
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setErrorMessage(err.response.data.message); // Set the error message if overlapping dates
      } else {
        console.error('Booking submission failed:', err);
        setErrorMessage('Something went wrong while booking. Please try again later.');
      }
    }
  };

  const steps = [
    <NameStep formData={formData} updateForm={updateForm} nextStep={nextStep} />,
    <WheelsStep formData={formData} updateForm={updateForm} nextStep={nextStep} prevStep={prevStep} />,
    <VehicleTypeStep formData={formData} updateForm={updateForm} nextStep={nextStep} prevStep={prevStep} />,
    <ModelStep formData={formData} updateForm={updateForm} nextStep={nextStep} prevStep={prevStep} />,
    <DateRangeStep formData={formData} updateForm={updateForm} prevStep={prevStep} onSubmit={onSubmit} />,
  ];

  return (
    <div className="max-w-xl mx-auto p-4 min-h-screen flex items-center justify-center">
      <div className="w-full shadow-lg rounded-2xl p-6 bg-white">
        {steps[step]}
      </div>

      {errorMessage && (
        <ToastNotification message={errorMessage} onClose={() => setErrorMessage(null)} />
      )}
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<BookingForm />} />
      <Route path="/confirmation" element={<BookingConfirmation />} />
    </Routes>
  );
};

export default App;
