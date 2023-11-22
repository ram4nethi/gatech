    import React, { useState, useEffect } from 'react';
    import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
    import AddCustomerForm from './AddCustomerPage';

    const SalesOrderForm = ({ onClose, selectedItem }) => {
    const [vin, setvin] = useState('');
    const [status, setStatus] = useState('');
    const [sellingDate, setSellingDate] = useState('');

    const [customerIds, setCustomerIds] = useState([]);
    const [selectedCustomerId, setSelectedCustomerId] = useState('');
    const [searchedCustomerId, setSearchedCustomerId] = useState('');
    const [customerExists, setCustomerExists] = useState(true);
    const [showAddCustomerForm, setShowAddCustomerForm] = useState(false);

    useEffect(() => {
        // Fetch customer IDs when the form opens
        const fetchCustomerIds = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/customers');
            const data = await response.json();

            setCustomerIds(data);
        } catch (error) {
            console.error('Error fetching customer IDs:', error);
        }
        };

        fetchCustomerIds();
    }, []);


    
    const handleSearch = async () => {
        try {
        const response = await fetch(`http://localhost:3001/api/customer/${searchedCustomerId}`);
        const data = await response.json();
    
        setCustomerExists(data.customerExists);

    
        if (!data.customerExists) {
            alert('Entered customer ID does not exist. Please enter a valid customer ID.');
        }

        } catch (error) {
        console.error('Error searching for customer:', error);
        }
    };

    const handleAddCustomer = async (customerData) => {
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
      };

    const handleSave = async() => {
        // Validate input fields

        console.log(vin, sellingDate, selectedCustomerId);
        if ( !sellingDate || !selectedCustomerId) {
        alert('Please enter all required values.');
        return;
        }
        if (!customerExists) {
            alert('Entered customer ID does not exist. Please enter a valid customer ID.');
            return;
        }


        try {
            // Assuming selectedItem contains vin, customeridsoldto, and sellingdate properties
            const { vin, customeridsoldto, sellingdate } = selectedItem;
        
            const response = await fetch('http://localhost:3001/api/update-vehicle', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ vin:vin, customeridsoldto:selectedCustomerId, sellingdate:sellingDate }),
            });
        
            const data = await response.json();
        
            if (data.success) {
            alert('Vehicle information updated successfully.');
            // Additional logic if needed
            } else {
            alert('Failed to update vehicle information.');
            }
        } catch (error) {
            console.error('Error updating vehicle information:', error);
        }

        // Assuming you have an API call to update the part status
        // Replace the API call with your actual logic
        // Example: updatePartStatus(partNumber, status);

        // Close the dialog
        onClose();
    };

    return (
        <Dialog open={true} onClose={onClose}>

            {!customerExists && <Button onClick={() => setShowAddCustomerForm(true)}>Add Customer</Button>}
        <DialogTitle>Sales Order Form</DialogTitle>
        <DialogContent>

        {showAddCustomerForm && (
  <AddCustomerForm
    onClose={() => setShowAddCustomerForm(false)}
    onAddCustomer={handleAddCustomer} // Pass the function to handle adding a customer
  />
)}
            <Box sx={{ marginBottom: 2 }}>
            <TextField
                label="Vin"
                variant="outlined"
                fullWidth
                value={selectedItem.vin}
                onChange={(e) => setvin(e.target.value)}
            />
            </Box>


            <Box sx={{ marginBottom: 2 }}>
                <TextField
                label="Search Customer ID"
                variant="outlined"
                fullWidth
                value={searchedCustomerId}
                onChange={(e) => setSearchedCustomerId(e.target.value)}
                />
                <Button variant="contained" onClick={handleSearch} style={{ marginLeft: '10px' }}>
                Search
                </Button>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <FormControl fullWidth variant="outlined">
                <InputLabel id="customer-id-label">Customer ID</InputLabel>
                <Select
                    labelId="customer-id-label"
                    id="customer-id"
                    value={selectedCustomerId}
                    onChange={(e) => setSelectedCustomerId(e.target.value)}
                    label="CustomerID"
                >
                    {customerIds.map((customerId) => (
                    <MenuItem key={customerId} value={customerId}>
                        {customerId}
                    </MenuItem>
                    ))}
                </Select>
                </FormControl>
            </Box>

            <Box sx={{ marginBottom: 2 }}>
            <TextField
                label="Selling Date"
                type="date"
                variant="outlined"
                fullWidth
                onChange={(e) => setSellingDate(e.target.value)}
            />
            </Box>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
        </DialogActions>
        </Dialog>
    );
    };

    export default SalesOrderForm;
