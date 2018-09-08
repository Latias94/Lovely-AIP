import React from 'react';
import { Link } from 'react-router-dom';
import * as style from './welcomePageCss';
import Book from '../allCategoriesPage/aBook';

const popularBooksComponent = props => (
	<div style={{ marginTop: '10px', marginBottom: '10px', justifyContent: 'center' }}>
		{props.bookList.map(obj => (
			<div key={obj._id} style={{ marginTop: '5px' }}>
				<h3>{obj.title}</h3>
				<hr/>
				<div style={style.bookRow}>
					{obj.books.map(smallobj => (
						<Book
							key={smallobj._id}
							bookid={smallobj._id}
							bookTitle={smallobj.title}
							// bookAuthor='Author'
							bookAuthor={smallobj.authors[0].name}
							imagePath={smallobj.coverUrl}
							bookPrice={smallobj.price}
							reviewScore={smallobj.score}
							bookReviews={smallobj.reviews.length}
						/>
					))}
				</div>
			</div>
		))}
	</div>
);
export default popularBooksComponent;
