import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import AdminNavBar from '../../../Components/Admin/AdminNavBar'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useHistory } from 'react-router';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function FindFlight() {
  const [flights, SetFlights] = useState([]);
  const [openWarning, setOpenWarning] = useState(false)
  const [open, setOpen] = React.useState(false);
  const [id, setId] = useState([])
  const history = useHistory()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
      axios.delete('Flight/deleteFlight/'+id)
      .then(()=> { 
        })
      .catch((err) => console.log(err))
      setOpen(false);
  };
  useEffect(()=>{
    const fetchFlights = async () =>{
        const response = await axios.get("/Flight/findFlight")
        if(response.data !== [])
        SetFlights(response.data)
    };
    fetchFlights();
  },[flights])

  const getFlight = (id) => {
    for(var i=0;i<flights.length;i++){
      if(flights[i].id === id)
        return flights[i]
    }
  }
  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'flightNumber', headerName: 'Flight #', width: 80 },
    { field: 'departureTime', headerName: 'Departure Time', width: 130 },
    { field: 'departureDate', headerName: 'Departure Date', width: 130 },
    { field: 'arrivalTime', headerName: 'Arrival Time', width: 120 },
    { field: 'arrivalDate', headerName: 'Arrival Date', width: 100 },
    { field: 'economySeats', headerName: 'Economy Seats #', width: 140 },
    { field: 'businessSeats', headerName: 'Business Seats #', width: 140 },
    { field: 'departureAirport', headerName: 'From', width: 70 },
    { field: 'destinationAirport', headerName: 'To', width: 70 },
    {
      field: 'Edit', headerName: 'Edit', sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking

          // const api: GridApi = params.api;
          // const thisRow: Record<string, GridCellValue> = {};
          const api = params.api;
          const thisRow = {};
          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );
            const flight = getFlight(thisRow.id)
            if(flight.availableEconomy === flight.economySeats && flight.availableBusiness === flight.businessSeats){
              history.push({
                pathname: "/EditFlight",
                search: '?query=abc',
                state: {detail:  flight}
              })
          }
          else{
            setOpenWarning(true)
          }
          console.log(thisRow.id);
        };
        return <Button color="secondary" variant="contained" onClick={onClick}>Edit</Button>;
      }
    }, {
      field: 'Delete', headerName: 'Delete', sortable: false,
      renderCell: (params) => {

        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          // const api: GridApi = params.api;
          // const thisRow: Record<string, GridCellValue> = {};
          const api = params.api;
          const thisRow = {};
          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );
            setId(thisRow.id); 
            const flight = getFlight(thisRow.id)
            if(flight.availableEconomy === flight.economySeats && flight.availableBusiness === flight.businessSeats){
              handleClickOpen();    
            }
            else
              setOpenWarning(true)
          console.log(thisRow.id);
        };
        return <Button color="error" variant="contained" onClick={onClick}>Delete</Button>;
      }
    },
  ];

  var rowsvalue = flights;


  return (
    <div>
      <AdminNavBar />
      <DataGrid
        rows={rowsvalue}
        columns={columns}
        components={{
          Toolbar: GridToolbar,
        }}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleDelete}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Delete Flight?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Are you sure you want to delete this flight?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleDelete} color="error">Delete</Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openWarning}
          TransitionComponent={Transition}
          keepMounted
          onClose={()=>{
            setOpenWarning(false)
          }}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Flight is Reserved"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              This Flight is reserved so you are not allowed to Edit/Delete it.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>{
              setOpenWarning(false)
            }}>OK</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}

export default FindFlight
