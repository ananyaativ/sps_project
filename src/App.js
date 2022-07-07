import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

const App = () => {
  const [vegetable, setVegetable] = useState([]);
  const [fruit, setFruit] = useState([]);

  const fetchData = () => {
    const vegetableAPI = "http://localhost:8080/filter?type=vegetable";
    const fruitAPI = "http://localhost:8080/filter?type=fruit";

    const getVegetable = axios.get(vegetableAPI);
    const getFruit = axios.get(fruitAPI);
    axios.all([getVegetable, getFruit]).then(
      axios.spread((...allData) => {

        const vegetableData = allData[0].data;
        const fruitData = allData[1].data;

        // const data = vegetableData.map(
        //   (element) => {
        //     return (
        //       <li>{element.name}</li>
        //     )
        //   }
        // )
        // return (
        //   <div>
        //     {data}
        //   </div>
        // )
        // setVegetable(vegetableData);
        // setFruit(fruitData);
        console.log(vegetableData);
        console.log(fruitData);

      })
    )

  }

  useEffect(() =>{
    fetchData()
  }, [])

  return (
    <div className="App">
    </div>
  );
}

export default App;
