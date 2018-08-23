import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { styles } from '../AccountStyles';

function jumpToUsersMailbox() {
	// route to new page by changing window.location
	window.open('http://mail.google.com', '_blank');
}

// TODO
function countDown() {
	return '(60s)';
}


export default class EmailVerification extends Component {

	sendActivationEmail = email => {
alert("Sorry, this feature is under development.")
		// TODO: api /active/
	};

	render() {
		const { container } = styles;

		return (
			<div style={container}>
				<h2>Thank you for signing up!</h2>
				<p> We have sent an email with an activation link to your email address. In order to complete the sign-up process, please click the activation link. If you didn't receive the activation email, click on the button below to resend it.</p>
				{/* TODO: button property for onClick
					TODO: Gmail for now */}
				<div style={{ padding: '20px' }} onClick={jumpToUsersMailbox}><Button variant="contained" color="secondary" >Go to your mail box</Button></div>
				{/* TODO: */}
				<div onClick={this.sendActivationEmail}><Button variant="contained">Resend the verification email{countDown()}</Button></div>
			</div>
		);
	}
}
