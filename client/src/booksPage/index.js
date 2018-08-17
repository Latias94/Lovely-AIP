import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import ContentComponent from './component';
import { selectBookNumberAction } from './actions';


class BooksPage extends Component {
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
			},
			submittedReviewStar: 0,
			submittedReviewcontent: '',

		};
	}

	componentDidMount() {
		const requestURL = `http://localhost:5000/api/books/${this.props.match.params.id}`;

		Axios({
			method: 'get',
			url: requestURL,
			header: {
				'Access-Control-Allow-Origin': '*',
				'content-type': 'application/x-www-form-urlencoded',
			},
		}).then((response) => {
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

	submmitReview = (review) => {
		const requestURL = `http://localhost:5000/api/books/review/${this.props.match.params.id}`;
		Axios({
			method: 'post',
			url: requestURL,
			header: {
				'Access-Control-Allow-Origin': '*',
				'content-type': 'application/x-www-form-urlencoded',
			},
			data: {
				star:this.state.submittedReviewStar,
				content:this.state.submittedReviewcontent,
			}
		}).then((response) => {
			alert('sdasdasd');
			window.location.reload();
			}).catch((error) => {
			if(error.response.status===404)
			alert(error.response.data.reviewexist);
		});
	}

	render() {
		const { booknumber, onbookNumberChange } = this.props;
		const {
			_id,
			categoryName,
			title,
			authors,
			reviews,
			description,
			price,
			stock,
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
				/>
			);
		}
		return {};
	}
}



function mapStateToProps(state) {
	return {
		booknumber: state.booksPageReducer.bookNumber,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		onbookNumberChange: (number) => { dispatch(selectBookNumberAction(number)); },
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(BooksPage);
