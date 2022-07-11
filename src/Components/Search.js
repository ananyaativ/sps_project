
import {React , useState , useEffect} from 'react';
import data from './data.json';
import axios from 'axios';
import db from './firestore';




var admin = require("firebase-admin");
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

var serviceAccount = require("./creds.json");//Path to credentials file

admin.initializeApp({//Initialize the app
  credential: admin.credential.cert(serviceAccount)
});


const db = admin.firestore();//Initialize the database
//console.log(db);

//console.log("App started");





function Search(props)
{


    //GET ALL INGREdients from firestore
    const documentData = db.collection('ingredients')
    const ingredients = [];
    //get all documents
    documentData.get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                //ingredients.push(doc.data());
                //console.log(doc.data()['name']);
                //console.log(typeof(doc.data()));
                ///Map the data to an array
                ingredients.push(doc.data());
                
            });
        }
        ).catch(err => {
            console.log('Error getting documents', err);
        }
        );

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
