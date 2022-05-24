import { useState, useEffect } from "react";
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import API from "./API";
import 'font-awesome/css/font-awesome.min.css';

const PolicyList =()=>{
    const [name, setName] = useState("");
    const [policy, setPolicy] = useState([]);
    const [policyID, setPolicyId] = useState(null);
    
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
        let item = { name };
        API.patch(`/policy/${id}/`, item).then((res) => refreshPolicy());
      };

      function selectMovie(id) {
        let item = policy.filter((policy) => policy.id === id)[0];
        setName(item.name);
      }

   return (
     <div className="container mt-5">
       <div className="row">
         <div className="col-md-4">
           <h3 className="float-left">Edit Policy Data</h3>
           <Form onSubmit={onSubmit} className="mt-4">
             <Form.Group className="mb-3" controlId="formBasicName">
               <Form.Label>{policyID}Name</Form.Label>
               <Form.Control
                 type="text"
                 placeholder="Enter Name"
                 value={name}
                 onChange={(e) => setName(e.target.value)}
               />
             </Form.Group>
             <div className="float-right">
              <Button
                variant="primary"
                type="submit"
                onClick={onSubmit}
                className="mx-2"
              >
                Save
              </Button>
              <Button
                variant="primary"
                type="button"
                onClick={() => onUpdate(policyID)}
                className="mx-2"
              >
                Update
              </Button>
            </div>
           </Form>
         </div>
         <div className="col-md-8 m">
           <table className="table">
             <thead>
               <tr>
                 <th scope="col">Policy ID</th>
                 <th scope="col">Customer ID</th>
                 <th scope="col">Purchase Date</th>
                 <th scope="col">Income</th>

                 <th scope="col"></th>
               </tr>
             </thead>
             <tbody>
               {policy.map((policy, index) => {
                 return (
                   <tr key="">
                     <th scope="row">{policy.id}</th>
                     <td>{policy.customer_id}</td>
                     <td>{policy.date_of_purchase}</td>
                     <td>{policy.income}</td>
                     <td>
                      <i
                        className="fa fa-pencil-square text-primary d-inline"
                        aria-hidden="true"
                        onClick={() => selectMovie(policy.id)}
                      ></i>
                    </td>

                     {/* <td>
                      <i
                        className="fa fa-pencil-square text-primary d-inline"
                        aria-hidden="true"
                        onClick={() => selectMovie(movie.id)}
                      ></i>
                      <i
                        className="fa fa-trash-o text-danger d-inline mx-3"
                        aria-hidden="true"
                        onClick={() => onDelete(movie.id)}
                      ></i>
                    </td> */}
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