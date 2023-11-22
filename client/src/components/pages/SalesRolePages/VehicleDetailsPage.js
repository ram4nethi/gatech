import React, { useState } from 'react';
import SearchBar from '../../SearchBar';
import Table from '../../Table';
import { useNavigate } from 'react-router-dom';
import DetailViewForm from '../DetailViewForm';

const VehicleDetails = ({ onSearch, tableData, isLoading }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  const handleViewClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseDetailView = () => {
    setSelectedItem(null);
  };

  console.log(selectedItem);

  return (
    <div>
      <SearchBar onSearch={onSearch} />
      {isLoading ? (  
        <p>Loading...</p>
      ) : (
        <>
          {selectedItem ? (
            <DetailViewForm selectedItem={selectedItem} onClose={handleCloseDetailView} />
          ) : (
            <Table data={tableData} onViewClick={handleViewClick} />
          )}
        </>
      )}
    </div>
  );
};

export default VehicleDetails;
