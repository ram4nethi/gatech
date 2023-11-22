import React, { useState } from 'react';
import { Paper, TextField, Button, Typography, Grid } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCustomerForm = () => {
  const [customerData, setCustomerData] = useState({
    customerid: '',
    firstname: '',
    lastname: '',
    street: '',
    city: '',
    state: '',
    postalcode: '',
    email: '',
    phonenumber: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddCustomer = () => {

    //FOrm Validation
    const requiredFields = ['customerid', 'firstname', 'lastname', 'street', 'city', 'state', 'postalcode', 'email', 'phonenumber'];
    const missingFields = requiredFields.filter((field) => !customerData[field]);

    if (missingFields.length > 0) {
      // Display error toast for missing fields
      toast.error(`Please enter values for the following fields: ${missingFields.join(', ')}`);
      return;
    }

    // Additional format validation (you can customize this based on your requirements)

    // Check if customerid is a number
    if (isNaN(customerData.customerid)) {
      toast.error('Customer ID must be a number');
      return;
    }

    // Check if phonenumber is a valid phone number
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(customerData.phonenumber)) {
      toast.error('Please enter a valid phone number (10 digits)');
      return;
    }

    // Check if email is a valid email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    // If all validations pass, proceed with adding the customer
    // For now, just log the customer data to the console
    console.log('Customer Data:', customerData);

    // You can now proceed with the database insertion queries
  };


  return (
    <div>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', textAlign: 'center' }}>
        <Typography variant="h5" style={{ marginBottom: '15px' }}>
          Add Customer Form
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Customer ID"
              variant="outlined"
              name="customerid"
              type="number"
              value={customerData.customerid}
              onChange={handleInputChange}
              fullWidth
              style={{ marginBottom: '20px' }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              variant="outlined"
              name="firstname"
              value={customerData.firstname}
              onChange={handleInputChange}
              fullWidth
              style={{ marginBottom: '20px' }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              variant="outlined"
              name="lastname"
              value={customerData.lastname}
              onChange={handleInputChange}
              fullWidth
              style={{ marginBottom: '20px' }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Street"
              variant="outlined"
              name="street"
              value={customerData.street}
              onChange={handleInputChange}
              fullWidth
              style={{ marginBottom: '20px' }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="City"
              variant="outlined"
              name="city"
              value={customerData.city}
              onChange={handleInputChange}
              fullWidth
              style={{ marginBottom: '20px' }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="State"
              variant="outlined"
              name="state"
              value={customerData.state}
              onChange={handleInputChange}
              fullWidth
              style={{ marginBottom: '20px' }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Postal Code"
              variant="outlined"
              name="postalcode"
              value={customerData.postalcode}
              onChange={handleInputChange}
              fullWidth
              style={{ marginBottom: '20px' }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              value={customerData.email}
              onChange={handleInputChange}
              fullWidth
              style={{ marginBottom: '20px' }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone Number"
              variant="outlined"
              name="phonenumber"
              value={customerData.phonenumber}
              onChange={handleInputChange}
              fullWidth
              style={{ marginBottom: '20px' }}
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          onClick={handleAddCustomer}
          style={{ background: '#4CAF50', color: 'white', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' }}
        >
          Add Customer
        </Button>
      </Paper>
    </div>
  );
};

export default AddCustomerForm;
