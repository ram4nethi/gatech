import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';

const AddPartsForm = ({ onClose, onSave, vin }) => {
  const [partNumber, setPartNumber] = useState('');
  const [quantity, setQuantity] = useState('');
  const [cost, setCost] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = async () => {
    // Validate form fields
    if (!partNumber || !quantity || !cost || !description) {
      alert('Please enter all required values.');
      return;
    }

    // Save part data to the database
    try {
      const response = await fetch('http://localhost:3001/api/add-parts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vin: 'YOUR_VEHICLE_VIN', // Replace with the actual VIN
          partNumber,
          quantity,
          cost,
          description,
        }),
      });

      if (response.ok) {
        console.log('Part added successfully to the database.');
        // You can perform additional actions after saving if needed
        onSave();
      } else {
        console.error('Failed to add part to the database.');
      }
    } catch (error) {
      console.error('Error adding part:', error);
    }

    // Close the dialog
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Add Part</DialogTitle>
      <DialogContent>

      <TextField
          label="Vin"
          variant="outlined"
          fullWidth
          value={vin}
          disabled
          onChange={(e) => setPartNumber(e.target.value)}
        />
        <TextField
          label="Part Number"
          variant="outlined"
          fullWidth
          value={partNumber}
          onChange={(e) => setPartNumber(e.target.value)}
        />
        <TextField
          label="Quantity"
          variant="outlined"
          fullWidth
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <TextField
          label="Cost"
          variant="outlined"
          fullWidth
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPartsForm;
