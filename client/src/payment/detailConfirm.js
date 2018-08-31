import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
    root: {
        width: '80%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

let id = 0;
function createData(BookName, Price, Amount, Cost ) {
    id += 1;
    return { id, BookName, Price,Amount, Cost};
}

const rows = [
    createData('Big Data', 32.1, 2, 64.2),
    createData('Data Visulation', 29.1, 1, 29.1),
    createData('Internet Programming', 10, 3, 30),
];


class DetailConfirm extends Component{
    render(){
        const { classes } = this.props;
        return(
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Book Name</TableCell>
                            <TableCell numeric>Price(AU$)</TableCell>
                            <TableCell numeric>Amount</TableCell>
                            <TableCell numeric>Cost</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => {
                            return (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.BookName}
                                    </TableCell>
                                    <TableCell numeric>{row.Price}</TableCell>
                                    <TableCell numeric>{row.Amount}</TableCell>
                                    <TableCell numeric>{row.Cost}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
        );

    }

}

DetailConfirm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DetailConfirm);