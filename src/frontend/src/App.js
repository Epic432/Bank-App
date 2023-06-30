import "./App.css";
import { Routes, Route } from "react-router-dom";
import FrontPage from "./components/FrontPage";
import Home from "./components/Home/Home";
import axios from "axios";
import { useState, useEffect } from "react";
import LogIn from "./components/LogIn";
import Account from "./components/Account/Account";

function App() {
  //axios.defaults.baseURL = "https://main.di5cn7pgswrz6.amplifyapp.com";
  //axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

  return (
    <div className="App">
      <header>
        <Routes>
          <Route path="/" element={<FrontPage />}></Route>
          <Route path="/LogIn" element={<LogIn />}></Route>
          <Route path="/Home/:userID" element={<Home />}></Route>
          <Route path="/:userID/:accountID" element={<Account />}></Route>
        </Routes>
      </header>
    </div>
  );
}

export default App;
