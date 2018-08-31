import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import green from '@material-ui/core/colors/green';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';



const styles = theme => ({
    buttonWrapper: {
        position: 'relative',
        marginBottom: theme.spacing.unit * 4,
    },
    anchor: {
        backgroundColor: green[500],
        width: 10,
        height: 10,
        borderRadius: '50%',
        position: 'absolute',
    },
    radioAnchor: {
        color: green[600],
        '&$checked': {
            color: green[500],
        },
    },
    checked: {},
    typography: {
        margin: theme.spacing.unit * 2,
    },
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    menu: {
        width: 200,
    },

});

const inlineStyles = {
    anchorVertical: {
        top: {
            top: -5,
        },
        center: {
            top: 'calc(50% - 5px)',
        },
        bottom: {
            bottom: -5,
        },
    },
    anchorHorizontal: {
        left: {
            left: -5,
        },
        center: {
            left: 'calc(50% - 5px)',
        },
        right: {
            right: -5,
        },
    },
};


let id = 0;
function createData(name, calories, fat, carbs, protein) {
    id += 1;
    return { id, name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function TableList(props) {
    const { classes } = props;

    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Dessert (100g serving)</TableCell>
                        <TableCell numeric>Calories</TableCell>
                        <TableCell numeric>Fat (g)</TableCell>
                        <TableCell numeric>Carbs (g)</TableCell>
                        <TableCell numeric>Protein (g)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => {
                        return (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell numeric>{row.calories}</TableCell>
                                <TableCell numeric>{row.fat}</TableCell>
                                <TableCell numeric>{row.carbs}</TableCell>
                                <TableCell numeric>{row.protein}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}

TableList.propTypes = {
    classes: PropTypes.object.isRequired,
};

class MyList extends React.Component {
    anchorEl = null;

    state = {
        open: false,
        anchorOriginVertical: 'center',
        anchorOriginHorizontal: 'center',
        transformOriginVertical: 'center',
        transformOriginHorizontal: 'center',
        positionTop: 200, // Just so the popover can be spotted more easily
        positionLeft: 400, // Same as above
    };


    handleClickButton = () => {
        this.setState(state => ({
            open: !state.open,
        }));
    };
    handleClose = () => {
        this.setState({
            open: false,
        });
    };

    render() {
        const { classes } = this.props;
        const {
            open,
            anchorOriginVertical,
            anchorOriginHorizontal,
            transformOriginVertical,
            transformOriginHorizontal,
            positionTop,
            positionLeft,
            anchorReference,
        } = this.state;


        return (
            <div>
                <Grid container justify="center" spacing={0}>
                    <Grid item className={classes.buttonWrapper}>
                        <Button
                            style={{outline:'none'}}
                            buttonRef={node => {
                                this.anchorEl = node;
                            }}
                            variant="contained"
                            onClick={this.handleClickButton}
                        >
                            + Add new Book list
                        </Button>
                        {anchorReference === 'anchorEl' && (
                            <div
                                className={classes.anchor}
                                style={{
                                    ...inlineStyles.anchorVertical[anchorOriginVertical],
                                    ...inlineStyles.anchorHorizontal[anchorOriginHorizontal],
                                }}
                            />
                        )}
                    </Grid>
                </Grid>
                <Popover
                    open={open}
                    anchorEl={this.anchorEl}
                    anchorReference={anchorReference}
                    anchorPosition={{ top: positionTop, left: positionLeft }}
                    onClose={this.handleClose}
                    anchorOrigin={{
                        vertical: anchorOriginVertical,
                        horizontal: anchorOriginHorizontal,
                    }}
                    transformOrigin={{
                        vertical: transformOriginVertical,
                        horizontal: transformOriginHorizontal,
                    }}
                >
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography variant="headline" component="h2">
                                Create a new booklist
                            </Typography>
                            <TextField
                                id="search"
                                label="Name"
                                type="Booklist"
                                className={classes.textField}
                                margin="normal"
                            />
                            <TextField
                                id="search"
                                label="Description"
                                type="Booklist"
                                className={classes.textField}
                                margin="normal"
                            />
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" onClick={this.handleClickButton}>Cancel</Button>
                            <Button variant="contained" color="primary" onClick={this.handleClickButton}>Confirm</Button>
                        </CardActions>
                    </Card>
                </Popover>
                <TableList/>
            </div>
        );
    }
}

MyList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyList);
