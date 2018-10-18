import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// Styles
const actionsStyles = theme => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing.unit * 2.5,
    },
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
});

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    root: {
        width: '95%',
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
    paper: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        top:'17%',
        left:'23%',
        width:'60%',
        height:'60%',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        minWidth: '90%',
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
        minWidth:200,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 100,
    },
    card: {
        minWidth: 275,
    },
    headerStyle: {
        backgroundColor:'#C5CAE9',
        color:'#1A237E',
        fontSize:16,
        textAlign:'Center',
    },
    headerLeft: {
        textAlign:'left',
        backgroundColor:'#C5CAE9',
        color:'#1A237E',
        fontSize:16,
    },

});

// Control of the table page
class TablePaginationActions extends React.Component {
    handleFirstPageButtonClick = event => {
        this.props.onChangePage(event, 0);
    };

    handleBackButtonClick = event => {
        this.props.onChangePage(event, this.props.page - 1);
    };

    handleNextButtonClick = event => {
        this.props.onChangePage(event, this.props.page + 1);
    };

    handleLastPageButtonClick = event => {
        this.props.onChangePage(
            event,
            Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
        );
    };

    render() {
        const { classes, count, page, rowsPerPage, theme } = this.props;

        return (
            <div className={classes.root}>
                <IconButton
                    onClick={this.handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="First Page"
                >
                    {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                </IconButton>
                <IconButton
                    onClick={this.handleBackButtonClick}
                    disabled={page === 0}
                    aria-label="Previous Page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                </IconButton>
                <IconButton
                    onClick={this.handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Next Page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </IconButton>
                <IconButton
                    onClick={this.handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Last Page"
                >
                    {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                </IconButton>
            </div>
        );
    }
}

TablePaginationActions.propTypes = {
    classes: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
    TablePaginationActions,
);

class BookManage extends React.Component {
    state = {
        rows: [{
            _id:0,
            title:"",
            authors:[{name:""}],
            isbn:0
        }],
        page: 0,
        newTitle: "",
        newAuthors: [""],
        newISBN: "",
        newDescription: "",
        newPublishDate: "",
        newCoverURL: "",
        newStock: 0,
        newPrice: 0,
        newCategory: "",
        newBookError:{},
        rowsPerPage: 15,
        open: false,
        deleteDialogOpen: false,
        expanded: null,
        selectedBookID: null,
        selectedBookTitle: ""
    };

    componentDidMount() {
        this.getAllBooks();
    }

    getAllBooks () {
            Axios.get('/books')
            .then(res => {
                this.setState({
                    rows: res.data
                })
            })
    }

    handleDeleteDialogOpen = (bookID, title) => {
        this.setState({ 
            deleteDialogOpen: true,
            selectedBookID: bookID,
        selectedBookTitle: title });
      };

    handleDeleteDialogClose = () => {
        this.setState({ deleteDialogOpen: false });
      };

    handleAddNewBookOpen = () => {
        if(process.env.NODE_ENV === 'production'){
            this.setState({
                newTitle: "",
                newAuthors: [""],
                newISBN: "",
                newDescription: "",
                newPublishDate: "",
                newCoverURL: "",
                newStock: 0,
                newPrice: 0,
                // TODO: Add a drop down for category
                // newCategory: "5b65103ac55fe361685262bf",
            })
        } else {
            // TEST
            this.setState({
                newISBN: "9780312426781",
                newStock: 1,
                newPrice: 1,
                newTitle: "YOU ARE IN DEBUG MODE",
                newAuthors: ["name"],
                newDescription: "New Description",
                newPublishDate: "7 21 2018"
            });
        }
        this.setState({ open: true });
    };

    handleAddNewBookClose = () => {
        this.setState({ open: false });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    handleCancelAddNewBook = () => {
        this.setState(state => ({
            open: !state.open,
        }));
    };

    addABook = () => {
        const { 
            newISBN: isbn, 
            newTitle: title, 
            newAuthors: authors,
            newDescription: description,
            // newCategory: category,
            newStock: stock,
            newPrice: price,
            newCoverURL: coverUrl,
            newPublishDate: publishDate } = this.state;

        Axios.post('/books', {
            title,
            authors,
            isbn,
            description,
            publishDate,
            coverUrl,
            stock,
            price,
            // category
          })
        .then(() => {
            this.setState(state => ({
                open: !state.open,
            }));
            // refresh
            this.getAllBooks();
            this.setState({newBookError:{}})
        })
        .catch(err => {
	        let errorBody = err.response.data;
	        if (errorBody.hasOwnProperty('bookexisted')) {
		        errorBody.isbn = 'This book is duplicate.';
	        }
            this.setState({newBookError: errorBody});
        })
    };

    confirmDelete () {
        Axios.delete('/books/'+ this.state.selectedBookID)
        .then(() => this.getAllBooks());
        this.handleDeleteDialogClose();
    }

    render() {
        const { classes } = this.props;
        const { rows, rowsPerPage, page, newBookError } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
        return (
            //add a new book
            <div style={{marginTop:'20px'}}>
                <Button
                    onClick={this.handleAddNewBookOpen}
                    className={classes.button}
                    color="primary"
                    style={{outline:'none'}}
                    variant="contained"
                >
                    <AddIcon />
                        New book
                </Button>
                <Modal
                    open={this.state.open}
                    onClose={this.handleAddNewBookClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >

                    <div className={classes.paper}>
                        <Typography variant="title" id="modal-title">
                            New book
                        </Typography>
                        <Typography variant="subheading" id="simple-modal-description">
                            <table style={{width:'100%'}}>
                                <tbody>
                                <tr>
                                    <td >
                                        <TextField
                                            id="BookTitle"
                                            label="Book Title"
                                            type="text"
                                            className={classes.textField}
                                            value={this.state.newTitle}
                                            onChange={e => this.setState({newTitle: e.target.value}) }
                                            required
                                            error={newBookError.hasOwnProperty('title')}
                                            helperText={newBookError.hasOwnProperty('title') ? newBookError.title : ""}
                                        />
                                    </td>
                                    <td>
                                        <TextField
                                            id="Author"
                                            label="Author"
                                            className={classes.textField}
                                            type="text"
                                            value={this.state.newAuthors}
                                            onChange={e => this.setState({newAuthors: [e.target.value]})}
                                            required
                                            error={newBookError.hasOwnProperty('authors')}
                                            helperText={newBookError.hasOwnProperty('authors') ? newBookError.authors : ""}
                                        />
                                    </td>
                                </tr>
                                {/* <tr>
                                    TODO: make a dropdown list for category
                                    <td>
                                        <TextField
                                            id="Category"
                                            label="Category"
                                            className={classes.textField}
                                            type="text"
                                            value={this.state.newCategory}
                                            onChange={e => this.setState({newCategory: e.target.value}) }
                                        />
                                    </td>
                                </tr> */}
                                <tr>
                                    <td>
                                        <TextField
                                            onChange={e => this.setState({newStock: e.target.value}) }
                                            error={newBookError.hasOwnProperty('stock')}
                                            helperText={newBookError.hasOwnProperty('stock') ? newBookError.stock : ""}
                                            value={this.state.newStock}
                                            className={classes.textField}
                                            id="Stock"
                                            label="In stock"
                                            type="text"
                                            required
                                        />
                                    </td>
                                    <td>
                                        <TextField
                                            onChange={e => this.setState({newISBN: e.target.value}) }
                                            error={newBookError.hasOwnProperty('isbn')}
                                            helperText={newBookError.hasOwnProperty('isbn') ? newBookError.isbn : ""}
                                            value={this.state.newISBN}
                                            className={classes.textField}
                                            id="ISBN"
                                            label="ISBN"
                                            type="ISBN"
                                            placeholder="13 digits"
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <TextField
                                            onChange={e => this.setState({newPrice: e.target.value}) }
                                            error={newBookError.hasOwnProperty('price')}
                                            helperText={newBookError.hasOwnProperty('price') ? newBookError.price : ""}
                                            value={this.state.newPrice}
                                            className={classes.textField}
                                            id="Price"
                                            label="Price"
                                            type="text"
                                            required
                                        />
                                    </td>
                                    <td>
                                        <TextField
                                            onChange={e => this.setState({newPublishDate: e.target.value}) }
                                            error={newBookError.hasOwnProperty('publishDate')}
                                            helperText={newBookError.hasOwnProperty('publishDate') ? newBookError.publishDate : ""}
                                            value={this.state.newPublishDate}
                                            className={classes.textField}
                                            id="PublishDate"
                                            label="PublishDate"
                                            placeholder="sample: 7 21 2018"
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                        <td>
                                        <TextField
                                            onChange={e => this.setState({newDescription: e.target.value}) }
                                            error={newBookError.hasOwnProperty('description')}
                                            helperText={newBookError.hasOwnProperty('description') ? newBookError.description : ""}
                                            value={this.state.newDescription}
                                            className={classes.textField}
                                            id="Description"
                                            label="Description"
                                            type="Description"
                                            placeholder="10 to 1000 characters"
                                            required

                                        />
                                        </td>
                                </tr>
                                </tbody>
                            </table >
                            <Button
                                    variant="contained"
                                    onClick={this.handleCancelAddNewBook}
                                    style={{margin:'2%', outline:'none'}}>
                                Cancel
                            </Button>
                            <Button variant="contained"
                                    color="primary"
                                    onClick={this.addABook}
                                    style={{outline:'none'}}>
                                Confirm
                            </Button>
                        </Typography>
                    </div>
                </Modal>
                <Dialog
                      open={this.state.deleteDialogOpen}
                      onClose={this.handleDeleteDialogClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                >
          <DialogTitle id="alert-dialog-title">{"Delete this book?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.state.selectedBookTitle}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.confirmDelete.bind(this)} color="primary" style={{outline:'none', color:'#D32F2F'}}>
              YES
            </Button>
            <Button onClick={this.handleDeleteDialogClose} style={{color:'#1976D2'}}>
              NO
            </Button>
          </DialogActions>
        </Dialog>
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.headerLeft}>Book Name</TableCell>
                                <TableCell className={classes.headerLeft}>Author</TableCell>
                                <TableCell className={classes.headerStyle} numeric>ISBN</TableCell>
                                <TableCell className={classes.headerStyle}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                return (
                                    <TableRow key={row._id}>
                                        <TableCell component="th" scope="row">
                                            {row.title}
                                        </TableCell>
                                        <TableCell >{row.authors.length > 0 ? row.authors[0].name : ""}</TableCell>
                                        <TableCell numeric>{row.isbn}</TableCell>
                                        <TableCell>
                                            {/*<Button variant="contained" color="secondary" className={classes.button}>*/}
                                                {/*Edit*/}
                                            {/*</Button>*/}
                                            <Button 
                                            variant="contained" 
                                            color="secondary"
                                            className={classes.button}
                                            style={{outline:'none'}}
                                            onClick={() => this.handleDeleteDialogOpen(row._id, row.title)}>
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 48 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    colSpan={3}
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={this.handleChangePage}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActionsWrapped}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </Paper>
            </div>
        );
    }
}

BookManage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BookManage);
