import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import KFStyles from '../KFStyles';
import { Rate } from "antd";
import BookListEditorModal from './BookListEditorModal';

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
        fontWeight:'bold',
        fontSize:'15px'
    },
    container: KFStyles.container
});

class BookListDetail extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            bookListTitle:'Book List',
            description: '',
            books: [],
            totalBooks: 0,
            bookListId:0,
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
                _id: bookListId } = res.data;

            this.setState({
                bookListTitle,
                books,
                totalBooks: books.length,
                description,
                bookListId
            });
        })
        .catch((err) => (console.log(err)))
    }

    deleteBookList(id) {
        console.log('id', id)
        if (window.confirm("Do you really want to delete it?") && id) {
            Axios.delete('/booklists/'+id)
                .then(res => {
                    // window.open("/account", "Success!");
                    window.location.href = '/account'; // TODO: redirect without history
                    // this.props.history.location('/account')
                })
                .catch(err => console.log(err))
        }
    }

    updateBookList(title, description) {
        Axios.post('/booklists/'+this.state.bookListId, {title, description})
            .then(res => {
                console.log(res);
                window.location.href = '/booklist/' + res.data.slug;
                // window.open("/account", "Success!");
                // window.location.href = '/account'; // TODO: redirect without history
                // this.props.history.location('/account')
            })
            .catch(err => console.log(err))
    }

    handleBookListEditorModalClose() {
        this.setState({ openBookListEditorModal: false });
    }

    render() {
    const { root, table, tableHeader, container } = this.props.classes;
    const { bookListTitle, books, totalBooks, description, bookListId } = this.state;
// TODO: testing -> check title of the page under 0/1/2
    if (totalBooks > 1 || totalBooks === 0) {
        document.title = `${bookListTitle} (${totalBooks} books)`;
    } else if (totalBooks === 1) {
        document.title = `${bookListTitle} (${totalBooks} book)`
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
            <h1>{bookListTitle}</h1>
            <p style={{fontSize: '14px', fontFamily: '"Lato", "Helvetica Neue", Helvetica, Arial, sans-serif'}}>{description}</p>
            <div style={{flexDirection: 'row'}}>
            <Button
                style={{outline:'none', width:'170px'}}
                variant="contained"
                href={'/'}
            >
                + A new book
            </Button>
            <Button
                style={{outline:'none', width:'170px'}}
                variant="contained"
                onClick={() => {this.setState({ openBookListEditorModal: true })}}
                title={'Edit the list title and description'}
            >
                Edit
            </Button>
            <Button
                title={'Delete this book list'}
                style={{outline:'none', width:'170px'}}
                variant="contained"
                onClick={() => {this.deleteBookList(bookListId)}}
            >
                Delete list
            </Button>
            </div>
            {/*
            TODO: add sort func in table: https://material-ui.com/demos/tables/
            */}
        <Paper className={root}>
            <Table className={table} padding={'dense'}>
                {/*<TableHead>*/}
                    {/*<TableRow>*/}
                        {/*<TableCell className={tableHeader}></TableCell>*/}
                        {/*<TableCell className={tableHeader}>Book(s)</TableCell>*/}
                        {/*/!*<TableCell className={tableHeader}>Author</TableCell>*!/*/}
                        {/*<TableCell className={tableHeader}>Review(s)</TableCell>*/}
                        {/*/!*<TableCell className={tableHeader} numeric>Star</TableCell>*!/*/}
                    {/*</TableRow>*/}
                {/*</TableHead>*/}
                <TableBody>
                    {books.length ? books.map(book => {
                        return (
                            <TableRow key={book._id}>
                                <TableCell component="a" scope="row" href={`http://localhost:3000/book/${book._id}`}>
                                    <img src={book.coverUrl} alt={book.title} style={{width: '55px'}} title=""/>
                                </TableCell>
                                <TableCell>
                                    <a href={`http://localhost:3000/book/${book._id}`}>{book.title}</a>
                                    <div>{'by ' + book.authors[0].name}</div> {/*TODO: join authors' names*/}
                                    <Rate disabled value={book.reviewStar} />
                                </TableCell>
                                <TableCell>
                                    {book.reviewContent ? book.reviewContent : ''}
                                </TableCell>
                            </TableRow>
                        );
                    }) : <div>No books yet.</div>}
                </TableBody>
            </Table>
        </Paper>
        </div>
    )} else {
    return null
    }
    }
}

BookListDetail.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BookListDetail);
