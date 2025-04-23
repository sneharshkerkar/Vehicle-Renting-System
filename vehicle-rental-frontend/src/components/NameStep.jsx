import { Button, TextField } from '@mui/material';
import { useState } from 'react';

const NameStep = ({ formData, updateForm, nextStep }) => {
  const [error, setError] = useState(false);

  const handleNext = () => {
    if (formData.firstName.trim() && formData.lastName.trim()) {
      setError(false);
      nextStep();
    } else {
      setError(true);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">What is your name?</h2>

      <TextField
        label="First Name"
        fullWidth
        size="small"
        variant="outlined"
        value={formData.firstName}
        onChange={(e) => updateForm({ firstName: e.target.value })}
        error={error && !formData.firstName}
        helperText={error && !formData.firstName ? 'Required' : ''}
      />

      <TextField
        label="Last Name"
        fullWidth
        size="small"
        variant="outlined"
        value={formData.lastName}
        onChange={(e) => updateForm({ lastName: e.target.value })}
        error={error && !formData.lastName}
        helperText={error && !formData.lastName ? 'Required' : ''}
      />

      {error && (
        <p className="text-sm text-red-500">Please enter both first and last name.</p>
      )}

      <Button variant="contained" onClick={handleNext} className="w-full" size="large">
        Next
      </Button>
    </div>
  );
};

export default NameStep;
