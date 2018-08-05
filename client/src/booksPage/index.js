import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContentComponent from './component';
import { selectBookNumberAction } from './actions';


class BooksPage extends Component {
	render() {
		const { booknumber, onbookNumberChange } = this.props;
		return (
			<ContentComponent
				id={this.props.match.params.id}
				categaryName={this.props.match.params.id}
				bookName='Book1'
				bookImagePath='#'
				bookAuthor="me"
				bookRate={3}
				bookReviews={100}
				description="This is the description of book"
				bookPrice={100}
				bookSelectNumber={booknumber}
				onbookNumberChange={onbookNumberChange}
				stockNumber={0}
			/>
		);
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
