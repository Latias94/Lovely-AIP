import React, { Component } from 'react';
import { connect } from "react-redux";
import { registerUser } from "../actions/authAction";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import KFAccountInput from '../components/KFAccountInput'

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
    // isSignedUp: false,
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };


  handleSubmit = e => {
    e.preventDefault(); // prevent resetting the inputs
    const { name, email, password } = this.state
    const newUser = {
      name,
      email,
      password
    };

    if (this.validate(this.state)) {
      this.props.registerUser(newUser, this.props.history);
    }
  };

  // TODO: move validation out, return errors not boolean.
// TODO: implement better validation approach

  validate = (props) => {
    const { email, name, password, password2 } = props
    if(email.length === 0) {
      this.setState({
        errors: {
          email: 'Please fill in your email.'
        }});
      return false
    } else if(name.length === 0) {
      this.setState({
        errors: {
          name: 'Please fill in your name.'
        }});
      return false
    } else if (name.length < 2 || name.length > 30) {
      this.setState({
        errors: {
          name: 'Name must be between 2 and 30 characters.'
        }});
      return false
    } else if(password.length === 0) {
      this.setState({
        errors: {
          password: 'The password is required.'
        }});
      return false
    } else if(password.length < 6) {
      this.setState({
        errors: {
          password: 'Password must be at least 6 character.'
        }});
      return false
    } else if(password2.length === 0) {
      this.setState({
        errors: {
          password2: 'Please type your password again.'
        }});
      return false
    } else if(password !== password2) {
      this.setState({
        errors: {
          password: 'The two passwords don\'t match.'
        }});
      return false
    } else {
      return true
    }
  };

  render() {
    const { containerLayout, underlineStyle } = styles;
    const { email, name, password, password2, errors } = this.state;
    const { classes } = this.props;

    // TODO: refactor to conditional rendering
    // if(!isSignedUp) {
      return <div className={classes.container}>
        <h1>Sign up</h1>
        <div className={"Avatar"}>Avatar</div>

        <KFAccountInput
          name={"Email*"}
          className={classes.formControl}
          error={errors.email}
          id={"email"}
          value={email}
          type={"email"}
          onChange={this.handleChange}
        />

        <KFAccountInput
          name={"Name*"}
          className={classes.formControl}
          error={errors.name}
          id={"name"}
          value={name}
          type={"text"}
          onChange={this.handleChange}
        />

        <KFAccountInput
          name={"Password"}
          className={classes.formControl}
          error={errors.password}
          id={"password"}
          value={password}
          type={"password"}
          onChange={this.handleChange}
        />

        <KFAccountInput
          name={"Confirm your password"}
          className={classes.formControl}
          error={errors.password2}
          id={"password2"}
          value={password2}
          type={"password"}
          onChange={this.handleChange}
        />

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
    // }
    // else if(isSignedUp) {
    //   return <div id={"success"} style={ containerLayout }><h1>Account created</h1></div>
    // }
  }
}

RegisterForm.propTypes = {
  registerUser: PropsTypes.func.isRequired,
  auth: PropsTypes.object.isRequired,
  errors: PropsTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default withStyles(styles)(RegisterForm);
export default connect(mapStateToProps, { registerUser })(withRouter(RegisterForm));
