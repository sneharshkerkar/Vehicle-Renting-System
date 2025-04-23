import { useState } from 'react';
import NameStep from './components/NameStep';
import WheelsStep from './components/WheelsStep';
import VehicleTypeStep from './components/VehicleTypeStep';
import ModelStep from './components/ModelStep';
import DateRangeStep from './components/DateRangeStep';

const App = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    wheels: '',
    vehicleType: '',
    vehicleModel: '',
    startDate: '',
    endDate: ''
  });

  const updateForm = (newData) => setFormData((prev) => ({ ...prev, ...newData }));
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmit = () => {
    console.log("Form submitted:", formData);
    alert("Booking Submitted! Check the console for submitted data.");
  };

  const steps = [
    <NameStep formData={formData} updateForm={updateForm} nextStep={nextStep} />,
    <WheelsStep formData={formData} updateForm={updateForm} nextStep={nextStep} prevStep={prevStep} />,
    <VehicleTypeStep formData={formData} updateForm={updateForm} nextStep={nextStep} prevStep={prevStep} />,
    <ModelStep formData={formData} updateForm={updateForm} nextStep={nextStep} prevStep={prevStep} />,
    <DateRangeStep formData={formData} updateForm={updateForm} prevStep={prevStep} onSubmit={onSubmit} />
  ];

  return (
    <div className="max-w-xl mx-auto p-4 min-h-screen flex items-center justify-center">
      <div className="w-full shadow-lg rounded-2xl p-6 bg-white">{steps[step]}</div>
    </div>
  );
};

export default App;
