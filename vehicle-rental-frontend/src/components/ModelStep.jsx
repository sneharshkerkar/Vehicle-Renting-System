import { Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useState, useEffect } from 'react';

const ModelStep = ({ formData, updateForm, nextStep, prevStep }) => {
  const [error, setError] = useState(false);
  const [models, setModels] = useState([]);

  useEffect(() => {
    // Mocked vehicle models based on selected type
    const data = {
      Scooter: ["Honda Activa", "TVS Jupiter"],
      Motorbike: ["Yamaha FZ", "Royal Enfield"],
      Sedan: ["Honda City", "Hyundai Verna"],
      SUV: ["Toyota Fortuner", "Mahindra XUV700"],
      Truck: ["Tata Ace", "Mahindra Bolero Pickup"]
    };
    setModels(data[formData.vehicleType] || []);
  }, [formData.vehicleType]);

  const handleNext = () => {
    if (formData.vehicleModel) {
      setError(false);
      nextStep();
    } else {
      setError(true);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Choose a specific model</h2>
      <FormControl component="fieldset" error={error}>
        <FormLabel>Select a model</FormLabel>
        <RadioGroup
          value={formData.vehicleModel}
          onChange={(e) => updateForm({ vehicleModel: e.target.value })}
        >
          {models.map((model, index) => (
            <FormControlLabel key={index} value={model} control={<Radio />} label={model} />
          ))}
        </RadioGroup>
      </FormControl>
      {error && <p className="text-red-500 text-sm">Please select a vehicle model.</p>}
      <div className="flex justify-between">
        <Button variant="outlined" onClick={prevStep}>Back</Button>
        <Button variant="contained" onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
};

export default ModelStep;
