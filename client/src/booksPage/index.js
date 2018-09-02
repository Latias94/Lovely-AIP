import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import ContentComponent from './component';
import { selectBookNumberAction } from './actions';


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
			},
			submittedReviewStar: 0,
			submittedReviewcontent: '',

		};
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
					coverUrl={coverUrl}
					authOrNot={auth}
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

function mapDispatchToProps(dispatch) {
	return {
		onbookNumberChange: (number) => { dispatch(selectBookNumberAction(number)); },
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(BooksPage);
