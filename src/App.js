
import {React ,useState , useEffect} from 'react';
import TextField from "@mui/material/TextField";
//import List from '@material-ui/core/List';
import './App.css';
import List from './Components/List';


function App() {


  const [inputText, setInputText] = useState('');
  let inputHandler = (e) => {
    //convert it to a lowercase string
    setInputText(e.target.value.toLowerCase());
  }

  return (
    <div className="main">
      <div className="search">
        <h1>
          Recipe Search
        </h1>
        <TextField
          id="outlined-basic"
          variant='outlined'
          onChange={inputHandler}
          fullWidth
          label="Search"
          />

      </div>
      <List
        input={inputText}
      />
    </div>
  );
}

export default App;


/*  Citation:
        https://dev.to/salehmubashar/search-bar-in-react-js-545l


*/