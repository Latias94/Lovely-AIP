import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Rate } from 'antd';
import KFStyles from '../KFStyles';
import BookListEditorModal from './BookListEditorModal';
import {compose} from "redux";
import {connect} from "react-redux";


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    tableHeader: {
        fontWeight: 'bold',
        fontSize: '15px',
    },
    container: KFStyles.container,
});

class BookList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            userID: "",
            bookListTitle: 'Book List',
            description: '',
            books: [],
            totalBooks: 0,
            bookListId: 0,
            openBookListEditorModal: false,
        };
        this.deleteBookList = this.deleteBookList.bind(this);
        this.updateBookList = this.updateBookList.bind(this);
        this.handleBookListEditorModalClose = this.handleBookListEditorModalClose.bind(this);
    }

    componentDidMount() {
        this.getBooksInBookList(this.props.match.params.slug);
    }

    getBooksInBookList(slug) {
        Axios.get(`/booklists/slug/${slug}`)
            .then((res) => {
                const {
                    title: bookListTitle,
                    books, description,
                    _id: bookListId,
                    user: userID
                } = res.data;

                this.setState({
                    bookListTitle,
                    books,
                    totalBooks: books.length,
                    description,
                    bookListId,
                    userID
                });
            })
            .catch(err => (console.log(err)));
    }

    deleteBookList(id) {
        if (window.confirm('Do you really want to delete it?') && id) {
            Axios.delete(`/booklists/${id}`)
                .then((res) => {
                    // window.open("/account", "Success!");
                    window.location.href = '/account'; // TODO: redirect without history
                    // this.props.history.location('/account')
                })
                .catch(err => console.log(err));
        }
    }

    updateBookList(title, description) {
        Axios.post(`/booklists/${this.state.bookListId}`, { title, description })
            .then((res) => {
                window.location.href = `/booklist/${res.data.slug}`;
            })
            .catch(err => console.log(err));
    }

    handleBookListEditorModalClose() {
        this.setState({ openBookListEditorModal: false });
    }

    render() {
        const {
            root, table, container,
        } = this.props.classes;
        const {
            bookListTitle, books, totalBooks, description, bookListId,
        } = this.state;
        // TODO: testing -> check title of the page under 0/1/2
        if (totalBooks > 1 || totalBooks === 0) {
            document.title = `${bookListTitle} (${totalBooks} books)`;
        } else if (totalBooks === 1) {
            document.title = `${bookListTitle} (${totalBooks} book)`;
        }
        if (this.state.bookListId) {
            return (
                <div className={container}>
                    <BookListEditorModal
                        title={bookListTitle}
                        description={description}
                        handleClose={this.handleBookListEditorModalClose}
                        openModal={this.state.openBookListEditorModal}
                        updateBookList={this.updateBookList}
                    />
                    <h1 style={{fontSize:'20px'}}>{bookListTitle}</h1>
                    <p style={{ fontSize: '14px', fontFamily: '"Lato", "Helvetica Neue", Helvetica, Arial, sans-serif' }}>{description}</p>
                    {(this.props.userID === this.state.userID || this.props.isAdmin ) && <div style={{ flexDirection: 'row' }}>
                        <Button
                            style={{ outline: 'none', width: '170px', backgroundColor:'#3D5AFE', color:'#fff', marginRight:'10px' }}
                            variant="contained"
                            href={'/'}
                        >
                            + A new book
                        </Button>
                        <Button
                            style={{ outline: 'none', width: '80px', marginRight:'10px' }}
                            variant="contained"
                            color="primary"
                            onClick={() => { this.setState({ openBookListEditorModal: true }); }}
                            title={'Edit the list title and description'}
                        >
                            Edit
                        </Button>
                        <Button
                            title={'Delete this book list'}
                            style={{ outline: 'none', width: '120px', marginRight:'10px', backgroundColor:'#D50000' }}
                            variant="contained"
                            onClick={() => { this.deleteBookList(bookListId) }}
                            color="primary"

                        >
                            Delete list
                        </Button>
                        <Button
                            title={'Thumbs Up'}
                            style={{ outline: 'none', width: '120px', marginRight:'10px', backgroundColor:'#EC407A' }}
                            variant="contained"
                            color="primary"

                        >
                            Like
                        </Button>
                    </div>}
                    {/*
            TODO: add sort func in table: https://material-ui.com/demos/tables/
            */}
                    <Paper className={root}>
                        <Table className={table} padding={'dense'}>
                            {/* <TableHead> */}
                            {/* <TableRow> */}
                            {/* <TableCell className={tableHeader}></TableCell> */}
                            {/* <TableCell className={tableHeader}>Book(s)</TableCell> */}
                            {/* /!*<TableCell className={tableHeader}>Author</TableCell>*!/ */}
                            {/* <TableCell className={tableHeader}>Review(s)</TableCell> */}
                            {/* /!*<TableCell className={tableHeader} numeric>Star</TableCell>*!/ */}
                            {/* </TableRow> */}
                            {/* </TableHead> */}
                            <thead></thead>
                            <tbody >
                                {books.length ? books.map(book => (
                                    <tr key={book._id} style={{height:'220px',borderBottom:'8px #E0E0E0  solid'}}>
                                        <td component="a" scope="row" href={`/book/${book._id}`} style={{width:'18%',paddingLeft:'20px'}}>
                                            <img src={book.coverUrl} alt={book.title} style={{ width: '120px' }} title=""/>
                                        </td>
                                        <td style={{width:'60'}}>
                                            <a href={`/book/${book._id}`} style={{fontSize:'18px'}}>{book.title}</a>
                                            <div>{`by ${book.authors[0].name}`}</div> {/* TODO: join authors' names */}
                                            <Rate disabled value={book.reviewStar} />
                                        </td>
                                        <td style={{width:'20%'}}>
                                            {book.reviewContent ? book.reviewContent : ''}
                                        </td>
                                    </tr>
                                )) : <tr>No books yet.</tr>}
                            </tbody>
                        </Table>
                    </Paper>
                </div>
            );
        }
        return null;
    }
}

BookList.propTypes = {
    classes: PropTypes.object.isRequired,
    userID: PropTypes.string
};

export default compose(
    withStyles(styles),
    connect(state => ({ userID: state.auth.user.id, isAdmin: state.auth.user.isStaff }))
)(BookList);
