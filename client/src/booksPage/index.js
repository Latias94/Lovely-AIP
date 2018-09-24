import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import ContentComponent from './component';
// import { selectBookNumberAction } from './actions';
import { addBookToCartData } from '../Header/actions';

class BooksPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			usersBookList: [],
			bookDetailInformation: {
				_id: '',
				categoryName: '',
				title: '',
				authors: [{ name: '' }],
				reviews: [],
				description: '',
				price: '',
				stock: '',
				coverUrl: '',
				score: 0,
				category:'',
			},
			quantity: 1,
			submittedReviewStar: 0,
			submittedReviewContent: '',
			open: false,
			realtedBookList: '',
		};
		this.addToCartClick = this.addToCartClick.bind(this);
		this.reviewStarChange = this.reviewStarChange.bind(this);
		this.reviewContentChange = this.reviewContentChange.bind(this);
		this.addToCartClickw = this.addToCartClick.bind(this);
		this.submitReview = this.submitReview.bind(this);
		this.getUserBookList = this.getUserBookList.bind(this);
		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.createANewBookList = this.createANewBookList.bind(this);
	}

	handleOpen() {
		this.setState({ open: true });
	}

	handleClose() {
		this.setState({ open: false });
	}

	createANewBookList(title) {
		Axios.post('/booklists', { title, description: 'tryyyyyyyyyyy' })
			.then((response) => { console.log('success'); this.getUserBookList(); this.handleClose(); })
			.catch((error => console.log(error)));
	}

	addBookIntoBooklist(booklistId, bookId) {
		const url = `/booklists/book/${booklistId}/${bookId}`;
		Axios.post(url)
			.then((response) => { console.log('success'); alert('add book successful'); })
			.catch((error => console.log(error)));
	}

	getRelateBookList(category) {
		Axios.get(`/categories/${category}`)
			.then((response) => { console.log('aaaaaaaaaaaaaaaaaaaaaa',response.data); this.setState({realtedBookList: response.data}) })
			.catch(error => console.log(error));
	}

	componentDidMount() {
		const requestURL = `/books/${this.props.match.params.id}`;
		this.getUserBookList();
		Axios.get(requestURL)
			.then((response) => {
				console.log(response);
				this.setState({ bookDetailInformation: response.data });
				console.log('ccccccccccccccccccccccccccc',this.state.bookDetailInformation.category)
				this.getRelateBookList(this.state.bookDetailInformation.category);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	reviewStarChange(star) {
		this.setState({ submittedReviewStar: star });
	}

	reviewContentChange(content) {
		this.setState({ submittedReviewContent: content });
	}

	addToCartClick(id) {
		if (this.props.auth) {
			this.props.addBookToCartData(id);
			console.log('sss');
		} else {
			window.location.pathname = './login';
		}
	}

	getUserBookList() {
		Axios.get('/users/current/booklist')
			.then((response) => {
				console.log(response.data);
				this.setState({ usersBookList: response.data });
			})
			.catch((error) => {
				console.log(error);
			});
	}

	submitReview() {
		const requestURL = `/books/review/${this.props.match.params.id}`;
		const { submittedReviewStar, submittedReviewContent } = this.state;
		Axios.post(requestURL, {
			star: submittedReviewStar,
			content: submittedReviewContent,
		})
			.then(() => {
				window.location.reload();
			})
			.catch((error) => {
				if (error.response.status === 404) { alert(error.response.data.reviewexist); }
			});
	}

	render() {
		const { auth } = this.props;
		const {
			_id,
			categoryName,
			title,
			authors,
			reviews,
			description,
			price,
			stock,
			coverUrl,
			score,
		} = this.state.bookDetailInformation;

		const {
			quantity,
			submittedReviewStar,
			submittedReviewContent,
		} = this.state;

		if (this.state.bookDetailInformation !== {}) {
			return (
				<ContentComponent
					id={_id}
					categaryName={categoryName}
					bookName={title}
					bookImagePath={'#'}
					bookAuthor={authors[0].name}
					// bookRate={reviews[0].star}
					reviewScore={score}
					bookReviews={reviews.length}
					description={description}
					bookPrice={price}
					quantity={quantity}
					onQuantityChange={(quantity) => { this.setState({ quantity }); }}
					stockNumber={stock}
					views={reviews}
					submittedReviewStar={submittedReviewStar}
					reviewStarChange={this.reviewStarChange}
					submittedReviewcontent={submittedReviewContent}
					reviewContentChange={this.reviewContentChange}
					submitClick={this.submitReview}
					coverUrl={coverUrl}
					authOrNot={auth}
					addToCartClick={id => this.addToCartClick(id)}
					usersBookList={this.state.usersBookList}
					handleOpen={this.handleOpen}
					handleClose={this.handleClose}
					openMoudal={this.state.open}
					createANewBookList={this.createANewBookList}
					addBookIntoBooklist={this.addBookIntoBooklist}
					realtedBookList={this.state.realtedBookList}
				/>
			);
		}
		return {};
	}
}


function mapStateToProps(state) {
	return {
		// booknumber: state.booksPageReducer.bookNumber,
		auth: state.auth.isAuthenticated,
	};
}

export default connect(mapStateToProps, { addBookToCartData })(BooksPage);
