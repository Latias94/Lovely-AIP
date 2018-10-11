import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Axios from 'axios';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert2';
import {Rate} from 'antd';
import {compose} from 'redux';
import {connect} from 'react-redux';
import KFStyles from '../KFStyles';
import BookListEditorModal from './BookListEditorModal';
import {deleteBookList} from './actions';
import {showErrorMsgFromErrorObject} from "../common/utils/sweetAlert";


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
			userID: '',
			bookListTitle: 'Book List',
			description: '',
			books: [],
			totalBooks: 0,
			bookListId: 0,
			openBookListEditorModal: false,
		};
		this.confirmDelete = this.confirmDelete.bind(this);
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
					user: userID,
				} = res.data;

				this.setState({
					bookListTitle,
					books,
					totalBooks: books.length,
					description,
					bookListId,
					userID,
				});
			})
			.catch(err => showErrorMsgFromErrorObject(err));
	}

	confirmDelete(id) {
		swal({
			title: 'Are you sure?',
			text: 'You won\'t be able to revert this!',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#f50057',
			cancelButtonColor: '#3f51b5',
			confirmButtonText: 'Yes, delete it!',
		})
			.then((result) => {
				if (result.value) {
					deleteBookList(id)
				}
			})
	}

	handleBookListEditorModalClose() {
		this.setState({openBookListEditorModal: false});
	}

	render() {
		const {
			root, table, container,
		} = this.props.classes;
		const {
			bookListTitle, books, totalBooks, description, bookListId,
		} = this.state;
<<<<<<< HEAD
=======
		// Change page title according to number of books.
>>>>>>> 7ac5c05ce6d8b04c14c7597e7b1eab52b8ba2b3b
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
						bookListId={this.state.bookListId}
						handleClose={this.handleBookListEditorModalClose}
						openModal={this.state.openBookListEditorModal}
					/>

					<h1 style={{fontSize: '20px'}}>{bookListTitle}</h1>
					<p style={{
						fontSize: '14px',
						fontFamily: '"Lato", "Helvetica Neue", Helvetica, Arial, sans-serif'
					}}>{description}</p>
					{(this.props.userID === this.state.userID || this.props.isAdmin) &&
					<div style={{flexDirection: 'row'}}>
						{/* Add new, edit, and delete buttons */}
						<Button
							style={{
								outline: 'none',
								width: '170px',
								backgroundColor: '#3D5AFE',
								color: '#fff',
								marginRight: '10px',
							}}
							variant="contained"
							href={'/'}
						>
							+ A new book
						</Button>
						<Button
							style={{outline: 'none', width: '80px', marginRight: '10px'}}
							variant="contained"
							color="primary"
							onClick={() => {
								this.setState({openBookListEditorModal: true});
							}}
							title={'Edit the list title and description'}
						>
							Edit
						</Button>
						<Button
							title={'Delete this book list'}
							style={{outline: 'none', width: '120px', marginRight: '10px'}}
							variant="contained"
							color="secondary"
							onClick={() => {
								this.confirmDelete(bookListId);
							}}
						>
							Delete list
						</Button>
					</div>}
					{/* Show books in list */}
					<Paper className={root}>
						<Table className={table} padding={'dense'}>
							<tbody>
								{books.length ? books.map(book => (
									<tr key={book._id} style={{height: '220px', borderBottom: '8px #E0E0E0  solid'}}>
										<td component="a" href={`/book/${book._id}`}
											style={{width: '18%', paddingLeft: '20px'}}>
											<img src={book.coverUrl} alt={book.title} style={{width: '120px'}} title=""/>
										</td>
										<td style={{width: '60'}}>
											<a href={`/book/${book._id}`} style={{fontSize: '18px'}}>{book.title}</a>
											<div>{`by ${book.authors[0].name}`}</div>
											{/* TODO: join authors' names */}
											<Rate disabled value={book.reviewStar}/>
										</td>
										<td style={{width: '20%'}}>
											{book.reviewContent ? book.reviewContent : ''}
										</td>
									</tr>
								)) : <tr>
									<td>No books yet.</td>
								</tr>}
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
	userID: PropTypes.string,
};

export default compose(
	withStyles(styles),
	connect(state => ({ userID: state.auth.user.id, isAdmin: state.auth.user.isStaff })),
)(BookList);
