import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Modal from 'react-responsive-modal';
import AccountTab from './AccountTab'
import { Link } from 'react-router-dom';
import { styles as accountStyles } from '../../AccountStyles';
import { default as AvatarEditor } from "../Avatar";
import { connect } from 'react-redux';
import { compose } from "redux";
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
				src={props.avatar}
        className={classNames(classes.avatar, classes.bigAvatar)}
      />
    </div>
  );
}

function AccountInfo(props) {
	const { username, email } = props;
		return (
			<div>
				<p>Username: {username}</p>
				<p>Email: {email}</p>
			</div>);
}

class Account extends React.PureComponent {
		constructor(props) {
			super(props);
			this.state = {
				username: '',
				email: '',
				isLoggedIn: false,
				avatarPageOpened: false,
				// avatar: tempAvatar
			};
		}

// 		componentWillReceiveProps(nextProps, prevState) {
// 			this.setState({avatar: nextProps.avatar});
// }
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
						isLoggedIn: true,
					});
				}
			}))
			.catch((error) => {
			});
	}

  onOpenModal = () => {
    this.setState({ avatarPageOpened: true });
  };

  onCloseModal = () => {
    this.setState({ avatarPageOpened: false });
	};
	
	render() {
		// const {} = styles
		const { 
			isLoggedIn, 
			avatarPageOpened, 
			username, 
			email } = this.state;
console.log("temp pic to remove", tempAvatar)
		return <div style={accountStyles.container}>
		{/* THIS IS UGLY */}
		{isLoggedIn 
			? 
		(// WHY I HAVE TO SET THE STYLE AGAIN?
		<span style={accountStyles.container}>
				<div style={accountStyles.verticalCenter}>
					<ImageAvatars classes={this.props.classes} avatar={'http://localhost:5000/uploads/image-1535933860912.jpg'} />
					{/* TODO: MAKE IT AS A BANNER ABOVE THE AVATAR */}
					<button onClick={this.onOpenModal}>Change picture</button>
				</div>
				
        <Modal open={avatarPageOpened} onClose={this.onCloseModal} center>
          <AvatarEditor/>
        </Modal>
				
		<AccountInfo
			username={username}
			email={email}
			classes={this.props.classes}/>
			<AccountTab/></span>)
			:
			<Link to={'login'}>PLEASE LOG IN</Link>
		}
		</div>;
	}
}

ImageAvatars.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	avatar: state.avatarReducers.avatar
});

export default compose(
	withStyles(styles),
	connect(mapStateToProps),
)(Account);
