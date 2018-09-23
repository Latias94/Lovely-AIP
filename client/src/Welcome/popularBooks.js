import React from 'react';
import * as style from './welcomePageCss';
import Book from '../allCategoriesPage/aBook';

const PopularBooks = props => (
	<div style={{ marginTop: '10px', marginBottom: '10px', justifyContent: 'center' }}>
		{props.bookList.map(obj => (
			<div key={obj._id} style={{ marginTop: '5px' }}>
				<h3>{obj.title}</h3>
				<hr/>
				<div style={style.bookRow}>
					{obj.books.map(book => <Book
						key={book._id}
						bookid={book._id}
						bookTitle={book.title}
						bookAuthor={book.authers ? book.authors[0].name : ''}
						imagePath={book.coverUrl}
						bookPrice={book.price}
						reviewScore={book.score}
						bookReviews={book.reviews ? book.reviews.length : 0}
					/>)}
				</div>
			</div>
		))}
	</div>
);

export default PopularBooks;
