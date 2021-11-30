import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ViewState } from '@devexpress/dx-react-scheduler';
import { Paper } from '@mui/material';
import { Scheduler, MonthView , AppointmentTooltip ,Appointments} from '@devexpress/dx-react-scheduler-material-ui';


export default function Schedule() {
    const currentDate = Date.now();
    const [schedulerData, setSchedulerData] = useState([])
    // const { loggedUser } = useContext(UserContext)
    useEffect(() => {
        // if (!(loggedUser === null)) {
            const fetchReservations = async () => {
                axios.post('/Users/getAllReservations', { username: "Seif25" })
                    .then((res) => {
                        setSchedulerData(res.data)
                    })
                    .catch((error) => { console.log(error.message) })
            };
            fetchReservations();
        // }
    }, [schedulerData])
    // const schedulerData = [
    //     { startDate: '2021-11-24T09:45', endDate: '2021-11-24T11:00', title: 'CAI TO LAX', id:0 },
    //     { startDate: '2021-11-24T12:00', endDate: '2021-11-24T13:30', title: 'LAX TO GB', id:1 },
    // ];
    return (
        <div>
            <Paper style={{ borderRadius: '20px'}}>
                <Scheduler
                    data={schedulerData}
                >
                    <ViewState
                        currentDate="2010-24-05"
                        defaultCurrentViewName="Month"
                    />
                    <MonthView
                        startDayHour={9}
                        endDayHour={14}
                    />
                    
                    <Appointments />
                    <AppointmentTooltip 
                        showCloseButton = "true"
                        
                    />
                </Scheduler>
            </Paper>
        </div>
    )
}
