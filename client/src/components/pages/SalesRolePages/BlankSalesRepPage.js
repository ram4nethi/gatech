import React from "react";
import { Typography } from "@mui/material";
import {DialogActions, Button} from "@mui/material";
import SalesRep from "./SalesRepPage";
const BlankSalesPage = () => {
    return (
      <div>
    <DialogActions sx={{ marginY: 2 }}>
        <SalesRep/>

      </DialogActions>
      </div>
    );
  };

  export default BlankSalesPage;