import React, { Component } from 'react';
import axios from "axios";
import './registerPage.css'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button'

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  underlineStyle: {
    color: 'gray',
    textDecoration: 'underline'
  }
});

class RegisterForm extends Component {

  // init state
  state = {
    email: '',
    name: '',
    password: '',
    password2: '',
    isSignedUp: false,
    errors: {}
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };


  handleSubmit = e => {
    e.preventDefault() // prevent resetting the inputs
    const { name, email, password } = this.state

    if (this.validate(this.state)) {
      axios({
        method: 'post',
        // TODO: URL need to be modified before deployment
        url: 'http://localhost:5000/api/users/register',
        header: {
          'Access-Control-Allow-Origin': '*',
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: {
          name,
          email,
          password,
        }
      })
        .then(response => {
          if(response.status === 200) {
            this.setState({ isSignedUp: true })
          }
        }).catch(error => {
          this.setState({
            errors: error.response.data
          })
          // for (const property in error.response.data) {
          //   if (error.response.data.hasOwnProperty(property)) {
          //     alert(error.response.data[property]);
          //     // TODO: change the CSS of corresponding input box
          //     // console.log("property:",property);
          //     // console.log("value:",error.response.data[property]);
          //   }
          // }
        }
      );
    }
  }

// TODO: implement better validation approach

  validate = (props) => {
    const { email, name, password, password2 } = props
    if(email.length === 0) {
      this.setState({
        errors: {
          email: 'Please fill in your email.'
        }})
      return false
    } else if(name.length === 0) {
      this.setState({
        errors: {
          name: 'Please fill in your name.'
        }})
      return false
    } else if (name.length < 2 || name.length > 30) {
      this.setState({
        errors: {
          name: 'Name must be between 2 and 30 characters.'
        }})
      return false
    } else if(password.length === 0) {
      this.setState({
        errors: {
          password: 'The password is required.'
        }})
      return false
    } else if(password.length < 6) {
      this.setState({
        errors: {
          password: 'Password must be at least 6 character.'
        }})
      return false
    } else if(password2.length === 0) {
      this.setState({
        errors: {
          password2: 'Please type your password again.'
        }})
      return false
    } else if(password !== password2) {
      this.setState({
        errors: {
          password: 'The two passwords don\'t match.'
        }})
      return false
    } else {
      return true
    }
  };

  render() {
    const { containerLayout, underlineStyle } = styles;
    const { email, name, password, password2, errors, isSignedUp } = this.state;
    const { classes } = this.props;

    // TODO: refactor to conditional render
    if(!isSignedUp) {
      return <div className={classes.container}>
        <h1>Sign up</h1>
        <div className={"Avatar"}>Avatar</div>

        <FormControl className={classes.formControl} error={errors.email} aria-describedby="email-helper-text">
          <InputLabel htmlFor="email-helper">Email*</InputLabel>
          <Input id="email" value={email} type={"email"} onChange={this.handleChange} />
          {errors.email && <FormHelperText id="email-helper-text">{errors.email}</FormHelperText>}
        </FormControl>

        <FormControl className={classes.formControl} error={errors.name} aria-describedby="name-helper-text">
          <InputLabel htmlFor="name-helper">Name*</InputLabel>
          <Input id="name" value={name} onChange={this.handleChange} />
          {errors.name && <FormHelperText id="name-helper-text">{errors.name}</FormHelperText>}
        </FormControl>

        <FormControl className={classes.formControl} error={errors.password} aria-describedby="password-helper-text">
          <InputLabel htmlFor="password-helper">Password</InputLabel>
          <Input id="password" value={password} type={"password"} onChange={this.handleChange} />
          {errors.password && <FormHelperText id="password-helper-text">{errors.password}</FormHelperText>}
        </FormControl>

        <FormControl className={classes.formControl} error={errors.password2} aria-describedby="password2-helper-text">
          <InputLabel htmlFor="password2-helper">Confirm your password</InputLabel>
          <Input id="password2" value={password2} type={"password"} onChange={this.handleChange} />
          {errors.password2 && <FormHelperText id="password2-helper-text">{errors.password2}</FormHelperText>}
        </FormControl>

        <Button variant="contained" color="secondary" id={"submit"} onClick={this.handleSubmit}>Create a new account</Button>
        <br/>
        <div>
          <Button variant="contained">Sign up with your Google account</Button>
        </div>
        <br/>
        <div>
          <a href="/login" style={underlineStyle}>Already signed up?</a>
        </div>
      </div>
    } else if(isSignedUp) {
      return <div style={ containerLayout }><h1>Account created</h1></div>
    }
  }
}

RegisterForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegisterForm);
