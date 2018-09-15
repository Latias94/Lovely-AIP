import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import green from '@material-ui/core/colors/green';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';


const styles = theme => ({
    buttonWrapper: {
        position: 'relative',
        marginBottom: theme.spacing.unit * 4,
    },

    checked: {},
    typography: {
        margin: theme.spacing.unit * 2,
    },
    card: {
        minWidth: 275,
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
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },

});


class MyList extends React.Component {


    handleClickButton = () => {
        this.setState(state => ({
            open: !state.open,
        }));
    };
    state = {
        open: false,
    };



    render() {
        const { classes } = this.props;



        return (
            <div>
                <Grid container justify="center" spacing={0}>
                    <Grid item className={classes.buttonWrapper} style={{paddingTop:'20px'}}>
                        <Button
                            style={{outline:'none'}}
                            variant="contained"
                            onClick={this.handleClickButton}
                        >
                            + Add new a Book list
                        </Button>
                        <Modal
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            open={this.state.open}
                            onClose={this.handleClose}
                        >
                            <div className={classes.paper} style={{top:'30%', left:'30%', width:'44%', height:'24%'}}>
                                <Typography variant="title" id="modal-title">
                                    Create a new book list
                                </Typography>
                                <Typography variant="subheading" id="simple-modal-description">
                                    <table style={{width:'100%'}}>
                                        <thead></thead>
                                        <tbody>
                                        <tr>
                                            <td>
                                                <TextField
                                                    id="BooklistTitle"
                                                    label="Title"
                                                    multiline
                                                    className={classes.textField}
                                                />
                                            </td>
                                            <td>
                                                <TextField
                                                    id="BooklistDescription"
                                                    label="Description"
                                                    className={classes.textField}
                                                    type="text"
                                                />
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table >
                                    <Button
                                        variant="contained"
                                        onClick={this.handleClickButton}
                                        style={{margin:'2%'}}
                                    >Cancel</Button>
                                    <Button variant="contained" color="primary" onClick={this.handleClickButton}>Confirm</Button>
                                </Typography>
                            </div>
                        </Modal>
                    </Grid>
                </Grid>

                <div>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography variant="subheading" style={{display:'inline'}}>
                                <a href={'/booklist'}>
                                    BookList Title
                                </a>
                            </Typography>
                            <Typography variant="caption" gutterBottom style={{float:'right', lineHeight:'26px'}}>
                                Update time
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }
}

MyList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyList);
