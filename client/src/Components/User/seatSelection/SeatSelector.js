import React from 'react'
import { Paper, ButtonGroup, Button, Grid, Typography, Divider, IconButton } from '@mui/material'
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import AirlineSeatReclineNormalRoundedIcon from '@mui/icons-material/AirlineSeatReclineNormalRounded';
import { Box } from '@mui/system'

export default function SeatSelector() {
  
  const buttons = [
    <IconButton key="one" color="success"><AirlineSeatReclineNormalRoundedIcon />1</IconButton>,
    <IconButton key="two" color="secondary"><AirlineSeatReclineNormalRoundedIcon />2</IconButton>,
    <IconButton key="three" color="secondary"><AirlineSeatReclineNormalRoundedIcon />3</IconButton>
  ];
  const buttons1 = [
    <Button key="one" variant="contained" color="success">4</Button>,
    <Button key="two" variant="contained" color="success">5</Button>,
    <Button key="three" variant="contained" color="secondary">6</Button>,
    <Button key="three" variant="contained" color="secondary">7</Button>,
  ];
  const buttons2 = [
    <Button key="one" variant="contained" color="secondary" disabled>8</Button>,
    <Button key="two" variant="contained" color="secondary" disabled>9</Button>,
    <Button key="three" variant="contained" color="secondary" disabled>10</Button>,
  ];
  return (
    <div>
      <Paper elevation={3} variant="outlined" style={{ borderRadius: '1rem', marginTop: '50px', padding: '30px', width: '1000px' }}>
        <Box>
          <Grid container spacing={5}>
            <Grid item sm={12}>
              <Typography variant="h4" color="secondary">Pick Your Seats</Typography>
            </Grid>
            <Grid item sm={2}>
            <Typography variant="h4">A</Typography>
            </Grid>
            <Grid item sm={3}>
              <IconButton color="info">
                <AirlineSeatReclineExtraIcon />1
              </IconButton>
            </Grid>
            <Grid item sm={4}>
            <IconButton color="info">
                <AirlineSeatReclineExtraIcon />2
              </IconButton>
            </Grid>
            <Grid item sm={3}>
            <IconButton color="info">
                <AirlineSeatReclineExtraIcon />3
              </IconButton>
            </Grid>
            <Grid item sm={2}>
            <Typography variant="h4">B</Typography>
            </Grid>
            <Grid item sm={3}>
              <Button variant="contained" color="info">1</Button>
            </Grid>
            <Grid item sm={4}>
              <Button variant="contained" color="info">2</Button>
            </Grid>
            <Grid item sm={3}>
              <Button variant="contained" color="info">3</Button>
            </Grid>
            <Grid item sm={2}>
            <Typography variant="h4">C</Typography>
            </Grid>
            <Grid item sm={3}>
              <Button variant="contained" color="info">1</Button>
            </Grid>
            <Grid item sm={4}>
              <Button variant="contained" color="info">2</Button>
            </Grid>
            <Grid item sm={3}>
              <Button variant="contained" color="info">3</Button>
            </Grid>
          </Grid>
          <br />
          <Divider />
          <br />
          <Grid container spacing={5}>
            <Grid item sm={2}>
              <Typography variant="h4" component="h4">D</Typography>
            </Grid>
            <Grid item sm={3}>
              <ButtonGroup size="large" aria-label="large button group">
                {buttons}
              </ButtonGroup>
            </Grid>
            <Grid item sm={4}>
              <ButtonGroup size="large" aria-label="large button group">
                {buttons1}
              </ButtonGroup>
            </Grid>
            <Grid item sm={3}>
              <ButtonGroup size="large" aria-label="large button group">
                {buttons2}
              </ButtonGroup>
            </Grid>
            <Grid item sm={2}>
              <Typography variant="h4" component="h4">E</Typography>
            </Grid>
            <Grid item sm={3}>
              <ButtonGroup size="large" aria-label="large button group">
                {buttons}
              </ButtonGroup>
            </Grid>
            <Grid item sm={4}>
              <ButtonGroup size="large" aria-label="large button group">
                {buttons1}
              </ButtonGroup>
            </Grid>
            <Grid item sm={3}>
              <ButtonGroup size="large" aria-label="large button group">
                {buttons2}
              </ButtonGroup>
            </Grid>
            <Grid item sm={2}>
              <Typography variant="h4" component="h4">F</Typography>
            </Grid>
            <Grid item sm={3}>
              <ButtonGroup size="large" aria-label="large button group">
                {buttons}
              </ButtonGroup>
            </Grid>
            <Grid item sm={4}>
              <ButtonGroup size="large" aria-label="large button group">
                {buttons1}
              </ButtonGroup>
            </Grid>
            <Grid item sm={3}>
              <ButtonGroup size="large" aria-label="large button group">
                {buttons2}
              </ButtonGroup>
            </Grid>
            <Grid item sm={2}>
              <Typography variant="h4" component="h4">G</Typography>
            </Grid>
            <Grid item sm={3}>
              <ButtonGroup size="large" aria-label="large button group">
                {buttons}
              </ButtonGroup>
            </Grid>
            <Grid item sm={4}>
              <ButtonGroup size="large" aria-label="large button group">
                {buttons1}
              </ButtonGroup>
            </Grid>
            <Grid item sm={3}>
              <ButtonGroup size="large" aria-label="large button group">
                {buttons2}
              </ButtonGroup>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </div>
  )
}
