import React from 'react'
import BookFlight from './BookFlight'
import UserNavBar from '../../Components/User/UserNavBar'
import back from '../plane.png'


function UserHome() {
    return (
        <div>
            <UserNavBar />
            {/* <img src={back} alt="background" width="100%" height="700px" style={{zIndex: '-5'}}/> */}
            <BookFlight />
        </div>
    )
}

export default UserHome
