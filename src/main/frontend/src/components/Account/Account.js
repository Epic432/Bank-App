import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import { Accordion, ButtonGroup, CardGroup } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Nav } from "react-bootstrap";
import { Alert, Navbar } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import CloseAccount from "./CloseAccount";
import api from "../../api/axiosConfig";

const Account = () => {
  const { userID } = useParams();
  const { accountID } = useParams();

  const [account, setAccount] = useState([]);

  const [type, setType] = useState("");
  const [balance, setBalance] = useState();
  const [transHistory, setTransHistory] = useState([]);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    navigate(`/Home/${userID}`);
  };

  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log("it worked")
    );

    return (
      <Button variant="dark" onClick={decoratedOnClick} className="mb-3">
        {" "}
        {children}
      </Button>
    );
  }

  const updateAccount = (updatedAccount) => {
    setAccount(updatedAccount);
  };

  useEffect(() => {
    setLoading(true);
    api
      .get(`/api/v1/user/${userID}/${accountID}`)
      .then((response) => {
        setAccount(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [accountID]);

  useEffect(() => {
    if (account) {
      Object.entries(account).forEach(([key, value]) => {
        if (key === "userID") {
        } else if (key === "type") {
          setType(value);
        } else if (key === "balance") {
          setBalance(value);
        } else if (key === "transHistory") {
          setTransHistory(value);
        }
      });
    }
  }, [account]);

  return (
    <div>
      <Navbar bg="dark" variant="dark" className="mb-5">
        <Container>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={handleClick}>Back</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Row className="mb-3"></Row>
        <Row className="mb-3">
          <h1>
            {type} {accountID}
          </h1>
        </Row>
        <Row className="mb-3">
          <h3>Balance: ${balance} </h3>
        </Row>

        <Row className="mb-4 justify-content-md-center">
          <Col>
            <Card border="dark" style={{ width: "40rem" }}>
              <Card.Header>
                <h3>Transaction History</h3>
              </Card.Header>
              <Card.Body>
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transHistory &&
                      Object.entries(transHistory).map(([key, value]) => (
                        <tr key={key}>
                          <td>{key}</td>
                          <td>{value}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card border="dark" style={{ width: "30rem" }}>
              <Card.Header>
                <h3>Transaction Options</h3>
              </Card.Header>
              <Card.Body>
                <Accordion defaultActiveKey="2">
                  <CustomToggle eventKey="0">Deposit</CustomToggle>
                  <Col>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <Deposit
                          userID={userID}
                          accountID={accountID}
                          updateAccount={updateAccount}
                        />
                      </Card.Body>
                    </Accordion.Collapse>
                  </Col>
                  <Col>
                    <CustomToggle eventKey="1">Withdraw</CustomToggle>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body>
                        <Withdraw
                          userID={userID}
                          accountID={accountID}
                          balance={balance}
                          updateAccount={updateAccount}
                        />
                      </Card.Body>
                    </Accordion.Collapse>
                  </Col>
                </Accordion>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col>
            <CloseAccount />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Account;
