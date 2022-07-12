import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
//import Search from  './Components/Search'
import firebase from './Components/FireBase';
//import { QuerySnapshot } from 'firebase-admin/firestore';
import TextField from "@mui/material/TextField";




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
            
            <button>Search</button>{/*button to search*/}
            <Search/>{/*Search component*/}

        </div>
    );
}







const List = (props) =>//List component
{// This component is used to display the list of food that matches the input
    const [ingredientsList, setIngredientsList] = useState([]);//list of ingredients
    const [loading, setLoading] = useState(false);//to show loading icon
  
    const ref = firebase.firestore().collection('ingredients');//reference to the firestore collection

    const showIngredients = () =>
    {
        setLoading(true);//show loading
        ref.get().then((item) =>//get the list of ingredients
        {
            const items = item.docs.map((doc) => doc.data());//get the data of the ingredients
            setIngredientsList(items);//set the list of ingredients
        })
        setLoading(false);//hide loading
        
    }
    useEffect(() =>//when the component is mounted, show the ingredients
    {
        showIngredients();//show the list of ingredients
    }
    ,[]);



    const filteredData = ingredientsList.filter((el) => {
        //if no input the return the original
        if (props.input === '') {
            return '';//Return nothing if no input
        }
        //return the item which contains the user input
        else {
            return el.name.toLowerCase().includes(props.input);
        }
    })

    if(ingredientsList.length==0)
    {
        return(
            <h1>
                Loading...{/*loading if data is not pulling*/}
            </h1>
        )
    }
    return(
        <ul>
            {filteredData.map(ingredient => (/*map the filtered data to the list*/
                <li key={ingredient.id}>
                    <h2>{ingredient.name}</h2>{/*display the name of the ingredient*/}
                    <p>{ingredient.type}</p>{/*type of the ingredient*/}
                </li>
            ))}

            </ul>
            );

   


}









const Search = () => {
    
    const [inputText, setInputText] = useState('');//input text
    let inputHandler = (e) => {//input handler
      //convert it to a lowercase string
      setInputText(e.target.value.toLowerCase());//set the input text
    }//inputHandler
  
    
    return (
        <div>{/*div to display the search bar*/}
            <div className='main'>{/*main div*/}
                <div className='search'>{/*search bar*/}
            
                        <TextField
                    id="outlined-basic"
                    variant='outlined'
                    onChange={inputHandler}
                    fullWidth
                    label="Search"
                    />{/*text field for input*/}
                
                    <List 
                    input={inputText}/>{/*Shows a list of food assigned with the character being added*/}

                </div>{/*search div*/}
            </div>{/*main div*/}
        </div>//div
    );

}


    
    

















export default App;
