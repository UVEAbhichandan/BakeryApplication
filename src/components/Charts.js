import axios from "axios";
import { useEffect, useState } from "react"
import Chart from "react-apexcharts";
import { dateFilters } from "../constants";

const Charts = (props) => {
  const [axisData, setAxisData] = useState([])
  const [dateFilter, setDateFilter] = useState(7)

  const getChartData = async (filterVal) => {
    try {
      const response = await axios.post('http://localhost:3000/api/chart', {type: props.type ? props.type : '', filter: filterVal});
      setAxisData(response.data);
    } catch (error) {
      console.error('Error creating order:', error.response ? error.response.data : error.message);
    }
  }
  useEffect(() => {
    getChartData();
    if(dateFilter !== 7) setDateFilter(7)
  }, [props.type])

  const handleFilter = (e) =>{
    const value = e.target.value;
    getChartData(value)
    setDateFilter(value)
  }
 
  return (
    <>
    <div className="form-group" id="dateContainer">
        <select
        id="dateFilter"
        name="itemType"
        value={dateFilter}
        onChange={handleFilter}
        required
      >
        <option value={1}>{dateFilters.day}</option>
        <option value={7}>{dateFilters.sevenDays}</option>
        <option value={30}>{dateFilters.month}</option>
      </select>
    </div>
    <div style={{padding: '50px', display: 'flex', justifyContent:'center'}}>    
      {axisData?.options?.xaxis?.categories?.length &&
        <Chart
          options={axisData.options}
          series={axisData.series}
          type="bar"
          width={500}
          height={320}
        />}
    </div>
    </>
  )
}
export default Charts;