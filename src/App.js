import React, { useState } from "react";
import Home from "./views/Home/Home";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SearchPage from "./views/Search/SearchPage";
import NotFound from "./views/NotFound/NotFound";
import { auth } from "./firebase/firebase";

function App() {
  const handleLogin = () => {};

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/search" component={SearchPage}></Route>
        <Route path="/home" component={Home}></Route>
        <Route path="/not-found" component={NotFound}></Route>
        <Redirect from="/" exact to="/home"></Redirect>
        <Redirect to="/not-found"></Redirect>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
