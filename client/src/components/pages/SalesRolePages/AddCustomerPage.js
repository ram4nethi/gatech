import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from '@mui/material';

const AddCustomerForm = ({ onClose, onAddCustomer }) => {
//   const [driverLicenseNumber, setDriverLicenseNumber] = useState('');
  const [customerId, setCustomerId] = useState('');
//   const [email, setEmail] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [street, setStreet] = useState('');
//   const [city, setCity] = useState('');
//   const [state, setState] = useState('');
//   const [postalCode, setPostalCode] = useState('');

  const handleAddCustomer = async () => {
    // Validate input fields
    // if (!driverLicenseNumber || !customerId || !phoneNumber || !firstName || !lastName || !street || !city || !state || !postalCode) {
    //   alert('Please enter all the values.');
    //   return;
    // }

    if(!customerId){
        alert('Please enter all the values.');
           return;

    }
    const customerData = {
        //driverlicensenumber: driverLicenseNumber,
        customerid:customerId,
      //   email:email,
      //   phonenumber:phoneNumber,
      //   firstname:firstName,
      //   lastname:lastName,
      //   street:street,
      //   city:city,
      //   state:state,
      //   postalcode:postalCode,
      };
  
      // Call the function to add customer
      onAddCustomer(customerData);

    //console.log(driverLicenseNumber, customerId, phoneNumber, email, firstName, lastName, street, city, state, postalCode);

    try {
        const response = await fetch('http://localhost:3001/api/add-customer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(customerData),
        });
    
        const data = await response.json();
    
        if (data.success) {
          alert('Customer added successfully.');
          // Additional logic if needed
        } else {
          alert('Failed to add customer.');
        }
      } catch (error) {
        console.error('Error adding customer:', error);
      }



    // Assume you have an API endpoint for adding a customer
    // Adjust the endpoint and payload structure based on your server implementation


    // Close the dialog
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Add Customer Form</DialogTitle>
      <DialogContent>
        {/* Your form fields for adding a customer */}
        {/* <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="Driver License Number"
            variant="outlined"
            fullWidth
            value={driverLicenseNumber}
            onChange={(e) => setDriverLicenseNumber(e.target.value)}
          />
        </Box> */}

        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="Customer Id"
            variant="outlined"
            fullWidth
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
          />
        </Box>
        {/* <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="Street"
            variant="outlined"
            fullWidth
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="City"
            variant="outlined"
            fullWidth
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="State"
            variant="outlined"
            fullWidth
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="Postal Code"
            variant="outlined"
            fullWidth
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </Box> */}
        {/* ... other form fields ... */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAddCustomer}>Add Customer</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCustomerForm;
