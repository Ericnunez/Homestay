import React, { useEffect } from "react";
import Home from "./views/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SearchPage from "./views/Search/SearchPage";
import NotFound from "./views/NotFound/NotFound";
import { setUser } from "./store/actions/auth.js";
import { Switch, Route, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUser());
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/search" component={SearchPage}></Route>
        <Route exact path="/not-found" component={NotFound}></Route>
        <Route exact path="/" component={Home}></Route>
        <Redirect exact to="/not-found"></Redirect>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
