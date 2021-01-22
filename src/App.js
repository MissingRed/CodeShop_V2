import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./Pages/Landing";
import Login_Register from "./Pages/Login_Register";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Admin from "./Pages/Admin";
import Card from "./Pages/Card";
import ProductGameView from "./Pages/ProductGameView";

import { AuthProvider } from "./Database/Auth";
import PrivateRoute from "./Components/PrivateRoute";
import { db } from "./Database/Base";

const App = () => {
  const [productos, SetProductos] = useState([]);
  const [prod, SetProd] = useState("");

  const getLinks1 = async () => {
    db.collection("Games").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      // console.log(docs);
      SetProductos(docs);

      // docs.map((prod1) => {
      //   console.log(prod1.id);
      //   SetProd(prod1.id);
      // });
    });
  };

  useEffect(() => {
    getLinks1();
  }, []);

  return (
    <>
      <div className="main">
        <AuthProvider>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/Login" component={Login_Register} />
              <PrivateRoute exact path="/Home" component={Home} />
              <PrivateRoute exact path="/Profile" component={Profile} />
              <PrivateRoute exact path="/Card" component={Card} />
              <PrivateRoute exact path="/Admin" component={Admin} />
              <PrivateRoute
                exact
                path="/Product/:id"
                component={ProductGameView}
              />
              ;
            </Switch>
          </BrowserRouter>
        </AuthProvider>
      </div>
    </>
  );
};

export default App;
