import React, { useState } from "react";
import { Typography, Tab, Tabs, Box } from "@mui/material";
import { DialogActions, Button } from "@mui/material";
import SearchCustomerForm from "./SearchCustomerForm";
import AddCustomerForm from "./AddCustomerForm";
import NewVehicleForm from "../NewVehicleForm";

const AddVehicleForm = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <div>
      <Tabs value={currentTab} onChange={handleTabChange} centered>
        <Tab label="Search Customer" />
        <Tab label="Add Customer" />
        <Tab label="New Vehicle" />
      </Tabs>

      <DialogActions sx={{ marginY: 3 }}>
        {/* Render the selected form */}
        <Box hidden={currentTab !== 0}>
          <SearchCustomerForm />
        </Box>
        <Box hidden={currentTab !== 1}>
          <AddCustomerForm />
        </Box>
        <Box hidden={currentTab !== 2}>
          <NewVehicleForm />
        </Box>
      </DialogActions>
    </div>
  );
};

export default AddVehicleForm;
