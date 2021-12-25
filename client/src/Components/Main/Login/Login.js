import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { CircularProgress } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import logo from '../../../logo4.png'
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../../Context/UserContext';
import { setAuthentication } from '../../../Authentication/Authentication';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Cactus Airlines
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default function SignInSide() {
  const [username, setUsername] = React.useState('');
  const [userPass, setPassword] = React.useState('');
  const [isFetching, setFetching] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const history = useHistory()
  const { setLoggedUser } = React.useContext(UserContext)



  const usernameChange = (e) => {
    setUsername(e.target.value)
  }
  const passwordChange = (e) => {
    setPassword(e.target.value)
  }

  const user = {
    "username": username,
    "password": userPass
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setFetching(true)
    axios.post('/Authentication/Login', user)
      .then((res) => {
        console.log("User: ",res)
        if(res.data === ""){
          setFetching(false)
          setOpen(true)
        }
        else
        {  if (res.data.user.isAdmin) {
            setFetching(false)
            setAuthentication(res.data.token, res.data.user)
            setLoggedUser({user: res.data.user, token: res.data.token})
            history.push("/adminHome")
          }
          else{
            setFetching(false)
            setAuthentication(res.data.token, res.data.user)
            setLoggedUser({user: res.data.user, token: res.data.token})
            history.push("/")
          }
        }
      })
      .catch((err) => {
        setOpen(true)
        console.log(err)
      })
  }


  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${logo})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: '100vh',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{ width: '100%' }}>
            <Collapse in={open}>
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
                variant="filled"
                severity="error"
              >
                Incorrect Username or Password
              </Alert>
            </Collapse>
          </Box>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              onChange={usernameChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={passwordChange}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="secondary"
            >
              {isFetching ? <CircularProgress color="primary" /> : "Login"}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/Register" variant="body2" color="secondary">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
