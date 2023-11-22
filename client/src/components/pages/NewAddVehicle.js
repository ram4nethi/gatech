import React from "react";
import { Button, Typography } from "@mui/material";
import {DialogActions} from "@mui/material";
const NewVehicleScreen = () => {
    return (
      <div>
    <DialogActions sx={{ marginY: 2 }}>
      <Button variant="contained">
        View Inventory
      </Button>

      </DialogActions>
      </div>
    );
  };

  export default NewVehicleScreen;