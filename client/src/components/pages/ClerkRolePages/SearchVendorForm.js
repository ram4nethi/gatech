import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';


const SearchVendorForm = ({ onClose }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [showAddVendorButton, setShowAddVendorButton] = useState(false);
  const [showAddVendorForm, setShowAddVendorForm] = useState(false);

  useEffect(() => {
    // Fetch all vendors when the component mounts
    const fetchVendors = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/vendors');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setSearchResults(data);
      } catch (error) {
        console.error('Error fetching vendors:', error);
      }
    };

    fetchVendors();
  }, []); // Empty dependency array ensures this effect runs once on mount

  const handleCancel = () => {
    onClose();
  };




  return (
    <Dialog open={true} onClose={handleCancel}>
      <DialogTitle>Vendor List</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper} style={{ marginTop: '16px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Vendor Name</TableCell>
                <TableCell>Street</TableCell>
                <TableCell>City</TableCell>
                {/* Add other columns as needed */}
              </TableRow>
            </TableHead>
            <TableBody>
              {searchResults.map((vendor) => (
                <TableRow key={vendor.vendorname}>
                  <TableCell>{vendor.vendorname}</TableCell>
                  <TableCell>{vendor.street}</TableCell>
                  <TableCell>{vendor.city}</TableCell>
                  {/* Add other cells based on your database schema */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Close</Button>
      </DialogActions>

    </Dialog>
  );
};

export default SearchVendorForm;
