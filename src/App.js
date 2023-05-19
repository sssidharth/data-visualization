import React, {useState, useEffect} from 'react';
import Data from './Assets/Wine-Data.json'
import Flavonoids from './Components/flavonoids_table';
import './App.css';

function App() {
  let [flavanoidsData, setFlavanoidsData] = useState([]);
  let [gammaData, setGammaData] = useState([]);

  const getGamma = (data) => { // Calculate Gamma of all data values
    for(let i = 0 ;i<data.length; i++) {
      let g = 0
      g = ((data[i].Ash*data[i].Hue)/data[i].Magnesium).toFixed(3);
      data[i].gamma = g
    } 
  }

  useEffect(() => {
    let currentData = JSON.parse(JSON.stringify(Data));
    getGamma(currentData);
    let flavData = []
    let gammaData = [];
    let classes = new Set();
    for(let i = 0; i<currentData.length; i++) { // To find the number of Classes based on Alcohol type
      if(!classes.has(currentData[i].Alcohol)) classes.add(currentData[i].Alcohol);
    }
    for(let key of classes) {
      let data = currentData.filter((e) => e.Alcohol === key);  
      flavData.push(data.map((e) => e.Flavanoids)); // Flavanoids data based on Class
      gammaData.push(data.map((e) => e.gamma)); // Gamma data based on Class
    }
    setFlavanoidsData(flavData);
    setGammaData(gammaData);
  },[])

  const getMean = (dataSet) => { // Returns Mean of data passed as array (Average)
    let total = 0;
    for(let i = 0 ;i<dataSet.length; i++) {
      if(typeof dataSet[i] === 'string') dataSet[i] = Number('0'+dataSet[i])
      total+=Number(dataSet[i]);
    }
    return (total/dataSet.length).toFixed(3);
  }

  const getMedian = (dataSet) => { // Returns Median of data passed as array (middle value)
   let clone = JSON.parse(JSON.stringify(dataSet));
   clone = clone.sort((a,b) => a-b);
   if(clone%2 === 1) return clone[(clone.length-1)/2];
   return ((clone[Math.floor((clone.length-1)/2)]+clone[Math.floor((clone.length+1)/2)])/2).toFixed(3)
  }

  const getMode = (dataSet) => { // Returns Mode of data passed as array (value with highest frequency)
     let hm = new Map();
     for(let i = 0; i <dataSet.length; i++) {
      if(!hm.has(dataSet[i])) hm.set(dataSet[i], 1);
      else {
        hm.set(dataSet[i], dataSet[i]+1);
      }
     }
    let mode;
    let freq = 0;

    for(let [key,value] of hm) {
       if(value>freq) mode = key
    }
    return mode.toFixed(3);
   }

  return (
    <div className="App">
      <h1 style={{marginBottom: 100}}>Data Visualisation</h1>
     <Flavonoids tableData={flavanoidsData} type="Flavanoids" getMean={getMean} getMedian={getMedian} getMode={getMode} />
     <Flavonoids tableData={gammaData} type="Gamma" getMean={getMean} getMedian={getMedian} getMode={getMode} />
    </div>
  );
}

export default App;
