import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import {Box} from '@mui/material';
import { useState } from 'react';
// import AddPartsOrderForm from './AddPartsOrderForm';
// import DisplayPartsComponent from './DisplayParts';

const VehicleDetailForm = ({ open, onClose, selectedItem }) => {
  
  
  const [isDisplayPartsOpen, setIsDisplayPartsOpen] = useState(false);
  const [isAddPartsFormOpen, setIsAddPartsFormOpen] = useState(false);
  const [vinForAddParts, setVinForAddParts] = useState('');
  const handleDisplayParts = () => {
    // Open the dialog for displaying parts
    setIsDisplayPartsOpen(true);
  };



  const handleDisplayPartsClose = () => {
    // Close the dialog for displaying parts
    setIsDisplayPartsOpen(false);
  };

    
  const handleAddPartsFormClose = () => {
    // Close the dialog for displaying parts
    setIsAddPartsFormOpen(false);
  };

  return (
    <div>




    <Dialog open={open} onClose={onClose} sx={{ Width: '100%' }}>

        <div style={{display:'flex', padding:'10', margin:'10'}}>

        
        {/* <Button variant="contained" size="large" style={{ width: '100%', height: '40%' }}>
          Add Parts
        </Button>
        <Button variant="contained" size="large" onClick={handleDisplayParts}  style={{ width: '100%', height: '40%' }}>
          Display Parts
        </Button> */}


</div>



        <Dialog open={isAddPartsFormOpen} onClose={handleAddPartsFormClose}>
          <DialogTitle>Add Parts Form</DialogTitle>
          <DialogContent>
            {/* Display the parts component */}
           
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddPartsFormClose}>Close</Button>
          </DialogActions>
        </Dialog> 


         <Dialog  onClose={handleDisplayPartsClose}>
           <DialogTitle>Display Parts</DialogTitle>
           <DialogContent>
             {/* Display the parts component */}
            
           </DialogContent>
           <DialogActions>
             <Button onClick={handleDisplayPartsClose}>Close</Button>
           </DialogActions>
         </Dialog> 

       
      <DialogTitle>View Vehicle Details</DialogTitle>
      <DialogContent sx={{ p: 6, Width: '600px' }} >

        <form>
        <Box sx={{ marginBottom: 3 }}>
        <TextField
            label="Vin"
            variant="outlined"
            fullWidth
            value={selectedItem?.vin || ''}
            disabled
          />
            </Box>

            <Box sx={{ marginBottom: 3 }}>
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
          <Box sx={{ marginBottom: 3 }}>

                    <TextField
            label="Model Year"
            variant="outlined"
            fullWidth
            value={selectedItem?.modelyear || ''}
            disabled
          />
          </Box>

          <Box sx={{ marginBottom: 3 }}>
                    <TextField
            label="Manufacturer Name"
            variant="outlined"
            fullWidth
            value={selectedItem?.manufacturername || ''}
            disabled
          />
          </Box>
          <Box sx={{ marginBottom: 3 }}>
          <TextField
            label="Fuel Type"
            variant="outlined"
            fullWidth
            value={selectedItem?.fueltype || ''}
            disabled
          />
          </Box>

          <Box sx={{ marginBottom: 3 }}>
                              <TextField
            label="Mileage"
            variant="outlined"
            fullWidth
            value={selectedItem?.mileage || ''}
            disabled
          />
          </Box>
          <Box sx={{ marginBottom: 3 }}>
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            value={selectedItem?.description || ''}
            disabled
          />
          </Box>
          <Box sx={{ marginBottom: 3 }}>
            <TextField
            label="Condition"
            variant="outlined"
            fullWidth
            value={selectedItem?.condition || ''}
            disabled
          />
          </Box>          
          <Box sx={{ marginBottom: 3 }}>
                      <TextField
            label="Purchase Price"
            variant="outlined"
            fullWidth
            value={selectedItem?.purchaseprice || ''}
            disabled
          />
          </Box>
          <Box sx={{ marginBottom: 3 }}>
                      <TextField
            label="Purchase Date"
            variant="outlined"
            fullWidth
            value={selectedItem?.purchasedate || ''}
            disabled
          />
          </Box>
          <Box sx={{ marginBottom: 3 }}>
            <TextField
            label="Sales Price"
            variant="outlined"
            fullWidth
            value={selectedItem?.salesprice || ''}
            disabled
          />
          </Box>


          {/* Add more fields based on your data */}
 
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
    </div>
  );
};

export default VehicleDetailForm;
