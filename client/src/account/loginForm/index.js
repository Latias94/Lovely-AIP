import React, { Component } from 'react';
import Redirect from "react-router-dom/es/Redirect";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import KFAccountInput from '../components/KFAccountInput';

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
  },
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
});

class LoginForm extends Component {

  // init state
  state = {
    isLoggedIn : false,
    email: '',
    password: '',
    errors: {}
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = e => {
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
      // console.log(response.data)
      if(response.status = 200) {
        this.setState({ isLoggedIn : true })
        axios.defaults.headers.common['Authorization'] = response.data.token;
        console.log(axios.defaults.headers.common['Authorization'])
      }
    }).catch(err => {
      this.setState({
        errors: err.response.data
      })
      // for (const property in error.response.data) {
        // if (error.response.data.hasOwnProperty(property)) {
          // alert(error.response.data[property]);
          // TODO: change the CSS of corresponding input box
          // console.log("property:",property);
          // console.log("value:",error.response.data[property]);
        // }
      // }
    });
  }

  render() {
    const { forgotPasswordStyle } = styles;
    const { isLoggedIn, email, password, errors } = this.state;
    const { classes } = this.props;

    // TODO: use conditional rendering
    if (!isLoggedIn) {
      return (
        <div className={classes.container}>
          <h1>Log in</h1>

          <KFAccountInput
            name={"Email"}
            className={classes.formControl}
                   error={errors.email}
                   id={"email"}
                   value={email}
                   type={"email"}
                   onChange={this.handleChange}
          />

          <br/>

          <KFAccountInput
            name={"Password"}
            className={classes.formControl}
            error={errors.password}
            id={"password"}
            value={password}
            type={"password"}
            onChange={this.handleChange}
          />

          <br/>
          <Button variant="contained" color="primary" onClick={this.handleSubmit}>Sign in</Button>
          <br/>
          <Button variant="contained">Log in with your Google account</Button>
          <br/>
          <a href="/retrieve-password" style={forgotPasswordStyle}>Forgot password?</a>
        </div>
      )
    } else if(this.state.isLoggedIn) {
      return <Redirect to='/home' />
    }
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginForm);
