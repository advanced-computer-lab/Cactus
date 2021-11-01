import React from 'react'
import axios from 'axios'
import useAxios from 'axios-hooks'

export function GetFlight(){
    const [{data, loading, error, response}, refetch] = useAxios({
        method: 'GET',
        url: 'http://localhost:3000/findFlight',
    });

    if(loading) return <p>Loading...</p>
    if(error) return <p>Couldn't fetch data! :(</p>
    
    const stringifiedData = JSON.stringify(data, null, 2);
   
    return (
        <div>
            <button onClick={refetch}>Refresh</button>
            <pre>{(stringifiedData)}</pre>
        </div>
    )
}


export default GetFlight
