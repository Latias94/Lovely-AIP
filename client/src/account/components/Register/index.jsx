import React, {Component} from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {registerUser} from "../../actions/authActions";
import {PropTypes} from "prop-types";
import {withRouter} from "react-router-dom";
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import KFAccountInput from '../KFAccountInput';
import axios from 'axios';
import Avatar from 'react-avatar-edit'


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

export const Preview = (props) => {
  return (props.dataURL === null ? <div></div> : <img src={props.dataURL} alt="Preview"/>);
};

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      password: '',
      password2: '',
      errors: {},
      preview: null,
      src: ''
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

    // if (this.validate(this.state)) {
    this.props.registerUser(newUser, this.props.history);
    // }
  };

  static dataURLtoFile(dataURL, filename) {
    var arr = dataURL.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      // remove the header of URL and covert to byte
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    // handle exceptions. convert <0 to >0 in ascii
    while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  }

  uploadHandler = () => {
    const previewInFile = RegisterForm.dataURLtoFile(this.state.preview, "avatar.png");
    const formData = new FormData();
    formData.append('image', previewInFile, previewInFile.name);
    axios({
      method: 'POST',
      data: formData,
      url: '/upload',
    }).then(res => console.log(res));
  };

  // TODO: !!!! validation action. State of error cannot be changed in the component.
  // TODO: move validation out, return errors not boolean.
// TODO: implement better validation approach
  onClose = () => {
    this.setState({preview: null})
  };

  onCrop = (preview) => {
    this.setState({preview})
  };

  render() {
    const {underlineStyle} = styles;
    const {email, name, password, password2, errors, preview} = this.state;
    const {classes} = this.props;

    // TODO: refactor to conditional rendering
    // if(!isSignedUp) {
    return <div className={classes.container}>
      <h1>Sign up</h1>

      <div>
        <Avatar
          width={390}
          height={295}
          onCrop={this.onCrop}
          onClose={this.onClose}
          src={this.state.src}
        />
        <Preview dataURL={preview}/>
        {/*{this.state.preview ? <img src={this.state.preview} alt="Preview"/> : <div></div>}*/}
      </div>

      {/*<input type="file" onChange={this.fileChangedHandler}/>*/}
      <Button onClick={this.uploadHandler}>Upload!</Button>

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
    // }
    // else if(isSignedUp) {
    //   return <div id={"success"} style={ containerLayout }><h1>Account created</h1></div>
    // }
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
  connect(mapStateToProps, {registerUser}),
)(withRouter(RegisterForm));
