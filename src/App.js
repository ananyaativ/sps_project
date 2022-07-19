import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import firebase from './Components/FireBase';







const App = () => {
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



        recipeAPI.get().then((item) =>//get the list of ingredients
            {
                item.forEach((doc) => {
                    setrecipeList(doc.data());
                }
                )
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
    const fetchRecipe = (checking,recipe) =>
    {
       
        if(checking == null || checking.length == 0)
        {
            return ["Nothing to show"];
        }
        //console.log(checking.length)
        
        const filteredArray = recipe.ingredients.filter(value => checking.includes(value));//filter the list of ingredients
        if (filteredArray.length != 0 && filteredArray.length <= recipe.ingredients.length)
        {
            return (
                <div>
                    <h3>{recipe.Food}</h3>
                    <p>{recipe.ingredients.map(
                        (value, index) => {
                            return <li key={index}>{value}</li>//map the list of ingredients
                        }

                    )}</p>
                </div>
            )
        }
        else
        {
            return <h1>Nothing to show</h1>//if the checked list is not in the recipe list
        }
    }

   

    

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
                
                
               {fetchRecipe(checked,recipeList)}
               
            </div>


        </div>
    );
}


//pass the list of ingredients


    
    

















export default App;
