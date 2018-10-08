import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

class showList extends Component {
	render() {
		return (
			<div>
				{this.props.content ? (
					this.props.content.map(v => (
						<Card key={v._id} style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between' }} component={Link} to={`/booklist/${v.slug}`}>
							<CardContent style={{ width: '30%' }}>
								<Typography style={{ margin: '5px 10px 5px 10px' }}>Title: {v.title}</Typography>
								<Typography style={{ margin: '5px 10px 5px 10px' }}>Author: {v.username}</Typography>
							</CardContent>
							<CardContent style={{ width: '30%' }}>
								<Typography style={{ margin: '5px 10px 5px 10px' }}>Books: {v.books.length}</Typography>
								<Typography style={{ margin: '5px 10px 5px 10px' }}>Likes: {v.likes.length}</Typography>
							</CardContent>
							<CardContent style={{ width: '30%' }}>
								<Typography style={{ margin: '5px 10px 5px 10px' }}>Create Date: {new Date(v.createDate).toLocaleDateString()}</Typography>
								<Typography style={{ margin: '5px 10px 5px 10px' }}>Updata Date: {new Date(v.updateDate).toLocaleDateString()}</Typography>
							</CardContent>
						</Card>
					))
				) : null}
			</div>
		);
	}
}

export default showList;
