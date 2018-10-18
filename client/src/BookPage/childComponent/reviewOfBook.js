import React from 'react';
import {
	Rate,
} from 'antd';
import styles from '../booksPageCss';
import { LetterAvatar, ImageAvatar } from '../../account/containers/AvatarUploader/Avatars';
import { UPLOAD_BASE_URL } from '../../config';

const uploadBaseURL = UPLOAD_BASE_URL;
const classes = {
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
const reviewOfBook = props => (
	<div>
		{
			props.views.length && (
				props.views.map(item => (
					<div style={styles.containerOfPersonalReview} key={item._id}>
						<div style={styles.viewPersonalInformation}>
							{item.avatar
								? <ImageAvatar
									classes={classes}
									avatarURL={`${uploadBaseURL}/${item.avatar}`}
									alt={item.username}/>
								: <LetterAvatar classes={classes} username={item.username}/>
							}
							<span style={{ marginLeft: '10px' }}>{item.username}</span>
						</div>
						<div style={styles.viewPersonalInformation}>
							<Rate disabled value={item.star}/>
						</div>
						<div style={styles.reviewContent}>
							<span>{new Date(item.createDate).toLocaleString()}</span>
							<p style={{ color: 'rebeccapurple' }}>
								[Verified Purchase]</p>
							<pre style={{ fontSize: '20px', whiteSpace: 'pre-wrap' }}>{item.content}</pre>
						</div>
					</div>
				)))
		}
	</div>
);

export default reviewOfBook;
