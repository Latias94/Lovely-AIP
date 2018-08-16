import React, { Component } from 'react';
import Axios from 'axios';
import * as style from './categoriesPageCss';
import Book from './aBook';


export default class booksPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categoryName: '',
			subCategoryName: '',
			books: { books: [] },
			categoryID: '5b69933780422c14325872a7',
		};
		console.log('constructore');
	}

	// shouldComponentUpdate(nextState) {
	// 	console.log('should');
	// 	console.log(nextState);
	// 	console.log(this.state.books);
	// 	console.log('over');
	// 	console.log(nextState.books !== this.state.books);
	// 	return nextState.books !== this.state.books;
	// }

	componentDidMount() {
		let requestURL = 'http://localhost:5000/api/categories/';
		requestURL += '5b69933780422c14325872a7';
		console.log('didamount');
		Axios({
			method: 'get',
			url: requestURL,
			header: {
				'Access-Control-Allow-Origin': '*',
				'content-type': 'application/x-www-form-urlencoded',
			},
		}).then((response) => {
			// TODO: error hint
			this.setState({ books: response.data });
			console.log('didAnmount');
		}).catch((error) => {
			console.log(error);
		});
	}

	componentDidUpdate(prevProps, prevState) {
		if (!this.props.categoriesID) { console.log(this.props.categoriesID); return null; }
		if (this.props.categoriesID !== prevProps.categoriesID) {
			this.setState({ books: { books: [] }, categoryID: this.props.categoriesID });
			let requestURL = 'http://localhost:5000/api/categories/';
			requestURL += this.props.categoriesID;
			console.log(requestURL);
			Axios({
				method: 'get',
				url: requestURL,
				header: {
					'Access-Control-Allow-Origin': '*',
					'content-type': 'application/x-www-form-urlencoded',
				},
			}).then((response) => {
				console.log('didupdata'); this.setState({ books: response.data });
			}).catch((error) => {
				console.log(error);
			});
		}
		return null;
	}

	render() {
		return (
			<div style={style.booksContainer}>
				<div style={style.breadcrumbTrail}>
					<ul className="booksClassList" style={style.insideUl}>
						<li>{this.props.categoryName}</li>
						{this.props.subCategoryName
							? (<div style={{ display: 'inline' }}><li>›</li>
								<li>{this.props.subCategoryName}</li></div>) : (null)
						}
					</ul>
				</div>
				<hr style={style.hrTag} />
				<div style={style.bookRow}>
					{this.state.books.books.map(
						item => (
							<Book
								key={item._id}
								bookid={item._id}
								bookTitle={item.title}
								bookPrice={item.price}
								bookAuthor={item.authors[0].name}
								bookReviews={item.reviews.length}
							/>
						),
					)}
				</div>
			</div>

		);
	}
}
