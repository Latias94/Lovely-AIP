import React from 'react';
import axios from 'axios';
import { styles } from '../../common/AccountStyles'

class EmailVerification extends React.Component {
	state = {
		status: ''
	};

	verify = token => {
		axios.get('/users/active/' + token)
			.then(() => {
				this.setState({ status: "You have been successfully activated!" });
				// back to login page
				setTimeout(
					() => {
						window.location = '/login'
					},
					1000);
			})
			.catch(() => {
				this.setState({ status: 'Oops! Your activation link is invalid.' });
				// back to home page
				setTimeout(() => {
						window.location = '/login'
					},
					3000);
			});
	};

	componentDidMount() {
		const token = this.props.match.params.token;
		this.verify(token);
	}

	render() {
		const { emailVerificationHint: hint, container } = styles;

		return (
			<div style={container}>
				<p style={hint}>
					{this.state.status}
				</p>
			</div>
		)
	}
}

export default EmailVerification;
