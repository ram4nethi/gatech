  // WelcomeScreen.js
  import React from 'react';
  import SearchBar from '../SearchBar';
  import Table from '../Table';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const navigate = useNavigate();


const handleViewInvClick=()=>{
    navigate("/welcome")
}

  const MainMenu = () => {
    return (
      <div>
        <Button onClick={handleViewInvClick}>
            View Inventory
        </Button>
        <Button>
            Login
        </Button>
      </div>
    );
  };

  export default MainMenu;
