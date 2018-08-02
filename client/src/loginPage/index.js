import React, { Component } from 'react';
// import * as ReactDOM from "react-dom";
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
    alert('submitted' + this.state.email + '\n' + this.state.password);
    axios({
        method: 'post',
        url: 'http://localhost:5000/api/users/login',
        header: {
          'Access-Control-Allow-Origin': '*',
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: {
          email: this.state.email, // 'dasihdoiahsdo@hotmail.com'
          password: this.state.password, // dasdaasdasdasdssdasdasdas
        }
      }
    ).then(function (response) {
      console.log(response);
      console.log(response.data)
    });
    e.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Please Log in</h1>
        <label>Username(Email)<input type="email" value={this.state.email} onChange={this.handleEmailChange}/></label>
        <br/>
        <label>Password<input type="password" value={this.state.password} onChange={this.handlePasswordChange}/></label>
        <br/>
        <input type="submit" value="Submit"/>
      </form>
    )
  }
}

// ReactDOM.render(
//   <LoginForm />,
//   document.getElementById('root')
// );