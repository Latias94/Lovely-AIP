import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

const styles = (theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },

});

class childList extends React.Component {
  state = { open: false };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { classes } = this.props;

      return (
        <div>
          {
            this.props.subcategoriesName.length === 0 ?
              (
                <ListItem button onClick={this.handleClick}>
                  <ListItemText style={{paddingLeft:'0px'}} inset primary={this.props.categoriesName} />
                </ListItem>
              ) : (
                <ListItem button onClick={this.handleClick}>
                  <ListItemText style={{paddingLeft:'0px'}} inset primary={this.props.categoriesName} />
                  {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
              )
          }
            
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {
                        this.props.subcategoriesName.map(
                            subitems => (
                                <ListItem key={subitems._id} button>
                                    <ListItemText inset primary={subitems.subname} />
                                </ListItem>)
                        )
                    }
                </List>
            </Collapse>
          </div>
    );
  }
}

childList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(childList);