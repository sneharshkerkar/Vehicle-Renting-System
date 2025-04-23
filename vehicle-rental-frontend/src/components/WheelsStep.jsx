import {
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from '@mui/material';
import { useState } from 'react';

const WheelsStep = ({ formData, updateForm, nextStep, prevStep }) => {
  const [error, setError] = useState(false);

  const handleNext = () => {
    if (formData.wheels) {
      setError(false);
      nextStep();
    } else {
      setError(true);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Number of wheels?</h2>

      <FormControl component="fieldset" error={error} className="w-full">
        <FormLabel component="legend">Choose</FormLabel>
        <RadioGroup
          value={formData.wheels}
          onChange={(e) => updateForm({ wheels: e.target.value })}
        >
          <FormControlLabel value="2" control={<Radio />} label="2 Wheels" />
          <FormControlLabel value="4" control={<Radio />} label="4 Wheels" />
        </RadioGroup>
        {error && <FormHelperText>Please select a wheel option.</FormHelperText>}
      </FormControl>

      <div className="flex justify-between pt-4">
        <Button variant="outlined" onClick={prevStep} size="large">
          Back
        </Button>
        <Button variant="contained" onClick={handleNext} size="large">
          Next
        </Button>
      </div>
    </div>
  );
};

export default WheelsStep;
