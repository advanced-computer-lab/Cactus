import { React, useState} from 'react'
import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, Divider, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material'
import Search from './Logic/Search'

export default function PassengerCabin() {
    const [counter, setCounter] = useState(1);
    const [counterChild, setCounterChild] = useState(0);
    const [open, setOpen] = useState(false);
    const { setCabin, cabin, setSeats } = Search()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleIncrementChild = () => {
        setCounterChild(counterChild + 1)
    };

    const handleDecrementChild = () => {
        if (counterChild !== 0) {
            setCounterChild(counterChild - 1)
        }
        else {
            setCounterChild(1)
        }
    }

    const handleIncrement = () => {
        setCounter(counter + 1)
    };

    const handleDecrement = () => {
        if (counter !== 1) {
            setCounter(counter - 1)
        }
        else {
            setCounter(1)
        }
    };
    const handleConfirm = () => {
        setOpen(false);
        setSeats(counter + counterChild)
    };
    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen} className="button">
                Passenger/Cabin
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <Typography component="legend">Passengers</Typography>
                    <br />
                    <Grid container spacing={2}>
                        <Grid item sx={2}>
                            <Typography variant="h6" component="h6">Adults (12+ years)</Typography>
                        </Grid>
                        <Grid item sx={6}>
                            <ButtonGroup size="small" aria-label="small outlined button group" style={{ marginLeft: '13px' }}>
                                <Button onClick={handleDecrement}>-</Button>
                                <Button >{counter}</Button>
                                <Button onClick={handleIncrement}>+</Button>

                            </ButtonGroup>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item sx={2}>
                            <Typography variant="h6" component="h6">Child (2-11 years)</Typography>
                        </Grid>
                        <Grid item sx={6}>
                            <ButtonGroup size="small" aria-label="small outlined button group" style={{ marginLeft: '20px' }}>
                                <Button onClick={handleDecrementChild}>-</Button>
                                <Button >{counterChild}</Button>
                                <Button onClick={handleIncrementChild}>+</Button>

                            </ButtonGroup>
                        </Grid>
                    </Grid>
                    <br />
                    <Divider variant="middle" />
                    <br />
                    <FormControl component="fieldset">
                        <Typography component="legend">Cabin</Typography>
                        <br />
                        <RadioGroup
                            aria-label="economy"
                            defaultValue='economy'
                            value={cabin}
                            name="radio-buttons-group"
                            onChange={(e) => setCabin(e.target.value)}
                        >
                            <FormControlLabel value="economy" control={<Radio />} label="Economy" />
                            <FormControlLabel value="business" control={<Radio />} label="Business" />
                        </RadioGroup>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirm} color="success">Confirm</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
