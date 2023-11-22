import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchVendorForm from './SearchVendorForm';
import { useState } from 'react';
import AddVendorForm from './AddVendorForm';
import AddPartsForm from './AddPartsForm';

const AddPartsOrderForm = ({ onClose }) => {


    const [isSearchVendorFormOpen, setIsSearchVendorFormOpen] = useState(false);
    const [showAddVendorForm, setShowAddVendorForm] = useState(false);
    const [showAddPartsForm, setShowAddPartsForm] = useState(false);
    const [vinForAddParts, setVinForAddParts] = useState(''); // Add state to store VIN value


    

  const navigate = useNavigate();

  const handleSearchVendor = () => {
    // Navigate to Search Vendor Form
    navigate('/search-vendor');
    setIsSearchVendorFormOpen(true);

  };

  const handleAddVendor = () => {
    // Navigate to Add Vendor Form
    navigate('/add-vendor');
  };

  const handleAddParts = () => {
    // Navigate to Add Parts Form
    setShowAddPartsForm(true)

  };

  const handleUpdateParts = () => {
    // Navigate to Update Parts Form
    navigate('/update-parts');
  };

  const handleCancel = () => {
    // Close the dialog
    onClose();
  };
  const handleSearchVendorFormClose = () => {
    setIsSearchVendorFormOpen(false);
  };


  const handleAddVendorButtonClick = () => {
    setShowAddVendorForm(true);
  };


  const handleSearchVendorResult = (vendorName) => {
    // Perform the search query and handle the result
    // Here you can use your API or database query logic

    // For now, simulate a result
    const searchResult = vendorName === 'existingVendor' ? [{ vendorname: vendorName }] : [];

    if (searchResult.length > 0) {
      // Show the vendor details or take necessary action
      console.log('Vendor Found:', searchResult[0]);
    } else {
      // If no result, show the Add Vendor form
      console.log('Vendor Not Found. Show Add Vendor Form');
      // Add logic to open Add Vendor Form
    }

    // Close the Search Vendor Form
    handleSearchVendorFormClose();
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Add Parts Order</DialogTitle>
      <DialogContent>
        {/* Your form content goes here */}

        {/* Add buttons for different actions */}
        <Button variant="contained" onClick={handleSearchVendor} style={{ marginBottom: '8px' }}>
          Search Vendor
        </Button>


              {/* Search Vendor Form */}
      {isSearchVendorFormOpen && (
        <SearchVendorForm onClose={handleSearchVendorFormClose} onSearch={handleSearchVendorResult} />
      )}
        <Button variant="contained" onClick={handleAddVendorButtonClick} style={{ marginBottom: '8px' }}>
          Add Vendor
        </Button>
        <Button variant="contained" onClick={handleAddParts} style={{ marginBottom: '8px' }}>
          Add Parts
        </Button>
        <Button variant="contained" onClick={handleUpdateParts} style={{ marginBottom: '8px' }}>
          Update Parts
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        {/* Add save logic here if needed */}
      </DialogActions>
        {/* AddVendorForm component */}
        {showAddPartsForm && (
        <AddPartsForm
          onClose={() => {
            setShowAddPartsForm(false);
            setVinForAddParts(''); // Reset VIN value when closing the form
          }}
          onSave={handleAddVendor}
          vin={vinForAddParts} // Pass VIN value to AddPartsForm
        />
      )}

        {showAddVendorForm && (
        <AddVendorForm onClose={() => setShowAddVendorForm(false)} onSave={handleAddVendor} />
      )}
    </Dialog>
  );
};

export default AddPartsOrderForm;
