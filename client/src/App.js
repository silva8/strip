import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Layout } from 'antd';

import WrappedLoginForm from './components/auth/LoginForm';
import WrappedRegistrationForm from './components/auth/RegisterForm'

import './App.css';

const { Header, Content, Footer } = Layout;

function App() {
  return (
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
			      		<Route exact path="/login" component={WrappedLoginForm} />
			      		<Route exact path="/register" component={WrappedRegistrationForm} />
			      	</div>
			    </Content>
			    <Footer className="footer">Ant Design ©2018 Created by Ant UED</Footer>
			</Layout>
	    </div>
    </Router>
  );
}

export default App;