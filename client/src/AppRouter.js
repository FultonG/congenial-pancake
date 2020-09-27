import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Video from "./pages/Video";
import RegisterPage from "./pages/CreateUser"
import RegisterVendor from './pages/CreateVendor';
import LoginPage from "./pages/LoginPage"
import Restaurants from "./pages/Restaurants";
import Checkout from "./pages/Checkout";
import OrderStatus from "./pages/OrderStatus";


const AppRouter = () =>
 {
  return (
    <Router>
        <Switch>
        <Route exact path="/">
            <Redirect to="/login" />
        </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/register-vendor">
            <RegisterVendor />
          </Route>
          <PrivateRoute path="/restaurants">
            <Restaurants />
          </PrivateRoute>
          <PrivateRoute path="/checkout">
            <Checkout />
          </PrivateRoute>
          <PrivateRoute path="/status">
            <OrderStatus />
          </PrivateRoute>
          <VendorRoute path="/vendor">
            <Video />
          </VendorRoute>
        </Switch>
    </Router>
  );
}

const fakeAuth = {
  isAuthenticated: true,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const isVendor = () => localStorage.getItem("isVendor");
const isAuthenticated = () => !!localStorage.getItem("userJWT"); 

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        fakeAuth.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
function VendorRoute ({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        fakeAuth.isAuthenticated && isVendor() == "true" ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/restaurants",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default AppRouter;