import React, { Component } from 'react';
import * as style from '../categoriesPageCss';
import Book from './aBook';


export default class booksPage extends Component {
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
				{this.props.booksInCategories.length !== 0 ? (
					<div style={style.bookRow}>
						{this.props.booksInCategories.map(
							item => (
								<Book
									key={item._id}
									bookid={item._id}
									bookTitle={item.title}
									bookPrice={item.price}
									imagePath={item.coverUrl}
									bookAuthor={item.authors[0].name}
									bookReviews={item.reviews.length}
									reviewScore={item.score}
								/>
							),
						)}
					</div>
				) : null
				}
			</div>

		);
	}
}
