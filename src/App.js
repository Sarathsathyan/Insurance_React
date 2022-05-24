
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from 'react';
// import './App.css';
import PolicyList from './PolicyList';

function App() {
  return (
    <div className="App">
      <h3>Insurance Policy List</h3>
      <PolicyList/>
    </div>
  );
}

export default App;
