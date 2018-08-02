import React, { Component } from 'react';
const axios = require('axios');

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      email: e.target.email,
      password: e.target.password
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
          email: 'dasihdoiahsdo@hotmail.com',
          password: 'dasdaasdasdasdssdasdasdas',
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
        <h1>Welcome</h1>
        <label>username<input type="email" value={this.state.email} onChange={this.handleChange}/></label>
        <div><p>password</p><input type="password"/></div>
        <input type="submit" value="submit"/>
      </form>
    )
  }
}

export default LoginForm