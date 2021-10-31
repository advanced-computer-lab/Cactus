import React,{Component} from 'react';
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import { Container, dividerClasses } from '@mui/material';
import { Box } from '@mui/system';
import  TextField  from '@mui/material/TextField';
import  Button from '@mui/material/Button'; 

import AppBar from '@mui/material/AppBar';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';


 class LoginForm extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
          <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              
              <Typography variant="h6" component="div" align="left" sx={{ flexGrow: 1 }}>
                LogoHere
              </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
        </Box>
          );
       
    }


 }
 export default LoginForm;