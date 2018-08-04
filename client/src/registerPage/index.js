import React, { Component } from 'react';
// import * as style from './registerPageCss';
import axios from "axios";
import { Button } from "reactstrap";

export default class RegisterFrom extends Component {

  // init state
  state = {
    email: 'sf@sf.com',
    username: 'sj',
    password: '12345678',
    confirmedPassword: '12345678',
    isSignedUp: false
  };

  handleSubmit(e) {
    e.preventDefault() // prevent reset the inputs

    if (this.validate()) {
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
      })
        .then(response => {
          console.log(response.data)
          if(response.status === 200) {
            this.setState({ isSignedUp: true })
          }
        }).catch(error => {
          for (const property in error.response.data) {
            if (error.response.data.hasOwnProperty(property)) {
              alert(error.response.data[property]);
              // TODO: change the CSS of corresponding input box
              // console.log("property:",property);
              // console.log("value:",error.response.data[property]);
            }
          }
        }
        );
    }
}

  validate() {
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
    const { containerLayout, innerDiv, underlineStyle } = styles;

    if(!this.state.isSignedUp) {
      return <div style={containerLayout}>
        <h1>Sign up</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div><label style={innerDiv}>Email<span>*</span><input type={"email"} value={this.state.email} onChange={e => this.setState({email: e.target.value})}/></label></div>
          <div><label>Username<span>*</span><input type={"text"} value={this.state.username} onChange={e => this.setState({
            username: e.target.value})}/></label></div>
          <div><label style={innerDiv}>Password<input type="password" value={this.state.password} onChange={e => this.setState({
            password: e.target.value
          })}/></label></div>
          <div><label style={innerDiv}>Confirm your password<input type="password" value={this.state.confirmedPassword} onChange={e => this.setState({
            confirmedPassword: e.target.value })}/></label></div>
          <input type={"submit"} value={"Create a new account"}/>
        </form>
        <div><Button color="success">Sign up with your Google account</Button></div>
        {/*TODO: replace link with root URL*/}
        <div><a href="http://localhost:3000//login" style={underlineStyle}>Already signed up?</a></div>
        {/*{this.renderSignUpSuccessfully()}*/}
      </div>
    } else if(this.state.isSignedUp) {
      return <div style={ containerLayout }><h1>Account created</h1></div>
    }
  }

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
  },
  underlineStyle: {
    color: 'gray',
    textDecoration: 'underline'
  }
}