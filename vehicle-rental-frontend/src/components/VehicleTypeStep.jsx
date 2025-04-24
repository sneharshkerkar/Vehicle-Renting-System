import {
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';

const VehicleTypeStep = ({ formData, updateForm, nextStep, prevStep }) => {
  const [error, setError] = useState(false);
  const [vehicleTypes, setVehicleTypes] = useState([]);

  useEffect(() => {
    const fetchVehicleTypes = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/vehicle-types?wheels=${formData.wheels}`);
        setVehicleTypes(res.data);
      } catch (err) {
        console.error("Error fetching vehicle types", err);
      }
    };

    if (formData.wheels) {
      fetchVehicleTypes();
    }
  }, [formData.wheels]);

  const handleVehicleTypeSelect = (e) => {
    const selectedTypeName = e.target.value;
    const selectedType = vehicleTypes.find((type) => type.name === selectedTypeName);

    updateForm({
      vehicleType: selectedType.name,
      vehicleTypeId: selectedType.id
    });
  };

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
          onChange={handleVehicleTypeSelect}
        >
          {vehicleTypes.map((type) => (
            <FormControlLabel key={type.id} value={type.name} control={<Radio />} label={type.name} />
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
