import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
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
				category: '',
			},
			quantity: 1,
			submittedReviewStar: 0,
			submittedReviewContent: '',
			open: false,
			relatedBookList: '',
			currentBookId: '',
		};
		this.addToCartClick = this.addToCartClick.bind(this);
		this.reviewStarChange = this.reviewStarChange.bind(this);
		this.reviewContentChange = this.reviewContentChange.bind(this);
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
		axios.post('/booklists', { title, description: '' })
			.then(() => { this.getUserBookList(); this.handleClose(); })
			.catch((error => console.log(error)));
	}

	addBookIntoBooklist(booklistId, bookId) {
		const url = `/booklists/book/${booklistId}/${bookId}`;
		axios.post(url)
			.then(() => { alert('add book successful'); })
			.catch((error => console.log(error)));
	}

	getRelateBookList(category) {
		axios.get(`/categories/${category}`)
			.then((response) => { this.setState({ relatedBookList: response.data }); })
			.catch(error => console.log(error));
	}

	componentDidMount() {
		const requestURL = `/books/${this.props.match.params.id}`;
		this.getUserBookList();
		axios.get(requestURL)
			.then((response) => {
				this.setState({ bookDetailInformation: response.data, currentBookId: response.data._id });
				this.getRelateBookList(this.state.bookDetailInformation.category);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	componentDidUpdate(prevProps) {
		if (this.props.match.params.id !== prevProps.match.params.id) {
			window.location.reload();
		}
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
		} else {
			window.location.pathname = './login';
		}
	}

	getUserBookList() {
		this.props.auth && axios.get('/users/current/booklist')
			.then((response) => {
				this.setState({ usersBookList: response.data });
			})
			.catch((error) => {
				console.log(error);
			});
	}

	submitReview() {
		const requestURL = `/books/review/${this.props.match.params.id}`;
		const { submittedReviewStar, submittedReviewContent } = this.state;
		axios.post(requestURL, {
			star: submittedReviewStar,
			content: submittedReviewContent,
		})
			.then(() => {
				window.location.reload();
			})
			.catch((error) => {
				if (error.response.status === 404) { alert(error.response.data.reviewexist); } else { this.alertObj(error.response.data); }
			});
	}

	alertObj(obj) {
		let output = '';
		for (const i in obj) {
			const property = obj[i];
			output += property;
		}
		alert(output);
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
                    relatedBookList={this.state.relatedBookList}
					currentBookId={this.state.currentBookId}
				/>
			);
		}
		return {};
	}
}

function mapStateToProps(state) {
	return {
		auth: state.auth.isAuthenticated,
	};
}

export default connect(mapStateToProps, { addBookToCartData })(BooksPage);
