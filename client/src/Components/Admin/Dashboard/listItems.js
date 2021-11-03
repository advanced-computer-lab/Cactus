import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import FlightIcon from '@mui/icons-material/Flight';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Link from '@mui/material/Link';

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
  </div>
);

