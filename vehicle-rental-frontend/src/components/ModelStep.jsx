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
        setModels(res.data); // Expecting [{ id, name }]
      } catch (err) {
        console.error("Error fetching vehicle models", err);
      }
    };

    fetchModels();
  }, [formData.vehicleTypeId]);

  const handleModelSelect = (e) => {
    const selectedId = parseInt(e.target.value);
    const selectedModel = models.find((model) => model.id === selectedId);

    updateForm({
      vehicleModel: selectedModel.name,
      vehicleId: selectedModel.id,  // Update with the correct property
    });
  };

  const handleNext = () => {
    if (formData.vehicleId) {
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
          value={formData.vehicleId || ""} // Using vehicleId
          onChange={handleModelSelect}
        >
          {models.map((model) => (
            <FormControlLabel
              key={model.id}
              value={model.id}
              control={<Radio />}
              label={model.name}
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
