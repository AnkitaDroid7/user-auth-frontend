import React , { useState }from 'react';
import axios from "axios";
import './adminDashboard.css';
import MainScreen from './MainScreen';
import { Form, Button} from "react-bootstrap";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";


function AdminDashboard() {

     const [username,setUsername] = useState('');
     const [password,setPassword] = useState('');
     const [error,setError] = useState(false);
    const [loading, setLoading] = useState(false);
    

    const submitHandler = async (e) => {

                e.preventDefault();

                // Save it!
                try{
                  setLoading(true);
                    const {data} = await axios.post(

                        "/api/admin/admin",
                        {username,password}
                    );

                    setLoading(false);
                    localStorage.setItem("userInfo", JSON.stringify(data));

                } catch (error) {
                    setError(error.response.data.message);
                }
            };

  return (
    <MainScreen title="LOGIN">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              placeholder="Enter Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        </div>
    </MainScreen>
  )
}

export default AdminDashboard;