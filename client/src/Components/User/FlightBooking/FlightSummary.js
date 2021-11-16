import { Timeline, TimelineItem, TimelineOppositeContent, TimelineSeparator, TimelineDot, TimelineContent, TimelineConnector } from '@mui/lab'
import { Button, Grid, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import StripeContainer from '../StripeContainer'
import React from 'react'

export default function FlightSummary(props) {
    const [showCheckout, setShowCheckout] = React.useState(false)
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <Paper elevation={2} square style={{ borderRadius: '1rem', marginTop: '30px', padding: '30px' }}>
                        <Box style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center',
                            justifyContent: 'center', marginBottom: '30px'
                        }}>
                            <Typography variant="h4" component="h4" color="primary">Your trip summary</Typography>
                        </Box>
                        <Grid container spacing={2}>
                            <Grid item sx={8}>
                                <Typography variant="h6" component="h6" color="primary">Cairo to Los Angeles</Typography>
                                <Timeline position="left" style={{ marginLeft: '-200px' }}>
                                    <TimelineItem>
                                        <TimelineOppositeContent color="text.secondary" width="500px">
                                            Wed, 10 Nov 2021 - 02:00 CAI<br />
                                            Cairo, Cairo International Airport<br />
                                            Egypt
                                        </TimelineOppositeContent>
                                        <TimelineSeparator>
                                            <TimelineDot />
                                            <TimelineConnector />
                                        </TimelineSeparator>
                                        <TimelineContent>Departure</TimelineContent>
                                    </TimelineItem>
                                    <TimelineItem>
                                        <TimelineOppositeContent color="text.secondary" width="500px">
                                            Wed, 10 Nov 2021 - 16:00 LAX<br />
                                            Los Angeles, Los Angeles Airport<br />
                                            United States
                                        </TimelineOppositeContent>
                                        <TimelineSeparator>
                                            <TimelineDot />
                                            <TimelineConnector />
                                        </TimelineSeparator>
                                        <TimelineContent>Arrival</TimelineContent>
                                    </TimelineItem>
                                </Timeline>
                            </Grid>
                            <Grid item sx={4}>
                                <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <Typography variant="h6" component="h6" color="primary">9,000 EGP</Typography>
                                    <Button variant="outlined">Change this flight</Button>
                                </Box>
                            </Grid>
                            <Grid item sx={8}>
                                <Typography variant="h6" component="h6" color="primary">Los Angeles to Cairo</Typography>
                                <Timeline position="left" style={{ marginLeft: '-200px' }}>
                                    <TimelineItem>
                                        <TimelineOppositeContent color="text.secondary" width="500px">
                                            Wed, 17 Nov 2021 - 02:00 LAX<br />
                                            Los Angeles, Los Angeles Airport<br />
                                            United Stated
                                        </TimelineOppositeContent>
                                        <TimelineSeparator>
                                            <TimelineDot />
                                            <TimelineConnector />
                                        </TimelineSeparator>
                                        <TimelineContent>Departure</TimelineContent>
                                    </TimelineItem>
                                    <TimelineItem>
                                        <TimelineOppositeContent color="text.secondary" width="500px">
                                            Wed, 17 Nov 2021 - 16:00 CAI <br />
                                            Cairo, Cairo International Airport <br />
                                            Egypt
                                        </TimelineOppositeContent>
                                        <TimelineSeparator>
                                            <TimelineDot />
                                            <TimelineConnector />
                                        </TimelineSeparator>
                                        <TimelineContent>Arrival</TimelineContent>
                                    </TimelineItem>
                                </Timeline>
                            </Grid>
                            <Grid item sx={4}>
                                <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <Typography variant="h6" component="h6" color="primary">9,000 EGP</Typography>
                                    <Button variant="outlined">Change this flight</Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper elevation={2} square style={{ borderRadius: '1rem', marginTop: '30px', padding: '30px' }}>
                        <Box style={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h6" component="h6">Total Price: 18,000 EGP</Typography>
                            <Button variant="contained" color="secondary"
                                onClick={() => setShowCheckout(true)}
                            >Checkout</Button>
                            <br />
                            {showCheckout ? <StripeContainer /> : <></>}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}
