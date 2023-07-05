import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import Container from "react-bootstrap/Container";

import { Alert, Navbar } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";

const LogIn = () => {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      userID: userID,
      password: password,
    };

    setLoading(true);
    api
      .post(`/api/v1/user/login`, userData)
      .then((response) => {
        console.log(response);
        setLoading(false);
        navigate(`/Home/${userData.userID}`);
      })
      .catch((error) => {
        setError("Account does not exist");
        console.error(error);
        setLoading(false);
      });

    setUserID("");
    setPassword("");
  };

  return (
    <div>
      <Container>
        <Row className="mb-5">
          <h1>Bank application</h1>
        </Row>
        <Row className="justify-content-md-center">
          <Card border="dark" style={{ width: "25rem" }}>
            <Card.Body>
              <Card.Title>Log In</Card.Title>
              <Form>
                <Form.Group
                  as={Row}
                  className="mb-3 justify-content-md-center"
                  controlId="formHorizontalEmail"
                >
                  <Form.Label column sm={4}>
                    Enter userID:
                  </Form.Label>
                  <Col sm={5}>
                    <Form.Control
                      value={userID}
                      onChange={(e) => setUserID(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3 justify-content-md-center"
                  controlId="formHorizontalPassword"
                >
                  <Form.Label column sm={5}>
                    Enter password:
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Col>
                </Form.Group>
                <Button onClick={handleSubmit} className="mb-3">
                  {loading ? <>Loading..</> : <>Submit</>}
                </Button>
                {error ? (
                  <Alert variant="danger">
                    Either incorrect userID or incorrect password.
                  </Alert>
                ) : null}
              </Form>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </div>
  );
};

export default LogIn;
