import React, { Component } from 'react';
import Book from '../allCategoriesPage/aBook';

class showBook extends Component {
	render() {
		return (
			<div style={{ display: 'flex', flexDirection: 'row' }}>
				{
					this.props.content
						? (
							this.props.content.map(v => (
								<Book
									bookMarginRight = {20}
									key = { v._id }
									bookid = { v._id }
									bookTitle = { v.title }
									bookAuthor = { v.authors ? v.authors[0].name : '' }
									imagePath = { v.coverUrl }
									bookPrice = { v.price }
									reviewScore = { v.score }
									bookReviews = { v.reviews ? v.reviews.length : 0 }
								/>
							))
						) : (
							null
						)
				}
			</div>
		);
	}
}

export default showBook;
