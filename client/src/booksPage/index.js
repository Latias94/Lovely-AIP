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
			this.setState({ bookDetailInformation: response.data });
		}).catch((error) => {
			console.log(error);
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
					bookRate={reviews[0].star}
					bookReviews={reviews.length}
					description={description}
					bookPrice={price}
					bookSelectNumber={booknumber}
					onbookNumberChange={onbookNumberChange}
					stockNumber={stock}
					views={reviews}
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
