// SearchCustomerForm.js
import React, { useState } from 'react';
import { Paper, TextField, Button, InputLabel } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SearchCustomerForm = () => {
  const [driverLicNum, setDriverLicNum] = useState('');
  const [taxID, setTaxID] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/search-customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          driverLicNum,
          taxID,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const customerExists = data.customerExists;

        if (customerExists) {
          toast.success('Customer exists!');
          // Add logic to return to the previous screen or navigate to the Add Vehicle Form
        } else {
          toast.info('Customer does not exist!');
          // Add logic to navigate to the Add Customer Form
        }
      } else {
        console.error('Error searching for customer:', data);
        toast.error('Error searching for customer. Please try again.');
      }
    } catch (error) {
      console.error('Error searching customer:', error);
      toast.error('Error searching for customer. Please try again.');
    }
  };

  return (
    <div>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '15px' }}>Search Customer Form</h2>
        <TextField
          label="Enter Driver License Number"
          variant="outlined"
          value={driverLicNum}
          onChange={(e) => setDriverLicNum(e.target.value)}
          fullWidth
          style={{ margin: '20px' }}
        />
        <InputLabel>OR</InputLabel>
        <TextField
          label="Enter Tax ID"
          variant="outlined"
          value={taxID}
          onChange={(e) => setTaxID(e.target.value)}
          fullWidth
          style={{ margin: '20px' }}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          style={{ background: '#4CAF50', color: 'white', borderRadius: '5px', cursor: 'pointer' }}
        >
          Search
        </Button>
      </Paper>
    </div>
  );
};

export default SearchCustomerForm;
