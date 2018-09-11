import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Modal from 'react-responsive-modal';
import AccountTab from './AccountTab'
import {Link} from 'react-router-dom';
import {styles as accountStyles} from '../../AccountStyles';
import AvatarUploader from "../AvatarUploader";
import {connect} from 'react-redux';
import {compose} from "redux";
import {getCurrentUserInfo} from '../../actions/authActions';
import isEmpty from '../../validation/isEmpty'
import {config} from '../../../config';
import {ImageAvatar, LetterAvatar} from "../AvatarUploader/Avatars";
import './avatar-uploader.css';


const baseURL = (config.ENV === 'production') ? config.REL_UPLOAD_BASE_URL : config.DEV_UPLOAD_BASE_URL;
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

function AccountInfo(props) {
    const {username} = props;
    return (
        <div style={{'marginBottom':'15px'}}>
            <p style={{'fontSize':'24px','fontWeight':'bold'}}>{username}</p>
            {/*<p>Email: {email}</p>*/}
        </div>);
}

class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarPageOpened: false,
        };
    }

    componentDidMount() {
        this.props.getCurrentUserInfo();
    };

    onOpenModal = () => {
        this.setState({avatarPageOpened: true});
    };

    onCloseModal = () => {
        this.setState({avatarPageOpened: false});
    };

    render() {
        const { avatarPageOpened } = this.state;

        const {
            classes,
            avatarURL,
            isLoggedIn,
            username,
            email,
            avatarType
        } = this.props;

        const { container, verticalCenter } = accountStyles;

        return <div style={container}>
            {/* THIS IS UGLY */}
            {isLoggedIn
                ?
                (// WHY I HAVE TO SET THE STYLE AGAIN?
                    <span style={container}>
				<div style={verticalCenter}>
					{avatarType === 'letter' ? <LetterAvatar classes={classes} username={username}/> :
                        <ImageAvatar classes={classes} avatarURL={avatarURL} alt={username}/>}
                    {/* TODO: MAKE IT AS A BANNER ABOVE THE AVATAR */}
                    <button onClick={this.onOpenModal}>Change picture</button>
				</div>
				
        <Modal
            open={avatarPageOpened}
            onClose={this.onCloseModal}
            classNames={{ modal: 'avatar-modal' }}
        >
          <AvatarUploader handleCompletion={this.onCloseModal}/>
        </Modal>
				
		<AccountInfo
            username={username}
            email={email}
            classes={classes}/>
        <AccountTab/></span>)
                :
                <Link to={'login'}>PLEASE LOG IN</Link>
            }
        </div>;
    }
}

const mapStateToProps = state => {
    // install user info
    if (!isEmpty(state.auth.user)) {
        const {name: username, email, avatar: avatarURL} = state.auth.user;
        let props = {
            username,
            email,
            isLoggedIn: true
        };
        if (avatarURL) {
            props.avatarType = 'image';
            props.avatarURL = baseURL + avatarURL;
        } else {
            props.avatarType = 'letter';
        }
        return props;
    }
        return {isLoggedIn: false}
};

export default compose(
    withStyles(styles),
    connect(mapStateToProps, {getCurrentUserInfo}),
)(Account);
