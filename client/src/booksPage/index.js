import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import ContentComponent from './component';
import { selectBookNumberAction } from './actions';
import { addBookToCartData, trysss } from '../Header/actions';

class BooksPage extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
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
				score:0,
			},
			submittedReviewStar: 0,
			submittedReviewcontent: '',

		};
		// this.props.addBookToCartData(2);
		this.addToCartClick = this.addToCartClick.bind(this);
	}

	componentDidMount() {
		const requestURL = `/books/${this.props.match.params.id}`;

		Axios({
			method: 'get',
			url: requestURL,
		}).then((response) => {
			console.log(response);
			this.setState({ bookDetailInformation: response.data });
		}).catch((error) => {
			console.log(error);
		});
	}

	reviewStarChange = (star) => {
		this.setState({ submittedReviewStar: star });
	}
	
	reviewContentChange = (content) => {
		this.setState({ submittedReviewcontent: content });
	}

	addToCartClick = (id) => {
		console.log(id)
		console.log(this.props.auth)
		if (this.props.auth) {
			this.props.addBookToCartData(id);
			console.log('sss');
		} else {
			window.location.pathname = './login';
		}
	}

	submmitReview = (review) => {
		const requestURL = `/books/review/${this.props.match.params.id}`;
		Axios({
			method: 'post',
			url: requestURL,
			data: {
				star:this.state.submittedReviewStar,
				content:this.state.submittedReviewcontent,
			}
		})
		.then(() => {
			alert('sdasdasd');
			window.location.reload();
			})
		.catch((error) => {
		if(error.response.status===404)
		alert(error.response.data.reviewexist);
		});
	}

	render() {
		const { booknumber, onbookNumberChange, auth } = this.props;
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
					bookSelectNumber={booknumber}
					onbookNumberChange={onbookNumberChange}
					stockNumber={stock}
					views={reviews}
					submittedReviewStar={this.state.submittedReviewStar}
					reviewStarChange={this.reviewStarChange}
					submittedReviewcontent={this.state.submittedReviewcontent}
					reviewContentChange={this.reviewContentChange}
					submitClick={this.submmitReview}
					coverUrl={coverUrl}
					authOrNot={auth}
					addToCartClick={id=>this.addToCartClick(id)}
				/>
			);
		}
		return {};
	}
}



function mapStateToProps(state) {
	return {
		booknumber: state.booksPageReducer.bookNumber,
		auth: state.auth.isAuthenticated,
	};
}

// function mapDispatchToProps(dispatch) {
// 	return {
// 		onbookNumberChange: (number) => { dispatch(selectBookNumberAction(number)); },
// 	};
// }

export default connect(
	mapStateToProps,
	{addBookToCartData, onbookNumberChange: number => dispatch => { dispatch(selectBookNumberAction(number)) } }
)(BooksPage);
