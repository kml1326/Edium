import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import SinglePost from "./components/SinglePost";
import Header from "./components/Header";

import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" component={DashBoard} />
            <Route path="/posts/:id" component={SinglePost} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
