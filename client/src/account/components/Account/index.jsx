import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Modal from 'react-responsive-modal';
import AccountTab from './AccountTab'
import {Link} from 'react-router-dom';
import {styles as accountStyles} from '../../AccountStyles';
import {default as AvatarEditor} from "../Avatar";
import {connect} from 'react-redux';
import {compose} from "redux";
import {getCurrentUserInfo} from '../../actions/authActions';
import isEmpty from '../../validation/isEmpty'
import { config } from '../../../config';

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

function ImageAvatars(props) {
    const {classes, avatarURL, username} = props;
    return (
        <div className={classes.row}>
            <Avatar
                alt={username}
                src={avatarURL}
                className={classNames(classes.avatar, classes.bigAvatar)}
            />
        </div>
    );
}

function LetterAvatars(props) {
    const {classes, username} = props;
    const capital = username ? username.slice(0, 1) : '';
    return (
        <div className={classes.row}>
            <Avatar className={classNames(classes.avatar, classes.bigAvatar)}>{capital}</Avatar>
        </div>
    );
}

function AccountInfo(props) {
    const {username, email} = props;
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
            avatarPageOpened: false,
        };
    }

// 		componentWillReceiveProps(nextProps, prevState) {
// 			this.setState({avatar: nextProps.avatar});
// }
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

        return <div style={accountStyles.container}>
            {/* THIS IS UGLY */}
            {isLoggedIn
                ?
                (// WHY I HAVE TO SET THE STYLE AGAIN?
                    <span style={accountStyles.container}>
				<div style={accountStyles.verticalCenter}>
					{avatarType === 'letter' ? <LetterAvatars classes={classes} username={username}/> :
                        <ImageAvatars classes={classes} avatarURL={avatarURL}/>}
                    {/* TODO: MAKE IT AS A BANNER ABOVE THE AVATAR */}
                    <button onClick={this.onOpenModal}>Change picture</button>
				</div>
				
        <Modal open={avatarPageOpened} onClose={this.onCloseModal} center>
          <AvatarEditor avatarURL={{avatarURL}}/>
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

LetterAvatars.propTypes = {
    classes: PropTypes.object.isRequired,
    username: PropTypes.string
};

ImageAvatars.propTypes = {
    classes: PropTypes.object.isRequired,
    avatarURL: PropTypes.string.isRequired
};

const mapStateToProps = state => {
    // install user info
    if (!isEmpty(state.auth.user)) {
        const {username, email, avatar: avatarURL} = state.auth.user;
        // const {imgURL: avatarURL} = state.avatar;
        let props = {
            username,
            email,
            isLoggedIn: true
        };
        if (avatarURL) {
            props.avatarType = 'image';
            props.avatarURL = baseURL + avatarURL;
            console.log('mapStateToProps: avatar', props.avatarURL)
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
