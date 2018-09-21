import Avatar from '@material-ui/core/Avatar/Avatar';
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Image avatar and letter avatar component.

/**
 *
 * @param props
 * @returns {*}
 * @constructor
 */
export function ImageAvatar(props) {
	const { classes, avatarURL, alt } = props;
	return (
		<div className={classes.row}>
			<Avatar
				alt={alt}
				src={avatarURL}
				className={classNames(classes.avatar, classes.bigAvatar)}
			/>
		</div>
	);
}

export function LetterAvatar(props) {
	const { classes, username } = props;
	const capital = username ? username.slice(0, 1).toUpperCase() : '';
	return (
		<div className={classes.row}>
			<Avatar className={classNames(classes.avatar, classes.bigAvatar)}>{capital}</Avatar>
		</div>
	);
}

LetterAvatar.propTypes = {
    classes: PropTypes.object.isRequired,
    username: PropTypes.string.isRequired
};

ImageAvatar.propTypes = {
    classes: PropTypes.object.isRequired,
    avatarURL: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
};
