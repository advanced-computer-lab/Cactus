import React, { useState, useEffect } from 'react'
import { Paper, ButtonGroup, Button, Grid, Typography, Divider, IconButton, Tooltip } from '@mui/material'
import WcIcon from '@mui/icons-material/Wc';
import RestoreIcon from '@mui/icons-material/Restore';
import CoffeeIcon from '@mui/icons-material/Coffee';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Box } from '@mui/system'

var businessSeats = [{ number: 1, reserved: true }, { number: 2, reserved: false }, { number: 3, reserved: false },
{ number: 4, reserved: false }, { number: 5, reserved: false }, { number: 6, reserved: false },
{ number: 7, reserved: false }, { number: 8, reserved: true }, { number: 9, reserved: true }]


const economySeats = [{ number: 1, reserved: false }, { number: 2, reserved: false }, { number: 3, reserved: false },
{ number: 4, reserved: false }, { number: 5, reserved: false }, { number: 6, reserved: false },
{ number: 7, reserved: false }, { number: 8, reserved: false }, { number: 9, reserved: false },
{ number: 10, reserved: false }, { number: 11, reserved: false }, { number: 12, reserved: false },
{ number: 13, reserved: false }, { number: 14, reserved: false }, { number: 15, reserved: false },
{ number: 16, reserved: false }, { number: 17, reserved: false }, { number: 18, reserved: false },
{ number: 19, reserved: false }, { number: 20, reserved: false }]

var recentlyReservedB = []
var recentlyReservedE = []

const cabin = "economy"

var economySpliced = []
var temp = []


export default function SeatSelector(props) {
  useEffect(() => {
    let temp1 = []
    let temp2 = []
    let temp3 = []
    for (let i = 0; i < economySeats.length; i += 10) {
      temp1 = []
      temp2 = []
      temp3 = []
      for (let j = i; j < i + 3; j++) {
        temp1.push(economySeats[j])
        console.log("temp1: ", temp1)
      }
      for (let k = i + 3; k < (i + 3) + 4; k++) {
        temp2.push(economySeats[k])
        console.log("temp2: ", temp2)
      }
      for (let l = i + 7; l < (i + 7) + 3; l++) {
        temp3.push(economySeats[l])
        console.log("temp3: ", temp3)
      }
      economySpliced.push(temp1)
      economySpliced.push(temp2)
      economySpliced.push(temp3)
    }
  }, [economySeats])
  const [business, setBusiness] = useState(businessSeats)
  const [economy, setEconomy] = useState(economySpliced)
  const [numberOfSeats, setNumberOfSeats] = useState(3);

  const handleSelected = (e, params) => {
    e.preventDefault()
    if (!(numberOfSeats === 0)) {
      setNumberOfSeats(numberOfSeats - 1);
      if (cabin === "business") {
        let seat = business.find((o, i) => {
          if (o.number === params) {
            business[i] = { number: params, reserved: true };
            recentlyReservedB.push(i)
            setBusiness(business)
            return true;
          }
        })
      }
      else {
        const flatArray = economySpliced.flat(1)
        let seat = flatArray.find((o, i) => {
          if (o.number === params) {
            flatArray[i] = { number: params, reserved: true };
            recentlyReservedE.push(i)
            return true;
          }
        })
        economySpliced = []
        let temp1 = []
        let temp2 = []
        let temp3 = []
        for (let i = 0; i < flatArray.length; i += 10) {
          temp1 = []
          temp2 = []
          temp3 = []
          for (let j = i; j < i + 3; j++) {
            temp1.push(flatArray[j])
            console.log("temp1: ", temp1)
          }
          for (let k = i + 3; k < (i + 3) + 4; k++) {
            temp2.push(flatArray[k])
            console.log("temp2: ", temp2)
          }
          for (let l = i + 7; l < (i + 7) + 3; l++) {
            temp3.push(flatArray[l])
            console.log("temp3: ", temp3)
          }
          economySpliced.push(temp1)
          economySpliced.push(temp2)
          economySpliced.push(temp3)
        }
        setEconomy(economySpliced)
      }
    }
  }
  const handleReset = (e) => {
    e.preventDefault()
    if (cabin === "business") {
      for (let index = 0; index < recentlyReservedB.length; index++) {
        business[recentlyReservedB[index]].reserved = false
        setBusiness(business)
      }
      console.log(business)
    }
    else {
      const flatArray = economySpliced.flat(1)
      for (let index = 0; index < recentlyReservedE.length; index++) {
        flatArray[recentlyReservedE[index]].reserved = false
      }
      economySpliced = []
      let temp1 = []
      let temp2 = []
      let temp3 = []
      for (let i = 0; i < flatArray.length; i += 10) {
        temp1 = []
        temp2 = []
        temp3 = []
        for (let j = i; j < i + 3; j++) {
          temp1.push(flatArray[j])
          console.log("temp1: ", temp1)
        }
        for (let k = i + 3; k < (i + 3) + 4; k++) {
          temp2.push(flatArray[k])
          console.log("temp2: ", temp2)
        }
        for (let l = i + 7; l < (i + 7) + 3; l++) {
          temp3.push(flatArray[l])
          console.log("temp3: ", temp3)
        }
        economySpliced.push(temp1)
        economySpliced.push(temp2)
        economySpliced.push(temp3)
      }
      setEconomy(economySpliced)
      console.log(economy)
    }
  }

  return (
    <div>
      <Paper elevation={3} variant="outlined" style={{ borderRadius: '1rem', marginTop: '50px', padding: '30px', width: '1000px' }}>
        <Box>
          <Grid container spacing={3}>
            
            <Grid item sm={12}>
              <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h4" color="secondary">Pick Your Seats</Typography>
              </Box>
              <br />
              <Divider varaint="middle" />
              <br />
            </Grid>
            <Grid item sm={10}></Grid>
            <Grid item sm={2}>
              <Tooltip title="Reset Seats">
                <IconButton color="error" onClick={handleReset} aria-label="reset">
                  <RestoreIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item sm={3}>
              <Button variant="contained" endIcon={<ExitToAppIcon />} fullWidth color="error">Exit</Button>
            </Grid>
            <Grid item sm={6}>
              <Box style={{ display: 'flex', marginLeft: '600px' }}>
                <IconButton variant="contained" fullWidth color="primary">
                  <CoffeeIcon />
                </IconButton>
                <IconButton variant="contained" fullWidth color="primary">
                  <WcIcon />
                </IconButton>
              </Box>
              <br />
              <Divider varaint="middle" />
              <br />
            </Grid>

            
            {cabin === 'economy' ?
              <>
                <Grid item sm={4}>
                  <Box style={{ display: 'flex' }}>
                    <Typography variant="h5" style={{ marginLeft: '25px', marginRight: '50px' }}>A</Typography>
                    <Typography variant="h5" style={{ marginRight: '50px' }}>B</Typography>
                    <Typography variant="h5">C</Typography>
                  </Box>
                </Grid>
                <Grid item sm={4}>
                  <Box style={{ display: 'flex' }}>
                    <Typography variant="h5" style={{ marginLeft: '25px', marginRight: '50px' }}>D</Typography>
                    <Typography variant="h5" style={{ marginRight: '50px' }}>E</Typography>
                    <Typography variant="h5" style={{ marginRight: '50px' }}>F</Typography>
                    <Typography variant="h5">G</Typography>
                  </Box>
                </Grid>
                <Grid item sm={4}>
                  <Box style={{ display: 'flex' }}>
                    <Typography variant="h5" style={{ marginLeft: '25px', marginRight: '50px' }}>H</Typography>
                    <Typography variant="h5" style={{ marginRight: '50px' }}>I</Typography>
                    <Typography variant="h5">J</Typography>
                  </Box>
                </Grid>
              </>
              :
              <></>
            }
            {cabin === "business" ? business.map((seat) =>
              <>
                <Grid item sm={4}>
                  <Button color="info" disabled={seat.reserved}
                    onClick={(e) => { handleSelected(e, seat.number) }} variant="contained" key={seat.number}
                  >{seat.number}</Button>
                </Grid>
              </>
            )
              :
              economy.map((seat) =>
                <>
                  <Grid item sm={4}>
                    {seat.map((eseat) =>
                      <Button color="info"
                        disabled={eseat.reserved}
                        onClick={(e) => { handleSelected(e, eseat.number) }}
                        variant="contained"
                        size="medium"
                        style={{ marginRight: '5px' }}
                      >
                        {eseat.number}
                      </Button>
                    )
                    }
                  </Grid>
                </>
              )
            }
            <Grid item sm={3}>
              <br />
              <Box style={{ marginLeft: '80px' }}>
                <IconButton variant="contained" fullWidth color="primary"><WcIcon /></IconButton>
              </Box>
            </Grid>
            <Grid item sm={6}></Grid>
            <Grid item sm={3}>
              <br />
              <Box>
                <IconButton variant="contained" fullWidth color="primary"><WcIcon /></IconButton>
              </Box>
            </Grid>
            <Grid item sm={3}>
              <Button variant="contained" endIcon={<ExitToAppIcon />} fullWidth color="error">Exit</Button>
            </Grid>
            <Grid item sm={9}></Grid>
            <Grid item sm={9}></Grid>
            <Grid item sm={3}>
              <Button color="success" variant="outlined" onClick={() => console.log("confirmed")}fullWidth size="large">Confirm</Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </div>
  )
}
