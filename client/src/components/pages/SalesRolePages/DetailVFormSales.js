import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import {Box} from '@mui/material';
import SalesOrderForm from './SalesOrderForm';
import { useState } from 'react';

const DetailVSalesForm = ({ open, onClose, selectedItem }) => {
    const [salesOrderFormOpen, setSalesOrderFormOpen] = useState(false);
    const[isSellClicked, setisSellClicked] = useState(false);

    const handleSellClick = () => {
      setSalesOrderFormOpen(true);
    };

    const handleSalesOrderFormClose = () => {
        setSalesOrderFormOpen(false);
      };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>View Vehicle Details</DialogTitle>
      <DialogContent sx={{ p: 4 }}>

        <form>
        <Box sx={{ marginBottom: 2 }}>
        <TextField
            label="Vin"
            variant="outlined"
            fullWidth
            value={selectedItem?.vin || ''}
            disabled
          />
            </Box>

            <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="Vehicle Type"
            variant="outlined"
            fullWidth
            value={selectedItem?.vehicletype || ''}
            disabled
          />
            </Box>
          <TextField
            label="Model Name"
            variant="outlined"
            fullWidth
            value={selectedItem?.modelname || ''}
            disabled
          />
          <Box sx={{ marginBottom: 2 }}>

                    <TextField
            label="Model Year"
            variant="outlined"
            fullWidth
            value={selectedItem?.modelyear || ''}
            disabled
          />
          </Box>

          <Box sx={{ marginBottom: 2 }}>
                    <TextField
            label="Manufacturer Name"
            variant="outlined"
            fullWidth
            value={selectedItem?.manufacturername || ''}
            disabled
          />
          </Box>
          <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="Fuel Type"
            variant="outlined"
            fullWidth
            value={selectedItem?.fueltype || ''}
            disabled
          />
          </Box>

          <Box sx={{ marginBottom: 2 }}>
                              <TextField
            label="Mileage"
            variant="outlined"
            fullWidth
            value={selectedItem?.mileage || ''}
            disabled
          />
          </Box>
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            value={selectedItem?.description || ''}
            disabled
          />
          <Box sx={{ marginBottom: 2 }}>
            <TextField
            label="Sales Price"
            variant="outlined"
            fullWidth
            value={selectedItem?.salesprice || ''}
            disabled
          />
          </Box>

          <Button onClick={handleSellClick}>Sell</Button>

          {/* Add more fields based on your data */}
 
        </form>
        {salesOrderFormOpen && (
          <SalesOrderForm onClose={handleSalesOrderFormClose} selectedItem={selectedItem} />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetailVSalesForm;
