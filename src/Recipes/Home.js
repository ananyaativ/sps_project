import React, {useEffect, useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import {Button, Card, ToggleButton, ToggleButtonGroup,Row,Container} from 'react-bootstrap';
import firebase from './FireBase';





const Home = () => {
    const [vegetable, setVegetable] = useState([]);
    const [fruit, setFruit] = useState([]);
    const [legumes, setLegumes] = useState([]);
    const [checked, setChecked] = useState([]);
    const [recipeList,setrecipeList] = useState([]); //list of recipes
    
    


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
        const recipeAPI = firebase.firestore().collection('Recipes');//reference to the firestore collection

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

        recipeAPI.get().then(snapshot => {
            setrecipeList(snapshot.docs.map(doc => doc.data()));
        }
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

            <Row xs={3} md ={8} >
            <Container
            style={{

                display: 'flex',
                position: 'relative',
                alignItems: 'center',
                justifyContent: 'center',

                
            }}>
            {
                
                
                recipeList.map(ingredient  => {
                
                const filteredArray = ingredient.ingredients.filter(value => checked.includes(value));
                    if(filteredArray.length != 0 && filteredArray.length <= ingredient.ingredients.length)
                    {
                        return (
                         
                            <Container
                            style={{
                                minWidth: '20rem',
                                maxWidth: '30rem',
                                margin: '1rem',
                                minHeight: '20rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',


                            }}
                            >
                            <Card 
                            
                            style={{
                                minWidth: '20rem',
                                minHeight: '15rem',

                            
                            
                            
                            }} className="card-center" border="dark">  
                                <Card.Title><h1>{ingredient.Food}</h1></Card.Title>
                                <Card.Body>
                                    {ingredient.ingredients.map(ingre => <div>{ingre}</div>)}
                                
                                
                                
                                </Card.Body>
                            </Card>
                            </Container>
                        )
                    }
                    else
                    {
                        return null;
                    }

                }
                
            

           
                )

            }
            </Container>
        </Row>
    {    
    /* The code above does the following:
    1. Creates a list of ingredients from the recipeList array.
    2. Filters the list of ingredients to only include the ingredients that are checked.
    3. If the filtered list of ingredients is not empty, it will render the list of ingredients.
    4. If the filtered list of ingredients is empty, it will render nothing. */
    }
            

        </div>
    );
}



export default Home;









