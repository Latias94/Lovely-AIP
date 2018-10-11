import React, { Component } from 'react';
import axios from 'axios';
import ShowBook from './showBook';
import ShowList from './showList';

const ShowContent = (bookNotFound, type, content) => {
	if (bookNotFound) {
		return (
			<div style={{ fontSize: '40px', textAlign: 'center' }}>Sorry. There is nothing found.</div>
		);
	}
	if (type === 'Book Lists') {
		return (<ShowList content={content.booklists} />);
	} if (type === 'Books') {
		return (<ShowBook content={content.books} />);
	}
	return (<ShowBook content={[content]} />);
};

class searchIndex extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
			error: false,
		};
	}

	componentDidUpdate(prevProps) {
		if (this.props.match.params !== prevProps.match.params) {
			window.location.reload();
		}
	}

	componentDidMount() {
		const { type, parm } = this.props.match.params;
		if (parm.length === 0) {
			return;
		}

		let searchURL = '';

		switch (type.replace('%20', ' ')) {
		case 'Books':
			searchURL = `/books/search/${parm}?page=1&pageSize=20`;
			break;
		case 'Book Lists':
			searchURL = `/booklists/search/${parm}`;
			break;
		default:
			break;
		}

		if (searchURL.length > 0) {
			axios.get(searchURL)
				.then((res) => {
					this.setState({ data: res.data });
				})
				.catch(err => this.setState({ error: true, data: 'There is not result.' }));
		}
	}

	render() {
		return (
			<div style={{
				height: 'auto', width: '80%', marginLeft: '10%', marginTop: '10px',
			}}>
				{
					ShowContent(this.state.error, this.props.match.params.type, this.state.data)
				}
			</div>
		);
	}
}

export default searchIndex;
