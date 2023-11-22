import React from "react";
import { Typography } from "@mui/material";
import {DialogActions, Button} from "@mui/material";
import Manager from "./ManagerPage";
const BlankManagerPage = () => {
    return (
      <div>
    <DialogActions sx={{ marginY: 2 }}>
      <Manager />
      </DialogActions>
      </div>
    );
  };

  export default BlankManagerPage;