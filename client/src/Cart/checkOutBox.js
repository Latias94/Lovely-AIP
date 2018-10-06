import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
	card: {
		// minWidth: 275,
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		marginBottom: 16,
	},
	pos: {
		marginBottom: 12,
	},
};

function SimpleCard(props) {
	const { classes } = props;
	return (
		<Card className={classes.card}>
			<CardContent>
				<Typography className={classes.title} component="h2" variant="headline">
                    Total({props.number}  Products):
				</Typography>
				<Typography variant="headline" component="h2">
					${props.totalPrice.toFixed(2)}
				</Typography>
			</CardContent>
			<CardActions>
				<Button variant="contained" color="primary" component={Link} to={'/payment'} fullWidth>CheckOut</Button>
			</CardActions>
		</Card>
	);
}

SimpleCard.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
