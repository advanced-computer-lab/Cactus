import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid'

const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'flightNumber', headerName: 'Flight Number', width: 200 }
];

export function FetchFlights(){
    const [flight, setFlight] = useState([])
    
    useEffect(() => {
        
        axios.get('http://localhost:3000/findFlight')
        .then((result)=>{
            setFlight(result)
            console.log(result.data)
        })
        .catch((error) =>{
            console.log(error)
        })
        
        
    })

    return (
        <div>
            {/* <DataGrid 
                rows={[{'id':'000','flightNumber':'D20'}]}
                columns={columns}
                pageSize={6}
                checkboxSelection
            /> */}
            {flight.map(flight => <p>{flight._id}</p>)}
            
        </div>
    )
}

export default FetchFlights