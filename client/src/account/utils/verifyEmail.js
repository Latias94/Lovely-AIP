import React from 'react';
import axios from 'axios';
import {styles} from '../AccountStyles'

/**
 * @test token = '2@test.com0c4628a8ae46efe765bcae01d370461457a5c73d';
 */
class VerifyEmail extends React.Component {
  state = {
    status: ''
  };

  verify = token => {
    axios.get('/users/active/' + token)
      .then(() => {
        this.setState({status: "You have been successfully activated!"});
        // back to login page
        window.setTimeout(
          () => {window.open('/login', '_self')},
          1000);
      })
      .catch(() => {
        this.setState({status: 'Oops! Your activation link is invalid.'});
        // back to home page
        window.setTimeout(() => {
          window.open('/', '_self')},
          3000);
      });
  };

  componentDidMount() {
    const token = this.props.match.params.token;
    this.verify(token);
  }

  render() {
    const {emailVerificationHint: hint, container} = styles;

    return (
    <div style={container}>
      <p style={hint}>
        {this.state.status}
      </p>
    </div>
    )
  }
}

export default VerifyEmail;
