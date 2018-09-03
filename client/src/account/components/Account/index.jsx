import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AccountTab from './AccountTab'
import { Link } from 'react-router-dom';
import { styles as accountStyles } from '../../AccountStyles';
// temp
import tempAvatar from "../../../Img/uxceo-128.jpg";

const styles = {
	row: {
		display: 'flex',
		justifyContent: 'center',
	},
	avatar: {
		margin: 10,
	},
	bigAvatar: {
		width: 160,
		height: 160,
	},
};

function ImageAvatars(props) {
  const { classes } = props;
  return (
    <div className={classes.row}>
      <Avatar
        alt="Adelle Charles"
				src={tempAvatar}
        className={classNames(classes.avatar, classes.bigAvatar)}
      />
    </div>
  );
}

function ShowAccountInfo(props) {
	const { isRetrieved, username, email, classes } = props;
	if (isRetrieved) {
		return (
			<div>
				<div style={accountStyles.verticalCenter}>
					<ImageAvatars classes={classes}/>
					<Link to={'/avatar'}>Change picture</Link>
				</div>
				<br/><br/>
				<p>Username: {username}</p>
				<p>Email: {email}</p>
			</div>);
	}
	return <div>PLEASE LOG IN</div>;
}

class Account extends React.PureComponent {
		constructor(props) {
			super(props);
			this.state = {
				username: '',
				email: '',
				isRetrieved: false, // TODO: when it is true at first, the empty state cannot be transfer to the state in render stage
			};
		}

    componentDidMount() {
		// TODO: GET basic info FROM TOKEN and other from certain API
		const URL = '/users/current';
		axios.get(URL, {})
			.then(((response) => {
				if (response.status === 200) {
					const { name: username, email } = response.data;
					this.setState({
						username,
						email,
						isRetrieved: true,
					});
				}
			}))
			.catch((error) => {
			});
	}

	render() {
		// const {} = styles
		const { isRetrieved, username, email } = this.state;

		return <div style={accountStyles.container}>
			<ShowAccountInfo
			isRetrieved={isRetrieved}
			username={username}
			email={email}
			classes={this.props.classes}/>
			<AccountTab/>
		</div>;
	}
}

ImageAvatars.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Account);
