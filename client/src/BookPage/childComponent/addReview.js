import React from 'react';
import {
	Rate,
} from 'antd';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';


const reviewOfBook = props => (

	<div>
		<h3>Your review</h3>
		<span style={{
			fontSize: '20px', fontWeight: '400', color: 'black', marginRight: '10px',
		}}>Rate:</span>
		<Rate
			onChange={value => props.reviewStarChange(value)}
			value={props.submittedReviewStar}
			style={{ marginTop: '5px' }} isRequired/>
		<h5 style={{ margin: '0' }}>Content:</h5>
		<div style={{
			width: '90%', marginLeft: '5%',
		}}>
			<TextField
				placeholder=" Please rate first."
				onChange={event => props.reviewContentChange(event.target.value)}
				multiline
				fullWidth
				rows='4'
				style={{ backgroundColor: '#EEEEEE', marginTop: '5px', marginBottom: '12px' }}
				value={props.submittedReviewContent}
			/>
		</div>
		{!props.authOrNot ? (
			<Button
				size="medium"
				variant="contained"
				color="default"
				component={Link}
				to='/login'
				style={{ backgroundColor: 'gray', color: 'white' }}
			>
				Review
			</Button>
		) : (
			<Button
				size="medium"
				variant="contained"
				color="default"
				onClick={props.submitClick}
				style={{ backgroundColor: 'gray', color: 'white' }}
			>
				Review
			</Button>
		)}
	</div>
);

export default reviewOfBook;
