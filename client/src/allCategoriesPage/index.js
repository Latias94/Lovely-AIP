import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import CategoriesBar from './categoriesBar';
import showBooksinCategoryAction from './categoriesPageReducer';
import Books from './booksInCategory';
import * as style from './categoriesPageCss';


class allCategoriesPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allCategories: [],
		};
	}

	componentDidMount() {
		const requestURL = 'http://localhost:5000/api/categories';

		Axios({
			method: 'get',
			url: requestURL,
			header: {
				'Access-Control-Allow-Origin': '*',
				'content-type': 'application/x-www-form-urlencoded',
			},
		}).then((response) => {
			// TODO: error hint
			this.setState({ allCategories: response.data });
		}).catch((error) => {
			console.log(error);
		});
	}


	render() {
		const { bookCategory, onCategoryNumberChange } = this.props;
		return (
			<div style={style.categoriesContainer}>
				<CategoriesBar
					categoriesList={this.state.allCategories}
					bookCategory= {bookCategory}
					onCategoryNumberChange={onCategoryNumberChange}
				/>
				<Books/>
			</div>
		);
	}
}

// export default allCategoriesPage;

function mapStateToProps(state) {
	return {
		bookCategory: state.categoryPageReducer.booksCategory,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		onCategoryNumberChange: (number) => { dispatch(showBooksinCategoryAction(number)); },
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(allCategoriesPage);
