import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';


const App = () => {
    const [vegetable, setVegetable] = useState([]);
    const [fruit, setFruit] = useState([]);
    const [checked, setChecked] = useState([]);

    // Add/Remove checked item from list
    const handleCheck = (event) => {
        let updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
            console.log(event);
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
    };

    const fetchData = () => {
        const vegetableAPI = "http://localhost:8080/filter?type=vegetable";
        const fruitAPI = "http://localhost:8080/filter?type=fruit";

        const getVegetable = axios.get(vegetableAPI);
        const getFruit = axios.get(fruitAPI);
        axios.all([getVegetable, getFruit]).then(
            axios.spread((...allData) => {

                const vegetableData = allData[0].data;
                const fruitData = allData[1].data;

                setVegetable(vegetableData);
                setFruit(fruitData);

            })
        )

    }
    //checked is the list of ingredients name that are checked
    console.log(checked);

    useEffect(() =>{
        fetchData()
    }, [])

    return (
        <div className="App">
            <h2>Vegetables</h2>
            {vegetable.map((element) => <label>
                    <input value={element.name} type="checkbox" onChange={handleCheck}/>
                    {element.name} <br/>
                </label>
            )}
            <h2>Fruits</h2>
            {fruit.map((element) => <label>
                    <input value={element.name} type="checkbox" onChange={handleCheck}/>
                    {element.name} <br/>
                </label>

            )}
            <br/>
            //To DO: Add the event to change to different page and pass the list of checked ingredients
            
            <button>Search</button>

        </div>
    );
}

export default App;
