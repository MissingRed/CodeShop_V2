import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./Pages/Landing";
import Login_Register from "./Pages/Login_Register";
import Home from "./Pages/Home";
import { AuthProvider } from "./Database/Auth";
import PrivateRoute from "./Components/PrivateRoute";

const App = () => {
  return (
    <>
      <div className="main">
        <AuthProvider>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/Login" component={Login_Register} />
              <PrivateRoute exact path="/Home" component={Home} />
            </Switch>
          </BrowserRouter>
        </AuthProvider>
      </div>
    </>
  );
};

export default App;
