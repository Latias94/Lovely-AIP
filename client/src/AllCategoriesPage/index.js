import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import CategoriesBar from './categoriesBar';
import { showBooksinCategoryAction } from './actions';
import Books from './booksInCategory';
import * as style from './categoriesPageCss';


class allCategoriesPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allCategories: [],
			booksPageCategoryID: '',
		};
	}

	componentDidMount() {
		const requestURL = '/categories';
		this.props.onCategoryNumberChange({ mainCategories: 'Computers & Technology', subCategories: 'Databases & Big Data' });

		Axios(requestURL).then((response) => {
			this.setState({ allCategories: response.data });
		}).catch((error) => {
			console.log(error);
		});
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.match.params.categoryID !== prevState.booksPageCategoryID) {
			return {
				booksPageCategoryID: nextProps.match.params.categoryID,
			};
		}
		return null;
	}


	render() {
		const { mainCategory, subCategory, onCategoryNumberChange } = this.props;
		return (
			<div style={style.categoriesContainer}>
				<CategoriesBar
					categoriesList={this.state.allCategories}
					onCategoryNumberChange={(name) => {
						onCategoryNumberChange(name);
					}}
				/>
				<Books
					categoryName={mainCategory}
					subCategoryName={subCategory}
					categoriesID={this.state.booksPageCategoryID}
				/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		mainCategory: state.categoryPageReducer.name.mainCategories,
		subCategory: state.categoryPageReducer.name.subCategories,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		onCategoryNumberChange: (name) => { dispatch(showBooksinCategoryAction(name)); },
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(allCategoriesPage);
