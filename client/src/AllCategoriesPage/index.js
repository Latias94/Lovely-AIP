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
		const categoryID = this.props.match.params.categoryID;
		const requestURL = '/categories';

		Axios(requestURL).then((response) => {
			this.setState({
				allCategories: response.data,
                booksPageCategoryID: categoryID
			});
            this.setInitialCategoryNamesBySearch(response.data, categoryID);
        }).catch((error) => {
			console.log(error);
		});
	}

	setInitialCategoryNamesBySearch(categories, categoryID) {
        let categoryName = '';
        let subCategoryName = '';
        categories.forEach(category => {
            category.subCategories.forEach(
                subCategory => {
                    if (subCategory.subid === categoryID) {
                        categoryName = category.name;
                        subCategoryName = subCategory.subname;
                    }
                }
            );
        });
        this.props.onCategoryNumberChange({mainCategories: categoryName, subCategories: subCategoryName});
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
