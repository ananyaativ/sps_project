

const Homestuff = () => {

    
    
    const [vegetable, setVegetable] = useState([]);
    const [fruit, setFruit] = useState([]);
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

    const fetchData = () => {
        const vegetableAPI = "http://localhost:8080/filter?type=vegetable";
        const fruitAPI = "http://localhost:8080/filter?type=fruit";
        const recipeAPI = firebase.firestore().collection('Recipes');//reference to the firestore collection

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



        recipeAPI.get().then(snapshot => {
            setrecipeList(snapshot.docs.map(doc => doc.data()));
        }
        )



        

    }
    //checked is the list of ingredients name that are checked
    console.log(checked);
    

    useEffect(() => {
        fetchData()
    }, [])

   



/* Mahamud
     Here is the explanation for the code above:
    1. First we check if the checked list is null or empty. If it is, we return the following message: "Nothing to show"
    2. Next we filter the list of ingredients. We use the filter method to filter the list of ingredients.
    3. We check if the filtered list is not empty and if the length of the filtered list is less than the length of the original list. If it is, we return the following message: "Nothing to show"
    4. If the above conditions are not met, we return the following message: "Nothing to show"
    5. We return the following message: "Nothing to show" if the checked list is not in the recipe list 
*/

   
    //create a button to submit the list of ingredients
   
    

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

            
            <div>
                
                    
                
             
            </div>
            <div>
           <Row xs={3} md ={8} >
            <Container
            style={{

                display: 'flex',
                
            }}>
            {
                
                
                recipeList.map(ingredient  => {
                const filteredArray = ingredient.ingredients.filter(value => checked.includes(value));
                    if(filteredArray.length != 0 && filteredArray.length <= ingredient.ingredients.length)
                    {
                        return (
                         
                            <Container
                            style={{
                                width: '30rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',


                            }}
                            >
                            <Card style={
                                {
                                    width: '18rem',
                                    margin: '10px',
                                    backgroundColor: '#f5f5f5',
                                    border: '1px solid #e5e5e5',
                                    padding: '10px',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }
                            }>  
                                <Card.Title>{ingredient.Food}</Card.Title>
                                <Card.Body>{ingredient.ingredients.map(
                                    (value) => {
                                        return <h2>
                                            {value}
                                        </h2>//map the list of ingredients
                                    }

                                )}
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


        </div>
    );
    
    
    
    
    
}