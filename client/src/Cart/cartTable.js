import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CartTableRow from './cartTableRow';

const styles = theme => ({
	root: {
		width: '100%',
		overflowX: 'auto',
	},
	table: {
		minWidth: 700,
	},
	header: {
		height: '30px',
	},
});

function cartTable(props) {
	const { classes } = props;

	return (
		<Paper className={classes.root}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow className={classes.header}>
						<TableCell style={{ width: '230px' }}> </TableCell>
						<TableCell> </TableCell>
						<TableCell numeric>Price</TableCell>
						<TableCell numeric>Quantity</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{props.cartBooks.length === 0 ? (
						<TableRow><TableCell><h3>Nothing Here</h3></TableCell></TableRow>) : (
						props.cartBooks.map(row => (
							<CartTableRow
								key={row._id}
								id={row.bookid}
								coverUrl={row.coverUrl}
								title={row.title}
								author={row.authors[0].name}
								price={row.price}
								number={row.quantity}
							/>
						))

					)}
				</TableBody>
			</Table>
		</Paper>

	);
}

cartTable.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(cartTable);
