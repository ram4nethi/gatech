import React, { useState, useEffect } from 'react';
import SearchBar from '../../SearchBar'; 
import Table from '../../Table'; 
import { Paper, Box, Card, CardContent, Typography } from '@mui/material';
import VehicleDetailForm from './VehicleDetailForm';

const ViewInventory = ({selectedItem, onClose}) => {
  const [searchResults, setSearchResults] = useState([]);
  const [vehicleCount, setVehicleCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [filteredData, setFilteredData] = useState([]);
  const [isViewClicked, setisViewClicked] = useState(false);
  const [selectedViewItem, setSelectedViewItem] = useState(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  useEffect(() => {
    // Fetch the count of vehicles from the server
    const fetchVehicleCount = async () => {
      try {
        const response = await fetch('http://localhost:3001/count');
        const data = await response.json();

        if (response.ok) {
          setVehicleCount(data.count);
        } else {
          console.error('Error fetching vehicle count:', data);
        }
      } catch (error) {
        console.error('Error fetching vehicle count:', error);
      }
    };

    fetchVehicleCount();
  }, []);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        setIsLoading(true);

        const response = await fetch('http://localhost:3001/api/vehicles');
        const data = await response.json();

        setVehicleCount(data.length);
        setFilteredData(data);

      } catch (error) {
        console.error('Error fetching or filtering data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    handleSearch();
  }, []);

  

  const handleViewClick = (item) => {
    setSelectedViewItem(item);
    setIsDetailDialogOpen(true);
  };

  const handleSearch = async (filters) => {
    try {
      setIsLoading(true);
  
      const response = await fetch('http://localhost:3001/api/vehicles');
      const data = await response.json();
  
      // Apply filtering based on the received data
      const filtered = data.filter((item) => {
        const searchTextMatch =
          item.manufacturername.toLowerCase().includes(filters.searchText.toLowerCase()) ||
          item.modelname.toLowerCase().includes(filters.searchText.toLowerCase());
  
        const modelTypeMatch = filters.modelType === '' || item.vehicletype.toLowerCase() === filters.modelType.toLowerCase();
        const modelYearMatch = filters.modelYear === '' || item.modelyear.toString() === filters.modelYear;
  
        return searchTextMatch && modelTypeMatch && modelYearMatch;
      });
      console.log(filtered);
      console.log(data.length);
      setVehicleCount(data.length);
      setFilteredData(filtered);
    } catch (error) {
      console.error('Error fetching or filtering data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', textAlign: 'center', width:'80%', }}>
        <Card style={{ maxWidth: '200px', margin: 'auto', marginBottom: '20px' }}>
          <CardContent>
            <Typography variant="h6" component="div">
              Vehicle Count
            </Typography>
            <Typography variant="h4" component="div">
              {vehicleCount}
            </Typography>
          </CardContent>
        </Card>
        <SearchBar onSearch={handleSearch} />
        <Table data={filteredData} onViewClick={handleViewClick} />

        {isDetailDialogOpen && (
        <VehicleDetailForm
          open={isDetailDialogOpen}
          onClose={() => setIsDetailDialogOpen(false)}
          selectedItem={selectedViewItem}
        />
      )}
      </Paper>
    </div>
  );
};

export default ViewInventory;
