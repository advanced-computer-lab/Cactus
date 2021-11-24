import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { ButtonGroup, Divider, Grid, Typography } from '@mui/material';

export default function FormDialog() {
    const [open, setOpen] = React.useState(false);
    const [counter, setCounter] = React.useState(1);

    const [counterChild, setCounterChild] = React.useState(1);

    const handleIncrementChild = () => {
        setCounterChild(counterChild + 1)
    };

    const handleDecrementChild = () => {
        if (counterChild !== 1) {
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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
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
                                <Button onClick={handleIncrement}>+</Button>
                                <Button >{counter}</Button>
                                <Button onClick={handleDecrement}>-</Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item sx={2}>
                            <Typography variant="h6" component="h6">Child (2-11 years)</Typography>
                        </Grid>
                        <Grid item sx={6}>
                            <ButtonGroup size="small" aria-label="small outlined button group" style={{ marginLeft: '20px' }}>
                                <Button onClick={handleIncrementChild}>+</Button>
                                <Button >{counterChild}</Button>
                                <Button onClick={handleDecrementChild}>-</Button>
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
                            defaultValue="economy"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="economy" control={<Radio />} label="Economy" />
                            <FormControlLabel value="business" control={<Radio />} label="Business" />
                        </RadioGroup>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
