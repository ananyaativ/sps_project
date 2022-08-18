import React, {useEffect, useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import {Button, Card, ToggleButton, ToggleButtonGroup,Row,Container,CardGroup,Col} from 'react-bootstrap';

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


        //const getVegetable = axios.get(vegetableAPI);
        //const getFruit = axios.get(fruitAPI);
        //const getLegumes = axios.get(legumesAPI);
        const recipeAPI = firebase.firestore().collection('Recipes');//reference to the firestore collection
        const getFruit = firebase.firestore().collection('ingredients').where('type','==','fruit');
        const getVegetable = firebase.firestore().collection('ingredients').where('type','==','vegetable');
        const getLegumes = firebase.firestore().collection('ingredients').where('type','==','legumes');
        console.log(getFruit);

       
        getFruit.get().then(snapshot => {
            const fruits = snapshot.docs.map(doc => doc.data());
            setFruit(fruits);
            console.log(fruits);
        }
        )
        getVegetable.get().then(snapshot => {
            const vegetables = snapshot.docs.map(doc => doc.data());
            setVegetable(vegetables);
        }
        )
        getLegumes.get().then(snapshot => {
            const legumes = snapshot.docs.map(doc => doc.data());
            setLegumes(legumes);
        }
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
                    <ToggleButtonGroup type="checkbox"
                    
                    className="mb-2" style={{flexWrap: "wrap"}}>
                            {legumes.map((element) => <ToggleButton id={element.name} value={element.name} onChange={handleCheck} className="mb-auto custom-button" variant="outline-dark">
                                    {element.name}
                                </ToggleButton>
                            )}
                    </ToggleButtonGroup>
                    <br/>
                </Card.Body>
            </Card>
            
            
            <Container
                className="card-center"
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                   }}
            >

            
                <Container>
                <Row xs={1} md={2} className="g-4">
          
            {
                
                
                recipeList.map(ingredient  => {
                
                const filteredArray = ingredient.ingredients.filter(value => checked.includes(value));
                    if(filteredArray.length != 0 && filteredArray.length <= ingredient.ingredients.length)
                    {
                        return (
                         
                         
                                <Col>
                            <Card 
                            
                            style={{
                                minWidth: '20rem',
                                minHeight: '28rem',
                                margin: '10%',
                            }} 
                            className="card-center" border="dark"> 
                            <Card.Img
                            src={ingredient.reference}
                            alt="no image"
                            style={
                                {
                                    float: 'left',
                                    width: '100%',
                                    height: '15vw',
                                    objectFit: 'cover'

                                }
                            }
                            />
                                <Card.Title><h1>{ingredient.Food}</h1></Card.Title>
                                <Card.Body>
                                    <p><b>Ingredients:{' '}</b>
                                    {ingredient.ingredients.map(ingre => ingre + ", ")}
                                    </p>
                                    <Button size="md" className="search-button">More</Button> 
                                
                                
                                </Card.Body>
                            </Card>
                            </Col>
                           
                        )
                    }
                    else
                    {
                        return null;
                    }

                }
                
            

           
                )

            }
            </Row>
          </Container>
        
        </Container>
        
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


