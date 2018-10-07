import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';


const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        minWidth: 200,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
        minWidth:200,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 100,
    },
    card: {
        minWidth: 275,
    },
});

const AUS_states = [
    {
        value: 'Australian Capital Territory',
        label: 'Australian Capital Territory',
    },
    {
        value: '2',
        label: 'New South Wales',
    },
    {
        value: '3',
        label: 'Northern Territory',
    },
    {
        value: 'Queensland',
        label: 'Queensland',
    },
    {
        value: '5',
        label: 'South Australia',
    },
    {
        value: 'Tasmania',
        label: 'Tasmania',
    },
    {
        value: '7',
        label: 'Victoria',
    },
    {
        value: '8',
        label: 'Western Australia',
    },
];

class MySetting extends React.Component {
    state = {
        expanded: null,
        name: 'Jenny',
        email: '',
        Phone: '04234234234',
        AUS_state: '2',
        City: 'Sydney',
    };

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };
    handleChangeState = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { classes } = this.props;
        const { expanded } = this.state;

        return (
            <div className={classes.root} style={{backgroundColor:'#FAFAFA'}}>
                <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>General settings</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <table style={{width:'100%'}}>
                            <thead></thead>
                            <tbody>
                            <tr>
                                <td>
                                    <TextField
                                        id="textarea"
                                        label="Name"
                                        multiline
                                        className={classes.textField}
                                        margin="normal"
                                    />
                                </td>
                                <td>
                                    <TextField
                                        id="email"
                                        label="E-mail"
                                        className={classes.textField}
                                        type="E-mail"
                                        margin="normal"
                                    />
                                </td>
                                <td>
                                    <TextField
                                        id="Phone"
                                        label="Phone"
                                        className={classes.textField}
                                        type="Phone"
                                        margin="normal"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <TextField
                                        id="select-AUS_state"
                                        select
                                        label="State"
                                        className={classes.textField}
                                        value={this.state.AUS_state}
                                        onChange={this.handleChangeState('AUS_state')}
                                        SelectProps={{
                                            MenuProps: {
                                                className: classes.menu,
                                            },
                                        }}
                                        margin="normal"
                                    >
                                        {AUS_states.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </td>
                                <td>
                                        <TextField
                                        id="City"
                                        label="City"
                                        className={classes.textField}
                                        type="City"
                                        margin="normal"
                                    />
                                </td>
                                <td>
                                    <TextField
                                        id="PostCode"
                                        label="Post Code"
                                        className={classes.textField}
                                        type="postcode"
                                        margin="normal"
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </ExpansionPanelDetails>
                    <Button variant="contained" color="primary" className={classes.button} style={{marginLeft:'30px', marginBottom:'20px'}}>
                        SAVE
                    </Button>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>Change Password</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <table style={{width:'100%'}}>
                            <thead></thead>
                            <tbody>
                            <tr>
                                <td>
                                    <TextField
                                        id="NewPassword"
                                        label="New Password"
                                        multiline
                                        className={classes.textField}
                                        margin="normal"
                                    />
                                </td>
                                <td>
                                    <TextField
                                        id="ConfirmPassword"
                                        label="Confirm New Password"
                                        multiline
                                        className={classes.textField}
                                        margin="normal"
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </ExpansionPanelDetails>
                    <Button variant="contained" color="primary" className={classes.button} style={{marginLeft:'30px', marginBottom:'20px'}}>
                        SAVE
                    </Button>
                </ExpansionPanel>
            </div>
        );
    }
}

MySetting.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MySetting);
