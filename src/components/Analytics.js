import { useState } from "react";
import Header from "./Header";
import Charts from "./Charts";
import { filterTypes } from "../constants";

const Analytics = () =>{
    const [filterType, setFilterType] = useState('')

    return(
        <>
        <Header />
        <div style={{marginTop: '50px'}}>
          <ul style={{display: 'flex', justifyContent: 'space-evenly', backgroundColor: 'black', color: 'white'}}>
           {Object.keys(filterTypes).map((filter)=>{
            return(
                <li onClick={()=> setFilterType(filterTypes[filter])} style={{padding: '10px', cursor: 'pointer'}}>
                {filterTypes[filter]}
              </li>
            )
           })
             }
          </ul>
        </div>
        <Charts type={filterType} />
        </>
    )
}

export default Analytics;