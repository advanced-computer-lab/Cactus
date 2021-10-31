import React,{Component} from 'react';
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import { Container, dividerClasses } from '@mui/material';
import { Box } from '@mui/system';
import  TextField  from '@mui/material/TextField';
import  Button from '@mui/material/Button'; 
 class EditFlightForm extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
        <Container>
            <h1>Edit Flight Info</h1>
            <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '50%' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-multiline-flexible"
          label="Flight Number"
          //Can Added Pre added value with Value Attribute
          fullWidth
         placeholder="Flight Number"
       
        />
        <TextField
          id="outlined-textarea"
          label="Departure Time"
          fullWidth
          placeholder="Departure Time"
          type="time"
          
        />
        <TextField
          id="outlined-textarea"
          label="Departure Date"
          fullWidth
          type="date"
        />
        <TextField
          id="outlined-textarea"
          label="Arrival Time"
          fullWidth
          placeholder="Arrival Time"
          type="time"
          
        />

        <TextField
          id="outlined-textarea"
          label="Arrival Date"
          fullWidth
          type="date"
        />
        <TextField
          id="outlined-textarea"
          label="Number Of Economy Seats"
          fullWidth
          placeholder="Number Of Economy Seats"
          
        />
        <TextField
          id="outlined-textarea"
          label="Number Of Business Seats"
          fullWidth
          placeholder="Number Of Business Seats"
            
        />
        <TextField
          id="outlined-textarea"
          label="Airport"
          fullWidth
          placeholder="Airport"
          
        />
        
      </div>
      
      <Button variant="contained" color="primary">Save Changes</Button>
      
    </Box>
        </Container>
        );
    }


 }
 export default EditFlightForm;