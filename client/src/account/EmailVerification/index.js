import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { styles } from '../AccountStyles';

/**
 * Email verification page
 * @todo use Button property for onClick
 * @todo countDown()
 * @todo complete func sendActivationEmail()
 * @todo jumpToUsersMailbox() should support various mailbox
 */

class EmailVerification extends Component {

	sendActivationEmail = email => {
		alert("Sorry, this feature is under development.")
	};

	render() {
		const { container } = styles;

		return (
			<div style={container}>
				<h2>Thank you for signing up!</h2>
				<p> We have sent an email with an activation link to your email address. In order to complete the sign-up process, please click the activation link.
					If you didn't receive the activation email, click on the button below to resend it.</p>
				<div style={{ padding: '20px' }} onClick={jumpToUsersMailbox}><Button variant="contained" color="secondary" >Go to your mail box</Button></div>
				<div onClick={this.sendActivationEmail}><Button variant="contained">Resend the verification email {countDown()}</Button></div>
			</div>
		);
	}
}

function jumpToUsersMailbox() {
  window.open('http://mail.google.com', '_blank');
}

function countDown() {
  return '(60s)';
}

export default EmailVerification;