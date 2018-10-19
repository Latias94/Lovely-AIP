import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { registerUser, clearErrors } from '../../common/actions/authActions';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
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
	},
	loginTitle: {
		fontSize: '42px',
		fontWeight: 'normal',
		color: '#424242',
		marginTop: '40px',
	},
	registerBtn: {
		marginTop: '20px',
		outline: 'none'
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

	componentWillUnmount() {
		this.props.clearErrors();
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		// Store prevId in state so we can compare when props change.
		if (nextProps.errors) {
			return {
				errors: nextProps.errors,
			};
		}
	}

	handleChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	};

	handleSubmit = e => {
		e.preventDefault(); // prevent resetting the inputs
		const { name, email, password, password2 } = this.state;
		const newUser = {
			name,
			email,
			password,
			password2
		};

		this.props.registerUser(newUser, this.props.history);
	};

	render() {
		const { underlineStyle } = styles;
		const { email, name, password, password2, errors } = this.state;
		const { classes } = this.props;

		return <div className={classes.container}>
			<h1 className={classes.loginTitle}> Sign up</h1>

			<KFAccountInput
				onChange={this.handleChange}
				className={classes.formControl}
				id={"email"}
				error={errors.email}
				name={"Email*"}
				type={"email"}
				value={email}
			/>

			<KFAccountInput
				onChange={this.handleChange}
				error={errors.name}
				className={classes.formControl}
				id={"name"}
				name={"Name*"}
				type={"text"}
				value={name}
			/>

			<KFAccountInput
				onChange={this.handleChange}
				error={errors.password}
				className={classes.formControl}
				id={"password"}
				name={"Password"}
				type={"password"}
				value={password}
				placeholder="6 - 30 characters"
			/>

			<KFAccountInput
				onChange={this.handleChange}
				error={errors.password2}
				className={classes.formControl}
				id={"password2"}
				name={"Confirm your password"}
				type={"password"}
				value={password2}

			/>

			<Button style={{ marginBottom: '20' }}
			        onClick={this.handleSubmit}
			        className={classes.registerBtn}
			        variant="contained"
			        color="secondary"
			        id={"submit"}
			>
				Create your new account
			</Button>
			<div>
				<a href="/login" style={{ underlineStyle }}>Already signed up?</a>
			</div>
		</div>
	}
}

RegisterForm.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
});

export default compose(
	withStyles(styles),
	connect(mapStateToProps, { registerUser, clearErrors }),
)(withRouter(RegisterForm));
