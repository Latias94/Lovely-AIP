import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';


const style = {
	welcomeContent: {
		color: '#00B0FF',
		fontSize: '100px',
		marginLeft: '100px',
		marginTop: '100px'
	},
	exitButton: {
		display: 'flex',
		width: '120px',
		marginLeft: '100px',
		backgroundColor: '#1E88E5'
	}
};

class AdminHome extends React.Component {
	render() {
		return (
			<div>
				<h1 style={style.welcomeContent}>
					Welcome Admin <br/>^~^
				</h1>
				<Button
					style={style.exitButton}
					variant="contained"
					color="primary"
					component={Link}
					to={"/"}
				>
					Exit
				</Button>
			</div>)
	}
}

export default AdminHome;
