
import {React , useState , useEffect} from 'react';
//import data from './data.json';
import axios from 'axios';
import db from './FireStore';




var admin = require("firebase-admin");
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

var serviceAccount = require("./creds.json");//Path to credentials file

admin.initializeApp({//Initialize the app
  credential: admin.credential.cert(serviceAccount)
});


const dbase = admin.firestore();//Initialize the database
//console.log(db);

//console.log("App started");

//store the firestore data into json



function Search(params)
{
    const [ingredientsList, setIngredientsList] = useState([]);
    const [search, setSearch] = useState('');
    useEffect( () =>
    {
        //Push data into ingredientsList
        dbase.collection('ingredients').get().then(doc => {
            doc.forEach(doc => {
                //console.log(doc.data());
                ingredientsList.push(doc.data());
            }
            )
        }
        ).catch(err => {
            console.log('Error getting documents', err);
        }
        )

    }
    ,[])

    return(
        <div>
            <h1>Search</h1>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}/>
            <ul>
                {ingredientsList.map(ingredient => {
                    if(ingredient.name.toLowerCase().includes(search.toLowerCase()))
                    {
                        return(
                            <li>{ingredient.name}</li>
                        )
                    }
                }
                )}
            </ul>
        </div>

    )
    

}




/*


function Search(props) {
    //create a new array by filtering the original array
    const filteredData = data.filter((el) => {
        //if no input the return the original
        if (props.input === '') {
            return '';//Return nothing if no input
        }
        //return the item which contains the user input
        else {
            return el.text.toLowerCase().includes(props.input)
        }
    })
    return (
        <ul>
            {filteredData.map((item) => (
                <li key={item.id}>{item.text}</li>
            ))}
        </ul>
    )
}
*/
export default Search;
