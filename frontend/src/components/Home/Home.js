import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Accordion, ButtonGroup } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Nav } from "react-bootstrap";
import { Alert, Navbar } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import ProfileManage from "./ProfileManage";
import Transfer from "./Transfer";
import api from "../../api/axiosConfig";

const Home = () => {
  const [user, setUser] = useState([]);
  const [password, setPassword] = useState();
  const [accList, setAccList] = useState([]);
  const [accNum, setAccNum] = useState();

  const { userID } = useParams();

  const navigate = useNavigate();

  function handleAccount(accountID) {
    navigate(`/${userID}/${accountID}`);
  }

  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log("It worked!")
    );
    return (
      <Button variant="dark" onClick={decoratedOnClick} className="mb-3">
        {" "}
        {children}
      </Button>
    );
  }
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  function openAcc(type) {
    api
      .post(`/api/v1/user/${userID}/${type}`)
      .then((response) => {
        console.log(response);
        getUser();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const getUser = () => {
    api
      .get(`/api/v1/user/${userID}`)
      .then((response) => {
        setUser(response.data);
        console.log(user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getUser();
  }, [userID]);

  useEffect(() => {
    if (user) {
      Object.entries(user).forEach(([key, value]) => {
        if (key === "userID") {
          user.id = value;
        } else if (key === "password") {
          setPassword(value);
        } else if (key === "accountList") {
          setAccList(value);
        } else if (key === "numOfAccounts") {
          setAccNum(value);
        }
      });
    }
  }, [user]);

  return (
    <div id="#home" style={{ background: "#ffffff" }}>
      <Navbar bg="dark" variant="dark" className="mb-5">
        <Container>
          <Navbar.Brand href="#home">BankApp</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home" to="/Home/:userID">
                Home
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as:
              <ProfileManage userID={userID} password={password} />
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Row className="mb-5">
          <h2>Welcome {userID}</h2>
        </Row>
        <Row className="mb-4">
          {" "}
          <h2>Accounts: </h2>
        </Row>
        <Row className="mb-3 justify-content-md-center">
          <Card border="dark" style={{ width: "40rem" }}>
            <Card.Title></Card.Title>
            <Card.Body>
              {accList &&
                accList.map((account) => {
                  return (
                    <h3 key={account.accountID}>
                      <Row className="mb-3">
                        <Col sm={6}>
                          {account.type} - {account.accountID}
                        </Col>
                        <Col sm={5} className="justify-content-end">
                          ${account.balance}
                          <Button
                            variant="link"
                            onClick={() => handleAccount(account.accountID)}
                          >
                            View
                          </Button>
                        </Col>
                      </Row>
                    </h3>
                  );
                })}
            </Card.Body>
            <Accordion defaultActiveKey="1">
              <CustomToggle eventKey="0">Open a new account</CustomToggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <ListGroup>
                    <ListGroup.Item action onClick={() => openAcc("Checkings")}>
                      Checkings
                    </ListGroup.Item>
                    <ListGroup.Item action onClick={() => openAcc("Savings")}>
                      Savings
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Accordion.Collapse>
            </Accordion>
          </Card>
        </Row>
        <Row className="mb-3 justify-content-md-center">
          <Transfer user={user} getUser={getUser} updateUser={updateUser} />
        </Row>
      </Container>
    </div>
  );
};

export default Home;
