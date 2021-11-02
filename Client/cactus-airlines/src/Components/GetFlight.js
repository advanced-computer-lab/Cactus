import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid';

export function GetFlight(){
    const [flights,SetFlights] = useState([]);
    const [columns,setColumns] = useState([]);
    useEffect(()=>{
        const fetchFlights = async () =>{
            const response = await axios.get("/flight/findFlight")
            SetFlights(response.data)
            setColumns(response.data.keys());
        };
        fetchFlights();
    },[])
    return (
        <div>
            <pre>{JSON.stringify(flights, null, 2)}</pre>
           {/* <DataGrid 
            rows={flights}
            getRowId={(row)=> row._id}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
           /> */}
        </div>
    )
}


export default GetFlight
