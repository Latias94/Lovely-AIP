import React, { Component } from 'react';
// import { connect } from 'react-redux';
import Axios from 'axios';
import CategoriesBar from './categoriesBar';
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
		return (
			<div style={style.categoriesContainer}><CategoriesBar categoriesList={this.state.allCategories} /></div>
		);
	}
}

export default allCategoriesPage;

// function mapStateToProps(state) {
// 	return {
// 		booknumber: state.bookNumber,
// 	};
// }

// function mapDispatchToProps(dispatch) {
// 	return {
// 		onbookNumberChange: (number) => { dispatch(selectBookNumberAction(number)); },
// 	};
// }

// export default connect(
// 	mapStateToProps,
// 	mapDispatchToProps,
// )(allCategoriesPage);
