import React, {useState, useEffect} from "react";

function Flavonoids(props) { // Common component to render the table for any kind of data

    let [data, setData] = useState([]);
    let [means, setMeans] = useState([]);
    let [medians, setMedians] = useState([]);
    let [modes, setModes] = useState([]);

    useEffect(() => {
      setData(props.tableData);
      let means = [], medians = [], modes = [];
      for(let i = 0 ; i<props.tableData.length; i++) {
        means.push(props.getMean(props.tableData[i]))
        medians.push(props.getMedian(props.tableData[i]))
        modes.push(props.getMode(props.tableData[i]))
      }
      setMeans(means);
      setMedians(medians);
      setModes(modes);
    },[props])

    return data && data.length> 0 ?
      (<table className='container'>
       <tr>
        <th>Measure</th>
        {data.map((e, index) => <th key={`head${index}`}>{`Class ${index+1}`}</th>)}
       </tr>
       <tr>
         <th>{`${props.type} Mean`}</th>
         {means.length> 0 ? means.map((e, index) => <td key={`mean${index}`}>{e}</td>) : null}
       </tr>
       <tr>
         <th>{`${props.type} Median`}</th>
         {medians.length> 0 ? medians.map((e, index) => <td key={`median${index}`}>{e}</td>) : null}
       </tr>
       <tr>
         <th>{`${props.type} Mode`}</th>
         {modes.length> 0 ? modes.map((e, index) => <td key={`mode${index}`}>{e}</td>) : null}
       </tr>
      </table> ): null
    
}

export default Flavonoids;