import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import * as style from './categoriesPageCss';

const styles = {
	card: {
		maxWidth: 200,
		width: 200,
		height: 400,
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
		<div style={style.booksContainer}>
			<div style={style.breadcrumbTrail}>
				<ul className="booksClassList" style={style.insideUl}>
					<li>sdasd</li>
					<li>›</li>
					<li>asdasd</li>
				</ul>
			</div>
			<hr style={style.hrTag} />
			<div style={style.bookRow}>
				<Card className={classes.card}>
					<CardMedia
						className={classes.media}
						image="image/book01.jpg"
						title="Contemplative Reptile"
					/>
					<CardContent>
						<Typography gutterBottom variant="headline" component="span" noWrap={true} style={{ fontSize: '1.2rem', margin: '0' }}>
                            Name
						</Typography>
						<Typography component="span" noWrap={true}>
                            Author
						</Typography>
						<Typography component="span" noWrap={true}>
                            Rank
						</Typography>
						<Typography component="span" noWrap={true}>
                            Prize
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

			</div>
		</div>
	);
}

SimpleMediaCard.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleMediaCard);
