import React from 'react'
import BookFlight from './BookFlight'
import UserNavBar from '../../Components/User/UserNavBar'

function UserHome() {
    return (
        <div>
            <UserNavBar />
            <BookFlight />
        </div>
    )
}

export default UserHome
