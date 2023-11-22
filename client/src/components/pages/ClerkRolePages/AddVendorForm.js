// AddVendorForm.js
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const AddVendorForm = ({ onClose, onSave }) => {
  const [vendorName, setVendorName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSave = async () => {
    // Validate form fields
    if (!vendorName || !street || !city || !state || !postalCode || !phoneNumber) {
      alert('Please enter all required values.');
      return;
    }


    console.log(vendorName, street, city, state, postalCode , phoneNumber)

    // Save vendor data to the database
    try {
      const response = await fetch('http://localhost:3001/api/add-vendor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vendorname:vendorName,
          street:street,
          city:city,
          state:state,
          postalcode:postalCode,
          phonenumber: phoneNumber
        }),
      });

      if (response.ok) {
        console.log('Vendor added successfully to the database.');
      } else {
        console.error('Failed to add vendor to the database.');
      }
    } catch (error) {
      console.error('Error adding vendor:', error);
    }

    // Close the dialog
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Add Vendor</DialogTitle>
      <DialogContent>
        <TextField
          label="Vendor Name"
          variant="outlined"
          fullWidth
          value={vendorName}
          onChange={(e) => setVendorName(e.target.value)}
        />
        <TextField
          label="Street"
          variant="outlined"
          fullWidth
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <TextField
          label="City"
          variant="outlined"
          fullWidth
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <TextField
          label="State"
          variant="outlined"
          fullWidth
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <TextField
          label="Postal Code"
          variant="outlined"
          fullWidth
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
        <TextField
          label="Phone Number"
          variant="outlined"
          fullWidth
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddVendorForm;
