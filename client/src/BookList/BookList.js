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
});

let id = 0;
function createData(name, author, recommendation, ) {
    id += 1;
    return { id, name, author, recommendation,};
}

const rows = [
    createData('Book A','Jack', 'recommendation11111'),
    createData('BookB', 'Book', 'recommendation1112312312312312'),
];

class BookListDetail extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            books: []
        }
        this.getBooksInBookList.bind(this)
    }

    getBooksInBookList(slug) {
        Axios.get(`/book/${slug}`)
        .then((res) => {
            this.setState({
                books: res.data
            })
        })
        .catch((err) => (console.log(err)))
    }
    
    render() {
    const { classes } = this.props;
    return (
        <div style={{padding:'20px'}}>
        {this.props.match.params.slug}
            <Button
                style={{outline:'none'}}
                variant="contained"
                href={'/'}
            >
                + Add a new book
            </Button>
        <Paper className={classes.root}>
            <Table className={classes.table}>

                <TableHead>
                    <TableRow>
                        <TableCell>Book Title</TableCell>
                        <TableCell numeric>Author</TableCell>
                        <TableCell numeric>Recommendation</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => {
                        return (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell numeric>{row.author}</TableCell>
                                <TableCell numeric>{row.recommendation}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Paper>
        </div>
    )}
}

BookListDetail.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BookListDetail);
