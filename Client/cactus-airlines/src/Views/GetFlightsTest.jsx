import React from 'react'
import axios from 'axios'
import { useState } from 'react'


const GetFlightsTest = () => {
   const [search, setSearch] = useState("")
   async function postSearch(e){
       e.preventDefault()
       try {
           await axios.post('http://localhost:3000/findFlight',{
               search 
           })
           
       } catch (error) {
           console.log(error.message)
       }
   }
    return (
        <div>
            <form onSubmit= {postSearch}>
                <input type= "text" value= {search} onChange= {(e) => setSearch(e.target.value)}></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}


export default GetFlightsTest