import React, { Component } from 'react';
import axios from 'axios';
import Book from '../allCategoriesPage/aBook';
import ShowBook from './showBook';
import ShowList from './showList';


const ShowContent = (state, type, content) => {
	if (state) {
		return (
			<div style={{ fontSize: '40px', textAlign: 'center' }}>Sorry. There is nothing found.</div>
		);
	}
	if (type === '0') {
		return (<ShowList content={content.booklists} />);
	} if (type === '1') {
		return (<ShowBook content={content.books} />);
	}
	return (<ShowBook content={[content]} />);
};

class searchIndex extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: this.props.match.params.type,
			content: this.props.match.params.parm,
			data: {},
			state: false,
		};
	}

	componentDidUpdate(prevProps) {
		if (this.props.match.params !== prevProps.match.params) {
			window.location.reload();
		}
	}

	componentDidMount() {
		const { type, parm } = this.props.match.params;
		let axiosContent = {};
		switch (type) {
		case '0':
			axiosContent = {
				method: 'get',
				url: `/booklists/search/${parm}`,
			};
			break;
		case '1':
			axiosContent = {
				method: 'get',
				url: `/books/search/${parm}?page=1&pageSize=20`,
			};
			break;
		case '2':
			axiosContent = {
				method: 'get',
				url: `/books/isbn/${parm}`,
			};
			break;
		default:
			break;
		}
		if (axiosContent) {
			axios(axiosContent)
				.then((res) => {
					this.setResData(res.data);
				})
				.catch(err => this.setState({ state: true, data: 'There is not resule' }));
		}
	}

	setResData(data) {
		this.setState({ data });
	}

	render() {
		return (
			<div style={{
				height: 'auto', width: '80%', marginLeft: '10%', marginTop: '10px',
			}}>
				{
					ShowContent(this.state.state, this.props.match.params.type, this.state.data)
				}
			</div>
		);
	}
}

export default searchIndex;
