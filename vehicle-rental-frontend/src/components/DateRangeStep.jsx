import { Button, TextField } from '@mui/material';
import { useState } from 'react';

const DateRangeStep = ({ formData, updateForm, prevStep, onSubmit }) => {
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (formData.startDate && formData.endDate) {
      setError(false);
      onSubmit();
    } else {
      setError(true);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Select booking date range</h2>
      <TextField
        label="Start Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        fullWidth
        value={formData.startDate}
        onChange={(e) => updateForm({ startDate: e.target.value })}
      />
      <TextField
        label="End Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        fullWidth
        value={formData.endDate}
        onChange={(e) => updateForm({ endDate: e.target.value })}
      />
      {error && <p className="text-red-500 text-sm">Please select both dates.</p>}
      <div className="flex justify-between">
        <Button variant="outlined" onClick={prevStep}>Back</Button>
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
};

export default DateRangeStep;
