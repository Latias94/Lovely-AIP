import React, { Component } from 'react';
import { connect } from 'react-redux';
import CategoriesBar from './childComponent/categoriesBar';
import {
	showBooksinCategoryAction, getAllCategories, getBooksInCategories, clearBooksinCategoryAction,
} from './actions';
import Books from './childComponent/booksInCategory';
import * as style from './categoriesPageCss';


class allCategoriesPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			booksPageCategoryID: '',
		};
	}

	componentDidMount() {
		this.props.clearBooksinCategoryAction();
		this.props.getAllCategories();
		this.props.match.params.categoryID
			? this.props.getBooksInCategories(this.props.match.params.categoryID, this.props.mainCategory)
			: this.props.getBooksInCategories(null, 'All');
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
		const { mainCategory, subCategory, showBooksinCategoryAction } = this.props;
		return (
			<div style={style.categoriesContainer}>
				<CategoriesBar
					categoriesList={this.props.allCategories}
					onCategoryNumberChange={(name) => {
						showBooksinCategoryAction(name);
					}}
					getBooksInCategories={this.props.getBooksInCategories}

				/>
				<Books
					categoryName={mainCategory}
					subCategoryName={subCategory}
					booksInCategories={this.props.booksInCategories}
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
		allCategories: state.categoryPageReducer.allCategories,
		booksInCategories: state.categoryPageReducer.booksInCategories,
	};
}

export default connect(
	mapStateToProps,
	{
		showBooksinCategoryAction, getAllCategories, getBooksInCategories, clearBooksinCategoryAction,
	},
)(allCategoriesPage);
