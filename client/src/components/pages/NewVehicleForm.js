import React, { useState } from 'react';
import { Paper, TextField, Button, Box, Typography, Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewVehicleForm = () => {

  const [vin, setVin] = useState('');
  const [email, setEmail] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [modelname, setModelname] = useState('');
  const [modelyear, setModelyear] = useState('');
  const [manufacturername, setManufacturername] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [mileage, setMileage] = useState('');
  const [customerid, setCustomerid] = useState('');
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [colors, setColors] = useState([]);
  const [vehicleData, setVehicleData] = useState({
    vin: '',
    email: '',
    vehicletype: '',
    modelname: '',
    modelyear: '',
    manufacturername: '',
    fueltype: '',
    mileage: '',
    customerid: '',
    description: '',
    condition: '',
    purchaseprice: '',
    purchasedate: '',
    colors: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicleData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddVehicle = async () => {
    // Form validation
    const requiredFields = ['vin', 'email', 'vehicletype', 'modelname', 'modelyear', 'manufacturername', 'fueltype', 'mileage', 'customerid', 'description', 'condition', 'purchaseprice', 'purchasedate', 'colors'];
    const missingFields = requiredFields.filter((field) => !vehicleData[field]);

    if (missingFields.length > 0) {
      // Display error toast for missing fields
      toast.error(`Please enter values for the following fields: ${missingFields.join(', ')}`);
      return;
    }

    // Additional format validation (you can customize this based on your requirements)

    // // Check if vin is a number
    // if (isNaN(vehicleData.vin)) {
    //   toast.error('VIN must be a number');
    //   return;
    // }

    // // Check if modelyear is a valid number
    // if (isNaN(vehicleData.modelyear) || vehicleData.modelyear > new Date().getFullYear() + 1) {
    //   toast.error('Please enter a valid model year');
    //   return;
    // }

    // // Check if mileage is a valid number
    // if (isNaN(vehicleData.mileage)) {
    //   toast.error('Please enter a valid mileage');
    //   return;
    // }

    // // Check if customerid is a valid number
    // if (isNaN(vehicleData.customerid)) {
    //   toast.error('Customer ID must be a number');
    //   return;
    // }

    // // Check if purchaseprice is a valid float
    // const priceRegex = /^\d+(\.\d{1,2})?$/;
    // if (!priceRegex.test(vehicleData.purchaseprice)) {
    //   toast.error('Please enter a valid purchase price (e.g., 123456.78)');
    //   return;
    // }

    // // Check if purchasedate is a valid date
    // const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    // if (!dateRegex.test(vehicleData.purchasedate)) {
    //   toast.error('Please enter a valid purchase date (YYYY-MM-DD)');
    //   return;
    // }

    // If all validations pass, proceed with adding the vehicle
    // For now, just log the vehicle data to the console
    console.log('Vehicle Data:', vehicleData);


    try {
      const response = await fetch('http://localhost:3001/api/add-vehicle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vehicleData),
      });

      if (response.ok) {
        console.log('Vehicle added successfully to the database.');
        // You can perform additional actions after saving if needed
      } else {
        console.error('Failed to add vehicle to the database.');
      }
    } catch (error) {
      console.error('Error adding vehicle:', error);
    }

    // Clear the form fields after adding a vehicle
    // You can also add more sophisticated form handling here
    setVin('');
    // ... clear other form fields ...
  };

    // You can now proceed with the database insertion queries

  return (

<Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 8,
          width: "70%"
        }}
      >
<Paper
        elevation={3}
        style={{ padding: '20px', marginTop: '20px', textAlign: 'center' }}
      >
        <h2 style={{ marginBottom: '15px' }}>New Vehicle Form</h2>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="VIN"
              variant="outlined"
              value={vin}
              onChange={(e) => setVin(e.target.value)}
              fullWidth
              style={{ marginBottom: '20px' }}
            />
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              style={{ marginBottom: '20px' }}
            />
            <FormControl fullWidth variant="outlined" style={{ marginBottom: '20px' }}>
              <InputLabel>Vehicle Type</InputLabel>
              <Select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                label="Vehicle Type"
              >
                {/* Add options for vehicle types */}
                <MenuItem value="Sedan">Sedan</MenuItem>
                <MenuItem value="SUV">SUV</MenuItem>
                {/* Add more options as needed */}
              </Select>
            </FormControl>
            <TextField
              label="Mileage"
              variant="outlined"
              value={mileage}
              onChange={(e) => setMileage(e.target.value)}
              fullWidth
              style={{ marginBottom: '20px' }}
            />
            <TextField
              label="Customer ID"
              variant="outlined"
              value={customerid}
              onChange={(e) => setCustomerid(e.target.value)}
              fullWidth
              style={{ marginBottom: '20px' }}
            />
            <TextField
              label="Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              style={{ marginBottom: '20px' }}
            />
                       <TextField
              label="Purchase Price"
              variant="outlined"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
              fullWidth
              style={{ marginBottom: '20px' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Model Name"
              variant="outlined"
              value={modelname}
              onChange={(e) => setModelname(e.target.value)}
              fullWidth
              style={{ marginBottom: '20px' }}
            />
            <TextField
              label="Model Year"
              variant="outlined"
              value={modelyear}
              onChange={(e) => setModelyear(e.target.value)}
              fullWidth
              style={{ marginBottom: '20px' }}
            />
            <TextField
              label="Manufacturer Name"
              variant="outlined"
              value={manufacturername}
              onChange={(e) => setManufacturername(e.target.value)}
              fullWidth
              style={{ marginBottom: '20px' }}
            />
            <FormControl fullWidth variant="outlined" style={{ marginBottom: '20px' }}>
              <InputLabel>Fuel Type</InputLabel>
              <Select
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value)}
                label="Fuel Type"
              >
                {/* Add options for fuel types */}
                <MenuItem value="Petrol">Petrol</MenuItem>
                <MenuItem value="Diesel">Diesel</MenuItem>
                {/* Add more options as needed */}
              </Select>
            </FormControl>
            <TextField
              label="Condition"
              variant="outlined"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              fullWidth
              style={{ marginBottom: '20px' }}
            />
 
            <TextField
              label="Purchase Date"
              variant="outlined"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
              fullWidth
              style={{ marginBottom: '20px' }}
            />
            <TextField
              label="Colors"
              variant="outlined"
              value={colors}
              onChange={(e) => setColors(e.target.value)}
              fullWidth
              style={{ marginBottom: '20px' }}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          onClick={handleAddVehicle}
          style={{
            background: '#4CAF50',
            color: 'white',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Add Vehicle
        </Button>
      </Paper>

      </Box>
  );
};

export default NewVehicleForm;