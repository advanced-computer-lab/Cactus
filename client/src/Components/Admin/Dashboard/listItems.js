import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import FlightIcon from '@mui/icons-material/Flight';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Link from '@mui/material/Link';
import { Divider } from '@mui/material';


export const mainListItems = (
  <div>
    <Link color="inherit" href="#" style={{ textDecoration: 'none' }}>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    </Link>
    <Divider />
    {/* All Flights */}
    <Link color="inherit" href="/FindFlight" style={{ textDecoration: 'none' }}>
    <ListItem button>
      <ListItemIcon>
        <FlightIcon />
      </ListItemIcon>
      <ListItemText primary="All Flights" />
    </ListItem>
    </Link>
    {/* Add Flights */}
    <Link color="inherit" href="/AddFlight" style={{ textDecoration: 'none' }}>
    <ListItem button>
      <ListItemIcon>
        <FlightLandIcon />
      </ListItemIcon>
      <ListItemText primary="Add Flights" />
    </ListItem>
    </Link>
    <Divider />
    {/* All Users */}
    {/* <Link color="inherit" href="/FindFlight" style={{ textDecoration: 'none' }}> */}
    <ListItem button disabled>
      <ListItemIcon>
        <PeopleAltIcon />
      </ListItemIcon>
      <ListItemText primary="All Users" />
    </ListItem>
    {/* </Link> */}
    {/* other func */}
    {/* <Link color="inherit" href="/AddFlight" style={{ textDecoration: 'none' }}> */}
    <ListItem button disabled>
      <ListItemIcon>
        <AdminPanelSettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Other User Function" />
    </ListItem>
    {/* </Link> */}
  </div>
);

