import React from "react";
import { Button, Typography } from "@mui/material";
import {useEffect, useState } from 'react';
import SearchBar from '../../SearchBar'; 
import Table from '../../Table'; 
import { Paper, Box, Card, CardContent } from '@mui/material';
import {DialogActions} from "@mui/material";
import VehicleDetailForm from "./VehicleDetailMForm";


const Manager = ({selectedItem, onClose}) => {
  const [searchResults, setSearchResults] = useState([]);
  const [vehicleCount, setVehicleCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [filteredData, setFilteredData] = useState([]);
  const [isViewClicked, setisViewClicked] = useState(false);
  const [selectedViewItem, setSelectedViewItem] = useState(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [poCount, setPoCount] = useState(null);
  const [purchaseCount, setPurchaseCount] = useState(0);





  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/po-count');
        const data = await response.json();

        if (data.poCount) {
          setPoCount(data.poCount);
        } else {
          console.error('Error fetching part order count:', data.error);
        }
      } catch (error) {
        console.error('Error fetching part order count:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Fetch the count of vehicles from the server
    const fetchVehicleCount = async () => {
      try {
        const response = await fetch('http://localhost:3001/countItems');
        const data = await response.json();

        if (response.ok) {
          const countValue = data[0]["count(vin)"];
          setVehicleCount(countValue);
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
    // Fetch the count of vehicles from the server
    const carCountPurchase = async () => {
      try {
        const response = await fetch('http://localhost:3001/cars-available-purchase');
        const data = await response.json();

        if (response.ok) {
          const countValue = data[0]["count(vin)"];
          setVehicleCount(countValue);
        } else {
          console.error('Error fetching vehicle count:', data);
        }
      } catch (error) {
        console.error('Error fetching vehicle count:', error);
      }
    };

    carCountPurchase();
  }, []);



  useEffect(() => {
    const handleSearch = async () => {
      try {
        setIsLoading(true);

        const response = await fetch('http://localhost:3001/api/purchase-count');
        const data = await response.json();

     
        const countValue = data[0]["purchased_count"];
        setPurchaseCount(countValue);

      } catch (error) {
        console.error('Error fetching or filtering data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    handleSearch();
  }, []);

  
  useEffect(() => {
    const handleSearch = async () => {
      try {
        setIsLoading(true);

        const response = await fetch('http://localhost:3001/api/vehicles');
        const data = await response.json();

        //setVehicleCount(data.length);
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
      //setVehicleCount(data.length);
      setFilteredData(filtered);
    } catch (error) {
      console.error('Error fetching or filtering data:', error);
    } finally {
      setIsLoading(false);
    }
  };



    return (
      <div style={{display:'inline-flex'}}>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', textAlign: 'center', width:'80%', }}>
        
        <div>

        <h2>Part Order Count</h2>
      {poCount !== null ? (
        <div>
          <p>{poCount}</p>
          {/* Additional styling or components can be added for better presentation */}
        </div>
      ) : (
        <p>Loading part order count...</p>
      )} 

      
<h2>Purchase Count</h2>
      {purchaseCount !== null ? (
        <div>
          <p>{purchaseCount}</p>
          {/* Additional styling or components can be added for better presentation */}
        </div>
      ) : (
        <p>Loading part order count...</p>
      )} 
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
        </div>
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

      <Button variant="contained" style={{height:'90px'}}>
        View Reports
      </Button>
    </div>
    );
  };

  export default Manager;