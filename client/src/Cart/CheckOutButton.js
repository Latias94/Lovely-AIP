import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import swal from 'sweetalert2';
import axios from 'axios';


const styles = {
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

function onClickCheckOut() {
	axios.delete('/cart')
		.then(
			swal({
				position: 'top',
				type: 'success',
				title: 'Checked out!',
				showConfirmButton: false,
				timer: 1500,
			})
				.then(() => window.location.reload())
		);
}

function CheckOutButton(props) {
	const { classes } = props;
	return (
		<Card className={classes.card}>
			<CardContent>
				<Typography className={classes.title} component="h2" variant="headline">
					Total({props.number} Products):
				</Typography>
				<Typography variant="headline" component="h2">
					${props.totalPrice.toFixed(2)}
				</Typography>
			</CardContent>
			<CardActions>
				<Button variant="contained" color="primary" fullWidth onClick={onClickCheckOut}>CheckOut</Button>
			</CardActions>
		</Card>
	);
}

CheckOutButton.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckOutButton);
