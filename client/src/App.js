import React, { Component } from 'react';
import './App.css';
import { withRouter } from 'react-router';
import MainRoute from './routers/mainRouter';
import Header from './Header';
import Footer from './Footer';


class App extends Component {
  componentDidMount() {
    document.title = 'Knight Frank';
  }

	render() {
		const isUser = this.props.location.pathname !== "/admin"
      return (
        <div className='app'>
					{isUser && <Header/>}
          <div className="router"><MainRoute/></div>
					{isUser && <Footer/>}
        </div>
      )
	}
}

// use withRouter HOC in order to inject match, history and location in the component props.
export default withRouter(App);
