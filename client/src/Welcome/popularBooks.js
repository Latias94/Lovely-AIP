import React, { Component } from 'react';
import Row from './rowOfBookComponent';

export default class PopularBooks extends Component {
	render() {
		return (
			<div style={{
				marginTop: '10px', marginBottom: '10px', justifyContent: 'center', overflowX: 'hidden',
			}}>
				{this.props.bookList.map(obj => (
					<div key={obj._id || obj.id} style={{ marginTop: '5px' }}>
						<h3>{obj.title || obj.name}</h3>
						<hr />
						<Row books={obj.books}/>
					</div>
				))}
			</div>
		);
	}
}
