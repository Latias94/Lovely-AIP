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
import { createBookList } from './actions';


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
    descriptionMinLength = 8;

    state = {
        open: false,
        isDescriptionWrong: false,
        descriptionError: null
    };

    handleCancelButton = () => {
        // init error msg
        this.setState({
            isDescriptionWrong: false,
            descriptionError: null
        });

        this.handleClose();
    };

    handleClose = () => {
        this.setState({
            open: false,
        });
    };

    handleOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleConfirmButton = () => {
        const { description, title } = this;
        if (description.value.length > this.descriptionMinLength) {
            // post
            createBookList(title.value)(description.value);
            this.handleClose();
        } else {
            this.setState({
                isDescriptionWrong: true,
                descriptionError: 'Too short!'
            })
        }
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
                            onClick={this.handleOpen}
                        >
                            + New book list
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
                                                    id="BookListTitle"
                                                    label="Title"
                                                    multiline
                                                    className={classes.textField}
                                                    // TODO: how about using setState here?
                                                    inputRef={title => this.title = title}
                                                    required
                                                />
                                            </td>
                                            <td>
                                                <TextField
                                                    id="BookListDescription"
                                                    label={`Description (more than ${this.descriptionMinLength} letters)`}
                                                    className={classes.textField}
                                                    type="text"
                                                    inputRef={description => this.description = description}
                                                    error={this.state.isDescriptionWrong}
                                                    helperText={this.state.descriptionError}
                                                    required
                                                />
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table >
                                    <Button
                                        variant="contained"
                                        onClick={this.handleCancelButton}
                                        style={{margin:'2%'}}>
                                        Cancel
                                    </Button>
                                    <Button variant="contained"
                                            color="primary"
                                            onClick={this.handleConfirmButton}>
                                        Confirm
                                    </Button>
                                </Typography>
                            </div>
                        </Modal>
                    </Grid>
                </Grid>

                <div>
                    {
                        // uncomment this.props.bookLists && this.props.bookLists.map(
                        [
                            {
                                title: 'Book List 1',
                                updateTime: '2018-09-18'

                            },{
                            title: 'Book List 2',
                            updateTime: '2018-09-20'
                        }].map(
                            (bookList)=>{
                                return <Card className={classes.card}>
                                    <CardContent>
                                        <Typography variant="subheading" style={{display:'inline'}}>
                                            <a href={'/booklist'}>
                                                {bookList.title}
                                            </a>
                                        </Typography>
                                        <Typography variant="caption" gutterBottom style={{float:'right', lineHeight:'26px'}}>
                                            {bookList.updateTime}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            }
                        )
                    }
                </div>
            </div>
        );
    }
}

MyList.propTypes = {
    bookLists: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyList);
