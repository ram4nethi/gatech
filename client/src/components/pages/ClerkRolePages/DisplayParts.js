import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const DisplayPartsComponent = () => {
  const [parts, setParts] = useState([]);

  useEffect(() => {
    const fetchParts = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/display-parts');
        const data = await response.json();
        setParts(data);
      } catch (error) {
        console.error('Error fetching parts:', error);
      }
    };

    fetchParts();
  }, []);

  return (
    <div>
      <h2>Displayed Parts</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Part Number</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Vendor</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {parts.map((part) => (
              <TableRow key={`${part.vin}-${part.partordernumber}-${part.partnumber}`}>
                <TableCell>{part.partnumber}</TableCell>
                <TableCell>{part.description}</TableCell>
                <TableCell>{part.vendorname}</TableCell>
                <TableCell>{part.cost}</TableCell>
                <TableCell>{part.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DisplayPartsComponent;
