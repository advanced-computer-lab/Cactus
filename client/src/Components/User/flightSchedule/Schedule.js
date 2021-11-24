import React from 'react'
import { ViewState } from '@devexpress/dx-react-scheduler';
import { Paper } from '@mui/material';
import { Scheduler, DayView, Appointments } from '@devexpress/dx-react-scheduler-material-ui';


export default function Schedule() {

    const currentDate = Date.now();
    const schedulerData = [
        { startDate: '2021-11-24T09:45', endDate: '2021-11-24T11:00', title: 'CAI TO LAX' },
        { startDate: '2021-11-24T12:00', endDate: '2021-11-24T13:30', title: 'LAX TO GB' },
    ];
    return (
        <div>
            <Paper style={{ borderRadius: '20px'}}>
                <Scheduler
                    data={schedulerData}
                >
                    <ViewState
                        currentDate={currentDate}
                    />
                    <DayView
                        startDayHour={9}
                        endDayHour={14}
                    />
                    <Appointments />
                </Scheduler>
            </Paper>
        </div>
    )
}
