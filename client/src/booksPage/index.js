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
				reviews: [{ star: 0 }],
				description: '',
				price: '',
				stock: '',
			},
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
			// TODO: error hint
			this.setState({ bookDetailInformation: response.data });
		}).catch((error) => {
			console.log(error);
		});
	}


	render() {
		const { booknumber, onbookNumberChange } = this.props;
		if (this.state.bookDetailInformation !== {}) {
			return (
				<ContentComponent
					id={this.state.bookDetailInformation._id}
					categaryName={this.state.bookDetailInformation.categoryName}
					bookName={this.state.bookDetailInformation.title}
					bookImagePath={'#'}
					bookAuthor={this.state.bookDetailInformation.authors[0].name}
					bookRate={this.state.bookDetailInformation.reviews[0].star}
					bookReviews={this.state.bookDetailInformation.reviews.length}
					description={this.state.bookDetailInformation.description}
					bookPrice={this.state.bookDetailInformation.price}
					bookSelectNumber={booknumber}
					onbookNumberChange={onbookNumberChange}
					stockNumber={this.state.bookDetailInformation.stock}
					views={this.state.bookDetailInformation.reviews}
				/>
			);
		}
	}
}


function mapStateToProps(state) {
	return {
		booknumber: state.bookNumber,
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
