import './App.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import {Button, Card, ToggleButton, ToggleButtonGroup} from 'react-bootstrap';

const App = () => {
    const [vegetable, setVegetable] = useState([]);
    const [fruit, setFruit] = useState([]);
    const [legumes, setLegumes] = useState([]);
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

    //gets data from the API and store it in variables
    const fetchData = () => {
        const vegetableAPI = "http://localhost:8080/filter?type=vegetable";
        const fruitAPI = "http://localhost:8080/filter?type=fruit";
        const legumesAPI = "http://localhost:8080/filter?type=legumes";


        const getVegetable = axios.get(vegetableAPI);
        const getFruit = axios.get(fruitAPI);
        const getLegumes = axios.get(legumesAPI);

        axios.all([getVegetable, getFruit, getLegumes]).then(
            axios.spread((...allData) => {

                const vegetableData = allData[0].data;
                const fruitData = allData[1].data;
                const legumesData = allData[2].data;


                setVegetable(vegetableData);
                setFruit(fruitData);
                setLegumes(legumesData);

            })
        )

    }
    //checked is the list of ingredients name that are checked
    //console.log(checked);


    useEffect(() => {
        fetchData()
    }, [])



    return (
        <div className="App">
            <div className="background-img">
                <div className="heading">
                    Food Finder
                </div>
            </div>
            <Card style={{width: '50rem'}} className="card-center" border="dark">
                <Card.Header as="h3">Vegetables</Card.Header>
                <Card.Body>

                    <ToggleButtonGroup type="checkbox" className="mb-2"  style={{flexWrap: "wrap"}} >
                        {vegetable.map((element) => <ToggleButton id={element.name} value={element.name} onChange={handleCheck} className="mb-auto custom-button" variant="outline-dark" >
                                {element.name}
                            </ToggleButton>
                        )}
                    </ToggleButtonGroup>
                    <br/>
                </Card.Body>
            </Card>
            <Card style={{width: '50rem'}} className="card-center" border="dark">
                <Card.Header as="h3">Fruits</Card.Header>
                <Card.Body>
                    <ToggleButtonGroup type="checkbox" className="mb-2" style={{flexWrap: "wrap"}}>
                            {fruit.map((element) => <ToggleButton id={element.name} value={element.name} onChange={handleCheck} className="mb-auto custom-button" variant="outline-dark">
                                    {element.name}
                                </ToggleButton>
                            )}
                    </ToggleButtonGroup>
                    <br/>
                </Card.Body>
            </Card>
            <Card style={{width: '50rem'}} className="card-center" border="dark">
                <Card.Header as="h3">Legumes</Card.Header>
                <Card.Body>
                    <ToggleButtonGroup type="checkbox" className="mb-2" style={{flexWrap: "wrap"}}>
                            {legumes.map((element) => <ToggleButton id={element.name} value={element.name} onChange={handleCheck} className="mb-auto custom-button" variant="outline-dark">
                                    {element.name}
                                </ToggleButton>
                            )}
                    </ToggleButtonGroup>
                    <br/>
                </Card.Body>
            </Card>
            <Button size="lg" className="search-button">Search</Button>

        </div>
    );
}

export default App;
