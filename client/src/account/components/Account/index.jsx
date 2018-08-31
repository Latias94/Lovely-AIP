import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
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
	if (props.isRetrieved) {
		return (
			<div>
				<ImageAvatars />
				{/*<div style={{*/}
					{/*display: 'flex', textAlign: 'center', width: '100px', height: '100px', backgroundColor: 'gray', color: 'white', borderRadius: '50px', margin: '70px',*/}
				{/*}}>Avatar</div>*/}
				<p>Username: {props.username}</p>
				<label>Email: {props.email}</label>
				<div>Favourite Books:</div>
				<div>...</div>
			</div>);
	}
	return <div>PLEASE LOG IN</div>;
}

class Account extends React.Component {
  state = {
    username: '',
    email: '',
    isRetrieved: false, // TODO: when it is true at first, the empty state cannot be transfer to the state in render stagef
  };

    componentDidMount() {
		// TODO: GET IT FROM TOKEN!!!
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
		// style is diff from classNames
		return <div style={styles.container}>
			<h1>ACCOUNT INFO</h1>
			<ShowAccountInfo isRetrieved={isRetrieved} username={username} email={email}/>
		</div>;
	}
}

export default Account;
// export default withStyles(styles)(AccountPage);
