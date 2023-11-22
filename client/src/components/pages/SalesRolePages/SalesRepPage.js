import React, { useState, useEffect } from 'react';
import SearchBar from '../../SearchBar'; 
import Table from '../../Table'; 
import { Paper, Box, Card, CardContent, Typography } from '@mui/material';
import DetailVSalesForm from './DetailVFormSales';

const SalesRep = (authenticatedRole) => {
  const [searchResults, setSearchResults] = useState([]);
  const [vehicleCount, setVehicleCount] = useState(0);
  const [filteredData, setFilteredData] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // Fetch the count of vehicles from the server
    const fetchVehicleCount = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/vehicles/count');
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


  console.log(authenticatedRole);


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
    setSelectedItem(item);
    setViewDialogOpen(true);
  };

  const closeViewDialog = () => {
    setViewDialogOpen(false);
    setSelectedItem(null);
  };


  const handleSearch = async (filters) => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost/api/vehicles`);
      const data = await response.json();


      const filtered = data.filter((item) => {
        const searchTextMatch =
          item.manufacturername.toLowerCase().includes(filters.searchText.toLowerCase()) ||
          item.modelname.toLowerCase().includes(filters.searchText.toLowerCase());
  
        const modelTypeMatch = filters.modelType === '' || item.vehicletype.toLowerCase() === filters.modelType.toLowerCase();
        const modelYearMatch = filters.modelYear === '' || item.modelyear.toString() === filters.modelYear;
  
        return searchTextMatch && modelTypeMatch && modelYearMatch;
      });

      setFilteredData(filtered);

      if (response.ok) {
        setSearchResults(data);
      } else {
        console.error('Error searching for vehicles:', data);
      }
    } catch (error) {
      console.error('Error searching vehicles:', error);
    }
  };

  return (
    <div>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', textAlign: 'center' }}>
        {/*<h2 style={{ marginBottom: '15px' }}>View Inventory</h2> */}

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
        <Table data={filteredData}  onViewClick={handleViewClick}/>
        <DetailVSalesForm open={viewDialogOpen} onClose={closeViewDialog} selectedItem={selectedItem} />
      </Paper>
    </div>
  );
};

export default SalesRep;
