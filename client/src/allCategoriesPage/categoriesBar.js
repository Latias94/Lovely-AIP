import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ChildCategories from './childCategories';

const styles = theme => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},

});

class NestedList extends React.Component {
	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root} style={{
				borderRightStyle: 'solid', borderRightWidth: '2px', width: '20%', minWidth: '120px', height: '100%',
			}}>
				<List
					component="nav"
					subheader={<ListSubheader style={{ top: 'auto', fontSize: 'large' }} component="div">All Categories</ListSubheader>}
				>
					<hr style={{ margin: '0' }} />
					{
						this.props.categoriesList.map(
							item => (
								<ChildCategories
									key={item._id}
									categoryID={item._id}
									categoriesName={item.name}
									subcategoriesName={item.subCategories}
									updataCategory={this.props.onCategoryNumberChange}
								/>
							),
						)
					}
				</List>
			</div>
		);
	}
}

NestedList.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedList);
