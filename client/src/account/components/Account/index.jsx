import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AccountTab from './AccountTab'
import { Link } from 'react-router-dom';
import { styles } from '../../AccountStyles';
// temp
import tempAvatar from "../../../Img/uxceo-128.jpg";

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};

function ImageAvatars() {
  const classes = {
    row: {
      display: 'flex',
      justifyContent: 'center',
    },
    avatar: {
      margin: 10,
    },
    bigAvatar: {
      width: 60,
      height: 60,
    },
  };
  // const classes = styles;
  // const { classes } = props;
  return (
    <div className={classes.row}>
      {/*<Avatar alt="Remy Sharp" src="/static/images/remy.jpg" className={classes.avatar} />*/}
      <Avatar
        alt="Adelle Charles"
				src={tempAvatar}
				// src={"https://i.imgur.com/20NRc7Y.jpg"}
        // src="../../../public/avatars/uxceo-128.jpg"
        className={classNames(classes.avatar, classes.bigAvatar)}
      />
    </div>
  );
}

ImageAvatars.propTypes = {
  classes: PropTypes.object.isRequired,
};

function ShowAccountInfo(props) {
	const { isRetrieved, username, email } = props;
	if (isRetrieved) {
		return (
			<div>
				<div style={styles.verticalCenter}>
					<ImageAvatars />
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
  state = {
    username: '',
    email: '',
    isRetrieved: false, // TODO: when it is true at first, the empty state cannot be transfer to the state in render stage
  };

    componentDidMount() {
		// TODO: GET basic info FROM TOKEN and other from certain API
		const URL = '/users/current';
		axios.get(URL, {})
			.then(((response) => {
				if (response.status === 200) {
					console.log(response.data);

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

		return <div style={styles.container}>
			<h1>ACCOUNT INFO</h1>
			<ShowAccountInfo
			isRetrieved={isRetrieved}
			username={username}
			email={email}/>
			<ShowAccountInfo isRetrieved={isRetrieved} username={username} email={email}/>
			<AccountTab/>
		</div>;
	}
}

export default Account;
// export default withStyles(styles)(AccountPage);
