import React, { Component } from 'react';
import { Button } from "reactstrap";
const axios = require('axios');

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    // init state
    this.state = {
      email: '',
      password: ''
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value
    })
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    })
  }

  handleSubmit(e) {
    axios({
        method: 'post',
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
    ).then(response =>  {
      // TODO: error hint
      console.log(response);
      console.log(response.data)
    }).catch(error =>  {
        console.log(error);
      });
    e.preventDefault()
  }


  render() {
    const { forgotPasswordStyle } = styles

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Log in</h1>
          <label>Username (Email)<input type="email" value={this.state.email} onChange={this.handleEmailChange}/></label>
          <br/>
          <label>Password<input type="password" value={this.state.password} onChange={this.handlePasswordChange}/></label>
          <br/>
          <input type="submit" value="Sign in"/>
        </form>
        <br/>
        <Button color="success">Log in with your Google account</Button>
        {/*<button type="button" style={buttonStyle}>Log in with your Google account</button>*/}
        <br/>
        {/*TODO: replace link*/}
        <a href="http://www.w3school.com.cn" style={forgotPasswordStyle}>Forgot password?</a>
        {/*TODO: 组件库*/}
      </div>
    )
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