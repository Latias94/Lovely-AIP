import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';



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


class DeliveryInfo extends Component {
    state = {
        name: 'Jenny',
        Email: '',
        Phone: '04234234234',
        State: 'UNS',
        City: 'Sydney',
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
                                    id="name"
                                    label="Name"
                                    className={classes.textField}
                                    type="name"
                                    margin="normal"
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    id="Email"
                                    label="E-mail"
                                    className={classes.textField}
                                    type="E-mail"
                                    margin="normal"
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    id="Phone"
                                    label="Phone"
                                    className={classes.textField}
                                    type="Phone"
                                    margin="normal"
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">State</InputLabel>
                                    <Select
                                        value={this.state.state}
                                        onChange={this.handleChange}
                                        inputProps={{
                                            name: 'state',
                                            id: 'age-simple',
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={0}>Australian Capital Territory</MenuItem>
                                        <MenuItem value={1}>New South Wales</MenuItem>
                                        <MenuItem value={2}>Northern Territory</MenuItem>
                                        <MenuItem value={3}>Queensland</MenuItem>
                                        <MenuItem value={4}>South Australia</MenuItem>
                                        <MenuItem value={5}>Tasmania</MenuItem>
                                        <MenuItem value={6}>Victoria</MenuItem>
                                        <MenuItem value={7}>Western Australia</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell>
                                <TextField
                                    id="City"
                                    label="City"
                                    className={classes.textField}
                                    type="City"
                                    margin="normal"
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    id="PostCode"
                                    label="Post Code"
                                    className={classes.textField}
                                    type="postcode"
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

DeliveryInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DeliveryInfo);
