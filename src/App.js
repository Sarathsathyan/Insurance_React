
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from 'react';
// import './App.css';
import PolicyList from './PolicyList';

function App() {
  const [policy, setPolicy] = useState([])

  useEffect (() => {
    setPolicy([
      {
        policy_id:'123',
        date_of_purchase: '2018-02-01',
        customer_id: '451',
      },
    ])
  }, [])

  return (
    <div className="App">
      <h3>Insurance Policy List</h3>
      <PolicyList/>
    </div>
  );
}

export default App;
