import React, { Component } from 'react';
import './App.css';
import MainRoute from './routers/mainRouter';
import Header from './Header/index';
import Footer from './Footer/index';


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
