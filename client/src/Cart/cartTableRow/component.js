import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const rowComponent = props => (
	<TableRow>
		<TableCell component="th" scope="row">
			<CardMedia image={props.coverUrl} style={{
				width: '100px', height: '100px', paddingTop: '100%', backgroundSize: 'contain',
			}}/>
		</TableCell>
		<TableCell style={{ width: '800px' }}>
			<CardContent>
				<Typography variant="headline">{props.title}</Typography>
				<Typography variant="subheading" color="textSecondary">
					{props.author}
				</Typography>
				<Button color='secondary' size='small' style={{ padding: 0 }}
				        onClick={() => props.deleteRow(props.id)}>delete</Button>
			</CardContent>
		</TableCell>
		<TableCell numeric>${props.price}</TableCell>
		<TableCell numeric>
			<TextField
				id="number"
				value={props.number}
				onChange={event => props.handleChange(event.target.value)}
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

export default (rowComponent);
