import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";

class NavBar extends Component {
	onLogoutClick = e => {
		e.preventDefault();
		this.props.logoutUser();
	}
	render() {
		if(!this.props.auth.isAuthenticated){
			return (
				<div>
			    	<div className="logo" />
			    	<div className="leftHeaderTitles">
				    	<Link className="headerTitle" to="/post">Post trip</Link>
				      	<Link className="headerTitle" to="/search">Search trip</Link>
				      	<Link className="headerTitle" to="/login">Login</Link>
				      	<Link className="headerTitle" to="/register">Register</Link>
			      	</div>
			  	</div>
			);
		}
		else{
			return (
				<div>
			    	<div className="logo" />
			    	<div className="leftHeaderTitles">
				    	<Link className="headerTitle" to="/post">Post trip</Link>
				      	<Link className="headerTitle" to="/search">Search trip</Link>
				      	<a className="headerTitle" onClick= {this.onLogoutClick}>Logout</a>
			      	</div>
			  	</div>
			);
		}
	}
}

NavBar.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ logoutUser }
)(NavBar);
