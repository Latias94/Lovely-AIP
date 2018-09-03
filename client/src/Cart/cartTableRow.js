import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';

class cartTableRow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			number: this.props.number,
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		if (event >= 1) {
			this.setState({
				number: event,
			});
		}
	}

	render() {
		return (
			<TableRow>
				<TableCell component="th" scope="row">
					<CardMedia image={this.props.coverUrl} style={{
						width: '100px', height: '100px', paddingTop: '100%', backgroundSize: 'contain',
					}}/>
				</TableCell>
				<TableCell style={{ width: '800px' }}>
					<CardContent>
						<Typography variant="headline">{this.props.title}</Typography>
						<Typography variant="subheading" color="textSecondary">
							{this.props.author}
						</Typography>
					</CardContent>
				</TableCell>
				<TableCell numeric>${this.props.price}</TableCell>
				<TableCell numeric>
					<TextField
						id="number"
						value={this.state.number}
						onChange={event => this.handleChange(event.target.value)}
						type="number"
						InputLabelProps={{
							shrink: true,
						}}
						margin="normal"
						style={{ marginTop: '0px', width: '100px' }}
					/>
				</TableCell>
			</TableRow>
		);
	}
}

export default cartTableRow;
