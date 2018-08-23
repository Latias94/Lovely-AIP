import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { styles } from '../AccountStyles';
import axios from 'axios';

/**
 * Email verification page
 * @todo use Button property for onClick
 * @todo countDown()
 * @todo jumpToUsersMailbox() should support various mailbox
 */

class EmailVerification extends Component {
	state = {
		timer: ''
	};

	resendActivationEmail = () => {
		axios({
			method: 'post',
			url: '/users/active/',
			data: {email: sessionStorage.getItem('unactivatedEmail')}
		})
			.then(this.countDown)
			.catch(() => {
        alert('Fail to send email.');
			})
	};

  countDown = () => {
		this.setState({timer:'(60s)'})
  };

	render() {
		const { container } = styles;

		return (
			<div style={container}>
				<h2>Thank you for signing up!</h2>
				<p> We have sent an email with an activation link to your email address. In order to complete the sign-up process, please click the activation link.
					If you didn't receive the activation email, click on the button below to resend it.</p>
				<div style={{ padding: '20px' }} onClick={jumpToUsersMailbox}><Button variant="contained" color="secondary" >Go to your mail box</Button></div>
				<div onClick={this.resendActivationEmail}><Button variant="contained">Resend the verification email {this.state.timer.toString()}</Button></div>
			</div>
		);
	}
}

function jumpToUsersMailbox() {
  window.open('http://mail.google.com', '_blank');
}

export default EmailVerification;