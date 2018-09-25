import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    table: {
        minWidth: 700,
    },
    menu: {
        width: 200,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },

});


class PaymentSelect extends Component {
    state = {
        holdername: ' ',
        cardno: '',
        expireDate: ' ',
        CVV: ' ',
    };
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };


    render() {
        const { classes } = this.props;
        return (
            <form className="paymentChoose">
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TextField
                                    id="holdername"
                                    label="Holder Name"
                                    className={classes.textField}
                                    type="holdername"
                                    margin="normal"
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    id="cardno"
                                    label="Card No."
                                    className={classes.textField}
                                    type="cardno"
                                    margin="normal"
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <form className={classes.container} noValidate>
                                    <TextField
                                        id="date"
                                        label="Expire Date"
                                        type="month"
                                        defaultValue=" "
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </form>
                            </TableCell>
                            <TableCell>
                                <TextField
                                    id="CVV"
                                    label="CVV"
                                    className={classes.textField}
                                    type="CVV"
                                    margin="normal"
                                />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </form>
        );
    }
}

PaymentSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaymentSelect);
