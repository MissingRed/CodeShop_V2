import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./Pages/Landing";
import Login_Register from "./Pages/Login_Register";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Admin from "./Pages/Admin";
import ProductGameView from "./Pages/ProductGameView";
import Purchases from "./Pages/Purchases";
import ViewPurchase from "./Components/ViewPurchase";

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
              <Route exact path="/Home" component={Home} />
              <PrivateRoute exact path="/Profile" component={Profile} />
              <PrivateRoute exact path="/Admin" component={Admin} />
              <PrivateRoute exact path="/Purchases" component={Purchases} />
              <PrivateRoute
                exact
                path="/Purchases/:id"
                component={ViewPurchase}
              />

              <Route exact path="/Product/:id" component={ProductGameView} />
            </Switch>
          </BrowserRouter>
        </AuthProvider>
      </div>
    </>
  );
};

export default App;
