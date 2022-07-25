import './App.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
//import {Button, Card, ToggleButton, ToggleButtonGroup} from 'react-bootstrap';
import firebase from './Recipes/FireBase';

import Home from './Recipes/Home';


const App = () => {
    const recipeAPI = firebase.firestore().collection('Recipes');//reference to the firestore collection
    const [recipeList,setrecipeList] = useState([]); //list of recipes
    const fetchData = () => {
        recipeAPI.get().then(snapshot => {
            const recipeData = snapshot.docs.map(doc => doc.data());
            setrecipeList(recipeData);
        }
        ).catch(error => {
            console.log(error);
        }
        );

    }
    useEffect(() => {
        //set loading if undefined
        
        fetchData();
    }
    ,[]);



    return <Home/>

    ///TODO: filter the recipes by the checked items


}

export default App;
