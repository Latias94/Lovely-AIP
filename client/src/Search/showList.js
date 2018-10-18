import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const style = {
	typo: { margin: '5px 10px 5px 10px' },
	card: { marginTop: '15px', display: 'flex', justifyContent: 'space-between' },
};

class showList extends Component {
	render() {
		return (
			<div>
				{this.props.content ? (
					this.props.content.map(v => (
						<Card key={v._id} style={style.card} component={Link} to={`/booklist/${v.slug}`}>
							<CardContent style={{ width: '30%' }}>
								<Typography style={style.typo}>Title: {v.title}</Typography>
								<Typography style={style.typo}>Author: {v.username}</Typography>
							</CardContent>
							<CardContent style={{ width: '30%' }}>
								<Typography style={style.typo}>Books: {v.books.length}</Typography>
							</CardContent>
							<CardContent style={{ width: '30%' }}>
								<Typography style={style.typo}>Created Date: {new Date(v.createDate).toLocaleDateString()}</Typography>
								<Typography style={style.typo}>Updatde Date: {new Date(v.updateDate).toLocaleDateString()}</Typography>
							</CardContent>
						</Card>
					))
				) : null}
			</div>
		);
	}
}

export default showList;
