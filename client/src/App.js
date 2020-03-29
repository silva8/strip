import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import WrappedLoginForm from './components/auth/LoginForm';
import WrappedRegistrationForm from './components/auth/RegisterForm';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routeTypes/PrivateRoute';
import PublicRoute from './components/routeTypes/PublicRoute';
import WrappedStepOneForm from './components/cars/StepOneForm';

import './App.css';

const { Header, Content, Footer } = Layout;

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

function App() {
  return (
  	<Provider store={store}>
	  	<Router>
		    <div className="App">
				<Layout>
				    <Header className="header">
				    	<div className="logo" />
				    	<div className="leftHeaderTitles">
					    	<Link className="headerTitle" to="/post">Post trip</Link>
					      	<Link className="headerTitle" to="/search">Search trip</Link>
					      	<Link className="headerTitle" to="/login">Login</Link>
					      	<Link className="headerTitle" to="/register">Register</Link>
				      	</div>
				    </Header>
				    <Content className="content">
				      	<div className="contentBody">
				      		<Switch>
					      		<PublicRoute exact restricted path="/login" component={WrappedLoginForm} />
					      		<PublicRoute exact restricted path="/register" component={WrappedRegistrationForm} />
					      		<PrivateRoute exact path="/dashboard" component={Dashboard} />
					      		<PublicRoute exact path="/test" component={WrappedStepOneForm} />
				      		</Switch>
				      	</div>
				    </Content>
				    <Footer className="footer">Ant Design ©2018 Created by Ant UED</Footer>
				</Layout>
		    </div>
	    </Router>
    </Provider>
  );
}

export default App;