import React, { Component } from 'react';
import './App.css';
import MainRoute from './routers/mainRouter';
import Header from './headerPage';
import Footer from './footerPage';

class App extends Component {
	render() {
		return (
			<div className='app'>
				<Header/>
				<div className="router"><MainRoute/></div>
				<Footer/>
			</div>
		);
	}
}

export default App;
