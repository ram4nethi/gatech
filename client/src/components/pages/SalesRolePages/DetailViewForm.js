import React from 'react';
import { Paper, Typography, Button, Box } from '@mui/material';

const DetailViewForm = ({ selectedItem, onClose }) => {

    if (!selectedItem) {
        return null; // or render a message indicating no item is selected
      }

  return (
    <Paper elevation={3} style={styles.container}>
      <Typography variant="h5" style={{ marginBottom: '15px' }}>
        Vehicle Details
      </Typography>
      <Box>
      <p>Selected Item: {JSON.stringify(selectedItem)}</p>
        <Typography><b> Manufacturer Name:</b> {selectedItem.manufacturername}</Typography>
        <Typography><b>Model Name:</b> {selectedItem.modelname}</Typography>
        <Typography><b>Vehicle Type:</b> {selectedItem.vehicletype}</Typography>
        <Typography><b>Model Year:</b> {selectedItem.modelyear}</Typography>
        <Typography><b>Fuel Type:</b> {selectedItem.fueltype}</Typography>
        {/* Add more details based on your data */}
      </Box>
      <Button
        variant="contained"
        onClick={onClose}
        style={{ background: '#4CAF50', color: 'white', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' }}
      >
        Close
      </Button>
    </Paper>
  );
};

const styles = {
  container: {
    padding: '20px',
    marginTop: '20px',
    textAlign: 'center',
  },
};

export default DetailViewForm;
