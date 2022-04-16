import React, { useEffect, useState } from 'react';
import axios from "../service";
import MainScreen from '../MainScreen';
import { Form, Button, Card, Col, Row } from "react-bootstrap";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import Dashboard from './Dashboard';


function Admin() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(null)


  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    axios.post("/api/admin/login", { username, password })
      .then((data) => {
        setLoading(false);
        setUser(data.data)
        setUsername('')
        setPassword('')
        localStorage.setItem("userInfo", JSON.stringify(data.data));
      }).catch((error) => {
        setLoading(false);
        setError(error.response.data.message);
      })
  };

  const logout = () => {
    localStorage.removeItem('userInfo')
    setUser(null)
  }

  useEffect(() => {
    const user = localStorage.getItem('userInfo')
    if (user) setUser(JSON.parse(user))
  }, [])


  return (
    <MainScreen title={user ? 'Admin Dashboard' : 'Admin Login'} user={user} logout={logout}>
      {(!user) ?
        <Row className="justify-content-md-center">
          <Col md={4}>
            <Card className='shadow'>
              <Card.Body>
                <div className="loginContainer">
                  {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
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
                    <div className='d-flex align-items-center'>
                      <Button className='mt-2 px-4' variant="primary" type="submit">
                        Login
                      </Button>
                      { loading && <Loading className="mt-2 px-2" size={20} /> }
                    </div>
                  </Form>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row> :
        <Dashboard></Dashboard>
      }
    </MainScreen>
  )
}

export default Admin;