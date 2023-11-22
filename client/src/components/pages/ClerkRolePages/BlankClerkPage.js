import React from "react";
import { Typography } from "@mui/material";
import {DialogActions, Button} from "@mui/material";
import InventoryClerkPage from "./InventoryClerkPage";
import ViewInventory from "./ViewInventoryPage";

import { Route, useNavigate } from "react-router-dom";
const BlankClerkPage = () => {

    return (
      <div>
       <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        <ViewInventory />
        <InventoryClerkPage />
        </div>
      </div>
    );
  };

  export default BlankClerkPage;