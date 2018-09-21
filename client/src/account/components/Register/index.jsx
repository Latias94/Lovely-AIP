import React, {Component} from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {registerUser} from "../../actions/authActions";
import {PropTypes} from "prop-types";
import {withRouter} from "react-router-dom";
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import KFAccountInput from '../KFAccountInput';

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
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      password: '',
      password2: '',
      errors: {},
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    // Store prevId in state so we can compare when props change.
    if (nextProps.errors) {
      return {
        errors: nextProps.errors,
      };
    }
  }

  handleChange = e => {
    this.setState({[e.target.id]: e.target.value});
  };

  handleSubmit = e => {
    e.preventDefault(); // prevent resetting the inputs
    const {name, email, password, password2} = this.state;
    const newUser = {
      name,
      email,
      password,
      password2
    };

    this.props.registerUser(newUser, this.props.history);
  };
  
  // TODO: !!!! validation action. State of error cannot be changed in the component.
  // TODO: move validation out, return errors not boolean.
// TODO: implement better validation approach
  render() {
    const {underlineStyle} = styles;
    const {email, name, password, password2, errors} = this.state;
    const {classes} = this.props;

    return <div className={classes.container}>
      <h1>Sign up</h1>

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

      <Button variant="contained" color="secondary" id={"submit"} onClick={this.handleSubmit}>Create a new
        account</Button>
      <br/>
      <div>
        <Button variant="contained">Sign up with your Google account</Button>
      </div>
      <br/>
      <div>
        <a href="/login" style={underlineStyle}>Already signed up?</a>
      </div>
    </div>
  }
}

RegisterForm.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { registerUser }),
)(withRouter(RegisterForm));
