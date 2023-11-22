// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Navigate, useNavigate } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import Table from './components/Table';
import LoginForm from './components/LoginForm';
import InvClerk from './components/pages/ClerkRolePages/InventoryClerkPage';
import SalesRep from './components/pages/SalesRolePages/SalesRepPage';
import Owner from './components/pages/OwnerRolePage/OwnerPage';
import Manager from './components/pages/ManagerRolePage/ManagerPage';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import ViewInventoryComponent from './components/pages/ClerkRolePages/ViewInventoryPage';
import AddEditPartsComponent from './components/pages/ClerkRolePages/AddEditPartsPage';
import WelcomeScreen from './components/pages/WelcomePage';
import AddVehicleForm from './components/pages/ClerkRolePages/AddVehiclePage';
import AddVehiclePage from './components/pages/ClerkRolePages/AddVehiclePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DetailViewForm from './components/pages/SalesRolePages/DetailViewForm';
import NewVehicleScreen from './components/pages/NewAddVehicle';
import BlankClerkPage from './components/pages/ClerkRolePages/BlankClerkPage';
import BlankSalesPage from './components/pages/SalesRolePages/BlankSalesRepPage';
import BlankManagerPage from './components/pages/ManagerRolePage/BlankManagerPage';
import BlankOwnerPage from './components/pages/OwnerRolePage/BlankOwnerPage';

const App = () => {
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [authenticatedRole, setAuthenticatedRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  // Mock data for demonstration purposes, replace with actual API call or data fetching
  const mockData = [
    { id: 1, manufacturer: 'Toyota', vehicleType: 'Sedan', year: 2022, color: 'Blue' },
    { id: 2, manufacturer: 'Honda', vehicleType: 'SUV', year: 2021, color: 'Red' },
    // Add more mock data
  ];

  // Mock data for user roles
  const userRoles = [
    { username: 'inventoryclerk', password: 'password1', role: 'InventoryClerk' },
    { username: 'salesrep', password: 'password2', role: 'SalesRepresentative' },
    { username: 'manager', password: 'password3', role: 'Manager' },
    { username: 'owner', password: 'password4', role: 'Owner' },
  ];

  // Initialize table data on component mount

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
  
      setFilteredData(filtered);
    } catch (error) {
      console.error('Error fetching or filtering data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const navigate = useNavigate();

  const handleLogin = async (username, password) => {
    try {


      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (response.ok) {
        setAuthenticatedRole(data.role);
              // Redirect based on the role
              switch (data.role) {
                case 'InventoryClerk':
                  // Use the Navigate component from 'react-router-dom' to redirect to the desired route
                  navigate('/inventoryclerk');
                  break;
                case 'SalesRepresentative':
                  navigate('/salesrep');
                  break;
                case 'Manager':
                  navigate('/manager');
                  break;
                case 'Owner':
                  navigate('/owner');
                  break;
                default:
                  console.log('Unknown role:', data.role);
              }
        setIsLoginFormVisible(false);
      } else {
        console.log('Authentication failed:', data.message);
      }
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };
  

  //console.log(authenticatedRole);

  // const handleLogin = (username, password) => {
  //   const authenticatedUser = authenticateUser(username, password);

  //   if (authenticatedUser) {
  //     setAuthenticatedRole(authenticatedUser.role);
  //     setIsLoginFormVisible(false);
  //   } else {
  //     console.log('Authentication failed');
  //   }
  // };

  const handleLogout = () => {
    // Reset the authentication status
    setAuthenticatedRole(null);
    navigate("/");
  };;

  const authenticateUser = (enteredUsername, enteredPassword) => {
    // Find the user with the entered credentials
    const authenticatedUser = userRoles.find(
      (user) => user.username === enteredUsername && user.password === enteredPassword
    );

    return authenticatedUser;
  };

  useEffect(() => {
    // Fetch initial data from the server
    handleSearch({ searchText: '', modelType: '', modelYear: '' });
  }, []); // Empty dependency array ensures the effect runs once on mount

  const getUserRole = (username, password) => {
    // Placeholder logic to determine the user role based on username and password
    // Replace this with your actual authentication logic
    // For simplicity, we'll return a role based on the entered username
    if (username.toLowerCase() === 'inventoryclerk') {
      return 'InventoryClerk';
    } else if (username.toLowerCase() === 'salesrep') {
      return 'SalesRepresentative';
    } else if (username.toLowerCase() === 'manager') {
      return 'Manager';
    } 
    else if (username.toLowerCase() === 'owner') {
      return 'Owner';
    } 
    else {
      return null;
    }
  };

  const renderMainContent = () => {
    if (!authenticatedRole) {
      return <WelcomeScreen onSearch={handleSearch} tableData={filteredData} isLoading={isLoading} />;
    }
  
    switch (authenticatedRole) {
      case 'INV_CLERK':
        return <BlankClerkPage onLogout={handleLogout} />;
      case 'SALES_PERSON':
        return <BlankSalesPage onLogout={handleLogout} />;
      case 'MANAGER':
        return <BlankManagerPage onLogout={handleLogout} />;
      case 'OWNER':
        return <BlankOwnerPage onLogout={handleLogout} />;
      default:
        return null;
    }
  };

  return (

      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                Buzz Cars
              </Link>
            </Typography>
            {authenticatedRole ? (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button color="inherit" onClick={() => setIsLoginFormVisible(true)} style={{ backgroundColor: '#4CAF50' }}>
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
        {renderMainContent()}
        <Routes>
          <Route path="/" element={<Navigate to="/" />} />
          <Route path="/welcome" element={<WelcomeScreen onSearch={handleSearch} tableData={filteredData} />} />
          <Route path="/inventoryclerk" element={<InvClerk authenticatedRole={authenticatedRole} onLogout={handleLogout} />} />
          <Route path="/salesrep" element={<SalesRep authenticatedRole={authenticatedRole} onLogout={handleLogout} />} />
          <Route path="/manager" element={<Manager authenticatedRole={authenticatedRole} onLogout={handleLogout} />} />
          <Route path="/owner" element={<Owner authenticatedRole={authenticatedRole} onLogout={handleLogout} />} />
          
          <Route path="/add-edit-parts" element={<AddEditPartsComponent onLogout={handleLogout} />} />
          <Route path="/addvehicle1" element={<AddVehicleForm />} />
          <Route path="/newVehicleScreen" element={<NewVehicleScreen />} />
        </Routes>
        <LoginForm
          open={isLoginFormVisible}
          onClose={() => setIsLoginFormVisible(false)}
          onLogin={handleLogin}
        />
         <ToastContainer />
      </div>

  );
};

export default App;
