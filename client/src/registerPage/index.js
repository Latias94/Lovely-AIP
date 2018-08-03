import React, { Component } from 'react';
// import * as style from './registerPageCss';
import axios from "axios";

export default class RegisterFrom extends Component {
  constructor(props) {
    super(props)

    // init state
    this.state = {
      email: '',
      username: '',
      password: '',
      confirmedPassword: ''
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmedPasswordChange = this.handleConfirmedPasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault() // prevent reset the inputs
    if (this.validation()) {
      axios({
        method: 'post',
        url: 'http://localhost:5000/api/users/register',
        header: {
          'Access-Control-Allow-Origin': '*',
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: {
          name: this.state.username,
          email: this.state.email,
          password: this.state.password,
        }
      });
    }
}

  handleUsernameChange(e) {
    this.setState({
      username: e.target.value
    })
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

  handleConfirmedPasswordChange(e) {
    this.setState({
      confirmedPassword: e.target.value
    })
  }

  validation() {
  if(this.state.username === '') {
      alert('Please fill in your username')
    } else if(this.state.password === '') {
      alert('Please fill in your password')
    } else if(this.state.confirmedPassword === '') {
      alert('Please fill in your confirmed password')
    } else if(this.state.password.length < 8) {
      alert('Your password has to be more than 7 characters')
    } else if(this.state.password !== this.state.confirmedPassword) {
      alert("The two passwords don't match.")
    }
    else {
      return true
    }
  }

  render() {
    const { containerLayout, innerDiv } = styles;
    return (
            <div style={containerLayout}>
              <h1>Sign up</h1>
              <form onSubmit={this.handleSubmit}>
                <div><label style={innerDiv}>Email<span>*</span><input type={"email"} value={this.state.email} onChange={this.handleEmailChange}/></label></div>
              <div><label>Username<span>*</span><input type={"text"} value={this.state.username} onChange={this.handleUsernameChange}/></label></div>
                <div><label style={innerDiv}>Password<input type="password" value={this.state.password} onChange={this.handlePasswordChange}/></label></div>
                <div><label style={innerDiv}>Confirm your password<input type="password" value={this.state.confirmedPassword} onChange={this.handleConfirmedPasswordChange}/></label></div>
              <input type={"submit"} value={"Submit"}/>
              </form>
            </div>
    )}
}

const styles = {
  containerLayout: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
 innerDiv: {
  width: 'auto'
}
}