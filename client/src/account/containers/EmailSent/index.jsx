import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { styles } from '../../common/AccountStyles';
import axios from 'axios';

/**
 * Email verification page
 * When the user click the activation link, the token will pass into this component.
 * VerifyEmail will transfer the token to the back-end for checking.
 * If success, the page will show a success message for 2s and direct to the login page.
 * If failed, the page will show a failure message and go to the home page.
 *
 * @author AnLuoRidge
 */

class EmailSent extends Component {
	// timer for resending the email
	state = {
		timer: ''
	};

	resendActivationEmail = () => {
		axios({
			method: 'post',
			url: '/users/active/',
			data: { email: sessionStorage.getItem('unactivatedEmail') }
		})
			.then(this.countDown)
			.catch(() => {
				alert('Fail to send email.');
			})
	};

	countDown = () => {
		this.setState({ timer: '(60s)' })
	};

	render() {
		const { container } = styles;

		return (
			<div style={container}>
				<h2>Thank you for signing up!</h2>
				<p>
					We have sent an email with an activation link to your email address. In order to complete the
					sign-up process, please click the activation link.
					If you didn't receive the activation email, click on the button below to resend it.
				</p>
				<div style={{ padding: '20px' }} onClick={jumpToUsersMailbox}>
					<Button variant="contained" color="secondary">Go to your mail box</Button>
				</div>
				<div onClick={this.resendActivationEmail}>
					<Button variant="contained">
						Resend the verification email {this.state.timer.toString()}</Button>
				</div>
			</div>
		);
	}
}

function jumpToUsersMailbox() {
	window.open('http://mail.google.com', '_blank');
}

export default EmailSent;