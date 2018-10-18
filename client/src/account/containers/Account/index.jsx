import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from 'react-responsive-modal';
import AccountTab from './AccountTab'
import { styles as accountStyles } from '../../common/AccountStyles';
import AvatarUploader from "../AvatarUploader";
import { connect } from 'react-redux';
import { compose } from "redux";
import { getCurrentUserInfo } from '../../common/actions/authActions';
import isEmpty from '../../common/utils/isEmpty'
import { UPLOAD_BASE_URL } from '../../../config';
import { ImageAvatar, LetterAvatar } from "../AvatarUploader/Avatars";
import './avatar-uploader.css';
import { getCurrentUserBookLists } from './actions';
import Button from '@material-ui/core/Button';


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
		backgroundColor: '#E0E0E0',
	},
	avatarModal: {
		marginTop: '150px',
	},
	usernameStyle: {
		fontSize: '24px',
		fontWeight: 'bold',
	}
};

function AccountInfo(props) {
	const { username, usernameStyle } = props;
	return (
		<div style={{ 'marginBottom': '15px' }}>
			<p className={usernameStyle}>{username}</p>
		</div>);
}

class Account extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			avatarPageOpened: false,
			bookLists: null
		};
	}

	componentDidMount() {
		this.props.getCurrentUserInfo();
		this.props.getCurrentUserBookLists();
	};

	onOpenModal = () => {
		this.setState({ avatarPageOpened: true });
	};

	onCloseModal = () => {
		this.setState({ avatarPageOpened: false });
	};

	render() {
		const { avatarPageOpened } = this.state;
		const { container, verticalCenter } = accountStyles;

		const {
			classes,
			avatarURL,
			username,
			avatarType
		} = this.props;

		return <div style={container}>
                    <span style={container}>
				<div style={verticalCenter}>
                    <div>
					{avatarType === 'letter' ? <LetterAvatar classes={classes} username={username}/> :
						<ImageAvatar
							classes={classes}
							avatarURL={avatarURL}
							alt={username}
						/>}
                    </div>
                    <div>
                         <Button
	                         onClick={this.onOpenModal}
	                         variant="outlined"
	                         size="medium"
	                         color="primary"
                         >
                             change
                        </Button>
                    </div>
				</div>
				
		<AccountInfo username={username}/>
        <AccountTab/></span>

			{/*Avatar uploader*/}
			<Modal
				open={avatarPageOpened}
				onClose={this.onCloseModal}
				className={classes.avatarModal}
			>
				<AvatarUploader handleCompletion={this.onCloseModal}/>
			</Modal>
		</div>;
	}
}

const mapStateToProps = state => {
	// Map user info
	if (!isEmpty(state.auth.user)) {
		const { id: userId, name: username, email, avatar: avatarURL } = state.auth.user;
		let props = {
			userId,
			username,
			email,
		};
		if (avatarURL) {
			props.avatarType = 'image';
			props.avatarURL = UPLOAD_BASE_URL + '/' + avatarURL;
		} else {
			props.avatarType = 'letter';
		}
		return props;
	}
	return {}
};

export default compose(
	withStyles(styles),
	connect(mapStateToProps, { getCurrentUserInfo, getCurrentUserBookLists }),
)(Account);
