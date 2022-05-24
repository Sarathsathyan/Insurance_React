import { useState, useEffect } from "react";
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import API from "./API";
import 'font-awesome/css/font-awesome.min.css';

const PolicyList =()=>{
    const [name, setName] = useState("");
    const [fuel, setFuel] = useState("");
    const [policy, setPolicy] = useState([]);
    const [policyID, setPolicyId] = useState(null);
    const [id, setId] = useState(null);
    
    useEffect(() => {
        refreshPolicy();
      }, []);

      
    const refreshPolicy = () => {

        API.get('/policy')
          .then((res) => {
            console.log(res.data.results)
            setPolicy(res.data.results);

            // setName(res[0].name)
            // setGenre(res[0].genre)
            // setStarring(res[0].starring)
            // setMovieId(res[0].id)
          })
          .catch(console.error);
      };

      const onSubmit = (e) => {
        e.preventDefault();
        let item = { name };
        API.post("/", item).then(() => refreshPolicy());
      };
    
      const onUpdate = (id) => {
        let item = { fuel };
        API.patch(`/policy/${id}/`, item).then((res) => refreshPolicy());
      };

      function selectPolicy(id) {
        console.log(id)
        let item = policy.filter((policy) => policy.id === id)[0];
        console.log(item)
        setName(item.policy_id);
        setFuel(item.fuel);
        setId(item.id)
      }
      
      const handleChange = (event) => {
        setName(event.target.value);
      }
      function search(name){
          let items =[]
          if (name == ''){
              items = policy
          }
          else{
            console.log(124)
          console.log(name)
            items = policy.filter((policy) => {
            console.log(policy.policy_id+'')
            return (policy.policy_id+'').includes(name+'')
        });
          }
          

        setPolicy(items)

      }

   return (
     <div className="container mt-5">
       <div className="row">
         <div className="col-md-4">
           <h3 className="float-left">Edit Policy Data</h3>
           <Form onSubmit={onSubmit} className="mt-4">
             <Form.Group className="mb-3" controlId="formBasicName">
               <Form.Label>{policyID}Policy Id</Form.Label>
               <Form.Control
                 type="text"
                 placeholder="Enter PolicyID"
                 value={name}
                 onChange={(e) => setName(e.target.value)} disabled
               />
             </Form.Group>
             <Form.Group className="mb-3" controlId="formBasicName">
               <Form.Label>{policyID}Fuel</Form.Label>
               <Form.Control
                 type="text"
                 placeholder="Enter Fuel"
                 value={fuel}
                 onChange={(e) => setFuel(e.target.value)} 
               />
             </Form.Group>
             <div className="float-right">
             
              <Button
                variant="primary"
                type="button"
                onClick={() => onUpdate(id)}
                className="mx-2" 
              >
                Update
              </Button>
            </div>
           </Form>
         </div>
         <div className="col-md-8 m">
             <input type="text" placeholder="Enter Policy ID" onChange={handleChange}></input>
             <button onClick={() => search(name)}>Submit</button>
           <table className="table">
             <thead>
               <tr>
                 <th scope="col">Policy ID</th>
                 <th scope="col">Customer ID</th>
                 <th scope="col">Purchase Date</th>
                 <th scope="col">Income</th>
                 <th scope="col">Fuel</th>

                 <th scope="col"></th>
               </tr>
             </thead>
             <tbody>
               {policy.map((policy, index) => {
                 return (
                   <tr key={index}>
                     <th scope="row">{policy.policy_id}</th>
                     <td>{policy.customer_id}</td>
                     <td>{policy.date_of_purchase}</td>
                     <td>{policy.income}</td>
                     <td>{policy.fuel}</td>
                     <td>
                      <i
                        className="fa fa-pencil-square text-primary d-inline"
                        aria-hidden="true"
                        onClick={() => selectPolicy(policy.id)}
                      ></i>
                    </td>
                   </tr>
                 );
               })}
             </tbody>
           </table>
         </div>
       </div>
     </div>
   );
    
   
}

export default PolicyList;