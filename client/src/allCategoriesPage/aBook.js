import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
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
};

function SimpleMediaCard(props) {
	const { classes } = props;
	return (
		<Link to={`/book/${props.bookid}`} key={props.bookid} replace>
			<Card className={classes.card}>
				<CardMedia
					className={classes.media}
					image="http://localhost:3000/image/book01.jpg"
					title={props.bookTitle}
				/>
				<CardContent>
					<Typography gutterBottom variant="headline" component="span" style={{ fontSize: '0.9rem', margin: '0' }}>
						{props.bookTitle}
					</Typography>
					<Typography component="span" noWrap={true}>
						{props.bookAuthor}
					</Typography>
					<Rate disabled value={5} style={{ fontSize: '7px' }} /><p style={{ display: 'inline' }}>{props.bookReviews}</p>
					<Typography component="span" noWrap={true}>
						{props.bookPrice ? `${props.bookPrice}` : null}
					</Typography>
				</CardContent>
				{/* <CardActions>
						<Button size="small" color="primary">
            Share
						</Button>
						<Button size="small" color="primary">
            Learn More
						</Button>
					</CardActions> */}
			</Card>
		</Link>


	);
}

SimpleMediaCard.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleMediaCard);
