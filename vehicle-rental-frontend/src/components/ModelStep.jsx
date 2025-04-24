import {
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

const ModelStep = ({ formData, updateForm, nextStep, prevStep }) => {
  const [error, setError] = useState(false);
  const [models, setModels] = useState([]);

  useEffect(() => {
    const fetchModels = async () => {
      if (!formData.vehicleTypeId) return;

      try {
        const res = await axios.get(
          `http://localhost:3000/api/vehicles?typeId=${formData.vehicleTypeId}`
        );
        const modelNames = res.data.map((vehicle) => vehicle.name);
        setModels(modelNames);
      } catch (err) {
        console.error("Error fetching vehicle models", err);
      }
    };

    fetchModels();
  }, [formData.vehicleTypeId]);  // Re-run this whenever vehicleTypeId changes

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
            <FormControlLabel
              key={index}
              value={model}
              control={<Radio />}
              label={model}
            />
          ))}
        </RadioGroup>
      </FormControl>
      {error && (
        <p className="text-red-500 text-sm">Please select a vehicle model.</p>
      )}
      <div className="flex justify-between">
        <Button variant="outlined" onClick={prevStep}>
          Back
        </Button>
        <Button variant="contained" onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default ModelStep;
