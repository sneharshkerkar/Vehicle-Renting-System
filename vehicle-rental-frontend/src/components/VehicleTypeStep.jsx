import { Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useState, useEffect } from 'react';

const VehicleTypeStep = ({ formData, updateForm, nextStep, prevStep }) => {
  const [error, setError] = useState(false);
  const [vehicleTypes, setVehicleTypes] = useState([]);

  useEffect(() => {
    // Mocked vehicle types based on wheel count
    const types = formData.wheels === "2" ? ["Scooter", "Motorbike"] : ["Sedan", "SUV", "Truck"];
    setVehicleTypes(types);
  }, [formData.wheels]);

  const handleNext = () => {
    if (formData.vehicleType) {
      setError(false);
      nextStep();
    } else {
      setError(true);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">What type of vehicle do you want?</h2>
      <FormControl component="fieldset" error={error}>
        <FormLabel>Choose a vehicle type</FormLabel>
        <RadioGroup
          value={formData.vehicleType}
          onChange={(e) => updateForm({ vehicleType: e.target.value })}
        >
          {vehicleTypes.map((type, index) => (
            <FormControlLabel key={index} value={type} control={<Radio />} label={type} />
          ))}
        </RadioGroup>
      </FormControl>
      {error && <p className="text-red-500 text-sm">Please select a vehicle type.</p>}
      <div className="flex justify-between">
        <Button variant="outlined" onClick={prevStep}>Back</Button>
        <Button variant="contained" onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
};

export default VehicleTypeStep;
