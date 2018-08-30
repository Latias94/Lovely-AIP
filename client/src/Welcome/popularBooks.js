import React from 'react';
import { Link } from 'react-router-dom';
import * as style from './welcomePageCss';

const popularBooksComponent = props => (
	<div style={{ marginTop: '10px', marginBottom: '10px', justifyContent: 'center' }}>
		{props.bookList.map(obj => (
			<div key={obj._id} style={{ marginTop: '5px' }}>
				<h3>{obj.title}</h3>
				<hr/>
				<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
					{obj.books.map(smallobj => (
						<Link to={`/book/${smallobj.bookid}`} key={smallobj._id} replace><div style={style.eachBook}>
							<div style={{ backgroundColor: 'gray', height: '160px', width: '160px' }}></div>
							<span>Name</span>
							<span>Author</span>
							<span>Rank</span>
							<span>Awards</span>
						</div></Link>
					))}
				</div>
			</div>
		))}
	</div>
);
export default popularBooksComponent;
