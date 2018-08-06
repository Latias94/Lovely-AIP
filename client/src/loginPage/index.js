import React, { Component } from 'react';
import { Button } from "reactstrap";
import Redirect from "react-router-dom/es/Redirect";
const axios = require('axios');

export default class LoginForm extends Component {

  // init state
  state = {
    isLoggedIn : false,
    email: '',
    password: ''
  }

  handleSubmit(e) {
    e.preventDefault();

    axios({
        method: 'post',
      // TODO: URL need to be modified before deployment
        url: 'http://localhost:5000/api/users/login',
        header: {
          'Access-Control-Allow-Origin': '*',
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: {
          email: this.state.email,
          password: this.state.password,
        }
      }
    ).then(response => {
      // TODO: error hint
      console.log(response.data)
      if(response.status = 200) {
        // alert("Logged in successfully!")
        this.setState({ isLoggedIn : true })
      }
    }).catch(error => {
      for (const property in error.response.data) {
        if (error.response.data.hasOwnProperty(property)) {
          alert(error.response.data[property]);
          // TODO: change the CSS of corresponding input box
          // console.log("property:",property);
          // console.log("value:",error.response.data[property]);
        }
      }});
  }

  render() {
    const {forgotPasswordStyle} = styles

    if (!this.state.isLoggedIn) {
      return (
        <div>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <h1>Log in</h1>
            <label>Email<input type="email" value={this.state.email} onChange={e => this.setState({
              email: e.target.value
            })}/></label>
            <br/>
            <label>Password<input type="password" value={this.state.password} onChange={e => this.setState({
              password: e.target.value
            })}/></label>
            <br/>
            <input type="submit" value="Sign in"/>
          </form>
          <br/>
          <Button color="success">Log in with your Google account</Button>
          {/*<button type="button" style={buttonStyle}>Log in with your Google account</button>*/}
          <br/>
          <a href="/retrieve-password" style={forgotPasswordStyle}>Forgot password?</a>
        </div>
      )
    } else if(this.state.isLoggedIn) {
      return <Redirect to='/home' />
    }
  }
}

const styles = {
  forgotPasswordStyle: {
    color: 'gray',
    textDecoration: 'underline'
  },
  buttonStyle: {
    flex: 1,// extend as much as it can
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5
  },
}