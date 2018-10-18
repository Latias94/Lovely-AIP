import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import MyBookLists from './MyBookLists'


const styles = theme => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
	},

	buttonStyle: {
		flex: 1,// extend as much as it can
		alignSelf: 'stretch',
		backgroundColor: '#fff',
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#007aff',
		marginLeft: 5,
		marginRight: 5
	},
});

function TabContainer(props) {
	return (
		<Typography
			component="div"
			style={{ padding: 8 * 3 }}
		>
			{props.children}
		</Typography>
	);
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired,
};

class AccountTab extends React.Component {
	state = {
		value: 0,
	};

	handleChange = (event, value) => {
		this.setState({ value });
	};

	render() {
		const { classes } = this.props;
		const { value } = this.state;

		return (
			<div className={classes.root} style={{ width: '900px' }}>
				<AppBar position="static">
					<Tabs value={value} onChange={this.handleChange}>
						<Tab label="My BookList" style={{ outline: 'none' }}/>
					</Tabs>
				</AppBar>
				{value === 0 && <MyBookLists/>}
			</div>
		);
	}
}

AccountTab.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountTab);
