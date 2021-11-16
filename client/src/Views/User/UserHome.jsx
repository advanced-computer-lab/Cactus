import React from 'react'
import BookFlight from './BookFlight'
import UserNavBar from '../../Components/User/UserNavBar'
import FlightBooking from '../../Views/User/FlightBooking/FlightBooking'

function UserHome() {
    return (
        <div>
            <UserNavBar />
            {/* <BookFlight /> */}
            <FlightBooking />
        </div>
    )
}

export default UserHome
