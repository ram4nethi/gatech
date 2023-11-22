// InventoryClerkPage.js
import React, { useState, useEffect } from 'react';
import SearchBar from '../../SearchBar';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import Table from '../../Table';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchCustomerForm from './SearchCustomerForm';
import AddVehicleForm from './AddVehiclePage';
import DisplayPartsComponent from './DisplayParts';
import AddPartsOrderForm from './AddPartsOrderForm';


const InventoryClerkPage = ({ onSearch }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [color, setColor] = useState('');
  const navigate = useNavigate();
  const [vehicleData, setVehicleData] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDisplayPartsOpen, setIsDisplayPartsOpen] = useState(false);
  const [isAddPartsFormOpen, setIsAddPartsFormOpen] = useState(false);
  


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

  const handleAddPartsOrderForm =()=>{
    setIsAddPartsFormOpen(true)
  }


  const handleAddVehicle = () => {
    console.log("hiii")
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };


  console.log('isDialogOpen:', isDialogOpen);

  // useEffect(()=>{
  //   axios.get('http://192.168.56.1:3001/api/vehicles').then(res=>setVehicleData(res.data)).catch(err=>console.log(err))
  // }, [])

  // const handleAddVehicle = () => {
  //   // Open the dialog for adding a new vehicle
  //   setIsAddVehicleDialogOpen(true);
  // };

  
  // const handleCancelAddVehicle = () => {
  //   // Close the dialog and reset the form
  //   setIsAddVehicleDialogOpen(false);
  //   setId('');
  //   setMake('');
  //   setModel('');
  //   setYear('');

  // };

  // useEffect(() => {
  //   // Fetch initial data from the server
  //   handleSearch({ searchText: '', color: '', modelYear: '' });
  // }, []); // Empty dependency array ensures the effect runs once on mount

  // const handleSearch = async (filters) => {
  //   try {
  //     setIsLoading(true);

  //     const response = await fetch('http://192.168.56.1:3001/api/vehicles/');
  //     const data = await response.json();

  //     // Apply filtering based on the received data
  //     const filtered = data.filter((item) => {
  //       const searchTextMatch =
  //         item.make.toLowerCase().includes(filters.searchText.toLowerCase()) ||
  //         item.model.toLowerCase().includes(filters.searchText.toLowerCase()) ||
  //         item.id.toLowerCase().includes(filters.searchText.toLowerCase());

  //       const colorMatch = filters.color === '' || item.color.toLowerCase() === filters.color.toLowerCase();
  //       const modelYearMatch = filters.modelYear === '' || item.year.toString() === filters.modelYear;
        

  //       return searchTextMatch && colorMatch && modelYearMatch;
  //     });

  //     setFilteredData(filtered);
  //   } catch (error) {
  //     console.error('Error fetching or filtering data:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   // Fetch initial data from the server
  //   handleSearch({ searchText: '', color: '', modelYear: ''});
  // }, []); // Empty dependency array ensures the effect runs once on mount

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   try {
  //     // Perform the API request to add the new vehicle to the database
  //     const response = await axios.post('/api/vehicles', {
  //       id,
  //       make,
  //       model,
  //       year,
  //       color
  //     });

  //     console.log('New vehicle added:', response.data);

  //     // Close the dialog and reset the form
  //     setIsAddVehicleDialogOpen(false);
  //     setId('');
  //     setMake('');
  //     setModel('');
  //     setYear('');


  //     // Fetch updated data from the server
  //     handleSearch({ searchText: '', color: '', modelYear: '' });
  //   } catch (error) {
  //     console.error('Error adding new vehicle:', error);
  //   }
  // };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      

          <>
      <DialogActions sx={{ display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center', alignItems: 'flex-end', marginRight: '16px' }}>
        <Button variant="contained" size="large" onClick={handleAddVehicle} style={{ width: '100%', height: '40%' }}>
          Add Vehicle
        </Button>
        <Button variant="contained" size="large" style={{ width: '100%', height: '40%' }}>
          View Inventory
        </Button>
        {/* <Button variant="contained" size="large" onClick={handleAddPartsOrderForm} style={{ width: '100%', height: '40%' }}>
          Add Parts
        </Button>
        <Button variant="contained" size="large" onClick={handleDisplayParts}  style={{ width: '100%', height: '40%' }}>
          Display Parts
        </Button> */}
        </DialogActions>


        <Dialog open={isAddPartsFormOpen} onClose={handleAddPartsFormClose}>
          <DialogTitle>Add Parts Form</DialogTitle>
          <DialogContent>
            {/* Display the parts component */}
            <AddPartsOrderForm onClose={handleAddPartsFormClose}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddPartsFormClose}>Close</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={isDisplayPartsOpen} onClose={handleDisplayPartsClose}>
          <DialogTitle>Display Parts</DialogTitle>
          <DialogContent>
            {/* Display the parts component */}
            <DisplayPartsComponent />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDisplayPartsClose}>Close</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={isDialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Add Vehicle</DialogTitle>
          <DialogContent>
            <AddVehicleForm />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            {/* Add save logic here if needed */}
      </DialogActions>
      </Dialog>
      </>
    </div>
  );
};

export default InventoryClerkPage;
