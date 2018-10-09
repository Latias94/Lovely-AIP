import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Rate } from 'antd';
import { Link } from 'react-router-dom';


const styles = {
	card: {
		maxWidth: 200,
		width: 200,
		height: 350,
	},
	media: {
		height: 0,
		paddingTop: '100%', // 1:1
		backgroundSize: 'contain',
	},
	bookTitle: {
		fontSize: '0.9rem',
		overflow: 'hidden',
		margin: '0px',
		textOverflow: 'ellipsis',
		display: '-webkit-box',
		WebkitLineClamp: '3',
		WebkitBoxOrient: 'vertical',
	},
};

function SimpleMediaCard(props) {
	const { classes } = props;
	return (
		<Link to={`/book/${props.bookid}`} key={props.bookid} style={{ marginLeft: '0px', marginRight: `${props.bookMarginRight - 1}px` }} replace>
			<Card className={classes.card}>
				<CardMedia
					className={classes.media}
					image={props.imagePath}
					title={props.bookTitle}
				/>
				<CardContent>
					<Typography gutterBottom variant="headline" component="span" className={classes.bookTitle}>
						{props.bookTitle}
					</Typography>
					<Typography component="span" noWrap={true} style={{ fontSize: '0.8rem', color: '#757575' }}>
						{props.bookAuthor}
					</Typography>
					<Rate disabled value={props.reviewScore} style={{ fontSize: '0.8rem' }} /><p style={{ display: 'inline' }}>{props.bookReviews}</p>
					<Typography component="span" noWrap={true}>
						{props.bookPrice ? `$${props.bookPrice}` : null}
					</Typography>
				</CardContent>

			</Card>
		</Link>


	);
}

SimpleMediaCard.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleMediaCard);
