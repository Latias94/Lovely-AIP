import React from 'react';
import axios from 'axios';
import setAuthTokenInHeader from "./setAuthTokenInHeader";
import jwt_decode from "jwt-decode";
import {GET_ERRORS} from "../actions/types";
import {setCurrentUser} from "../actions/authActions";

class VerifyEmail extends React.Component {
	state = {
		token: ''
	}

	componentDidMount() {
		this.setState({token:this.props.match.params.token});
		setTimeout(3000);
		verify();
    window.open('/login', '_self');
	}

	render () {
	  return <div></div>
  }
}

function verify(token) {
  axios({
    method: 'post',
    url: '/users/activate',
    data: token,
  }).then((res) => {

  })
    .catch();
}

export default VerifyEmail;
