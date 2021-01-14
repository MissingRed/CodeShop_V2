import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./Pages/Landing";
import Login_Register from "./Pages/Login_Register";

const App = () => {
  return (
    <>
      <div className="main">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/Login" component={Login_Register} />
          </Switch>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
