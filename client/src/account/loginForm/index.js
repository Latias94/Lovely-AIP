import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import KFAccountInput from '../components/KFAccountInput';
import { loginUser } from '../actions/authActions';
import { connect } from 'react-redux';
import { compose } from "redux";

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
    // isLoggedIn : false,
    email: '',
    password: '',
    errors: {}
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  // TODO: how to use this in getDerivedStateFromProps
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.auth.isAuthenticated) {
  //     props.history.push('/welcome');
  //   }

  //   if (nextProps.errors) {
  //     return{ errors: nextProps.errors };
  //   }
  // }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const userData = {
			email: this.state.email,
			password: this.state.password,
		}
    this.props.loginUser(userData);
  }

  render() {
    const { forgotPasswordStyle } = styles;
    const { email, password, errors } = this.state;
    const { classes } = this.props;

    // TODO: use conditional rendering
    // if (!isLoggedIn) {
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
    // } else if(this.state.isLoggedIn) {
      // return <Redirect to='/home' />
    // }
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { loginUser }),
)(LoginForm);
