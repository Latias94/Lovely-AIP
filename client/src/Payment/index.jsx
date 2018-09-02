import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DetailConfirm from './DetailConfirm';
import DeliveryInfo from './DeliveryInfo';
import PaymentSelect from './PaymentSelect';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';


const styles = theme => ({
    root: {
        width: '90%',
    },
    button: {
        marginRight: theme.spacing.unit,
    },
    completed: {
        display: 'inline-block',
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

function getSteps() {
    return ['Product Confirm', 'Delivery Info', 'Payment Select'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return (<DetailConfirm/>);
        case 1:
            return (<DeliveryInfo/>);
        case 2:
            return (<PaymentSelect/>);
        default:
            return 'Unknown step';
    }
}

class Payment extends React.Component {
    state = {
        activeStep: 0,
        completed: {},
    };

    totalSteps = () => {
        return getSteps().length;
    };

    handleNext = () => {
        let activeStep;

        if (this.isLastStep() && !this.allStepsCompleted()) {
            // It's the last step, but not all steps have been completed,
            // find the first step that has been completed
            const steps = getSteps();
            activeStep = steps.findIndex((step, i) => !(i in this.state.completed));
        } else {
            activeStep = this.state.activeStep + 1;
        }
        this.setState({
            activeStep,
        });
    };

    handleBack = () => {
        const { activeStep } = this.state;
        this.setState({
            activeStep: activeStep - 1,
        });
    };

    handleStep = step => () => {
        this.setState({
            activeStep: step,
        });
    };

    handleComplete = () => {
        const { completed } = this.state;
        completed[this.state.activeStep] = true;
        this.setState({
            completed,
        });
        this.handleNext();
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
            completed: {},
        });
    };

    completedSteps() {
        return Object.keys(this.state.completed).length;
    }

    isLastStep() {
        return this.state.activeStep === this.totalSteps() - 1;
    }

    allStepsCompleted() {
        return this.completedSteps() === this.totalSteps();
    }

    render() {
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;

        return (
            <div className={classes.root}>
                <Stepper nonLinear activeStep={activeStep}>
                    {steps.map((label, index) => {
                        return (
                            <Step key={label}>
                                <StepButton
                                    onClick={this.handleStep(index)}
                                    completed={this.state.completed[index]}
                                    style={{outline:'none'}}
                                >
                                    {label}
                                </StepButton>
                            </Step>
                        );
                    })}
                </Stepper>
                <div>
                    {this.allStepsCompleted() ? (
                        <div>
                            <Typography className={classes.instructions}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.media}
                                        image="http://localhost:3000/image/success.png"
                                        title="Success"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="headline" component="h2">
                                            Success!!
                                        </Typography>
                                        <Typography component="p">
                                            The E-mail has been sent to your E-mail.
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary" href={"/account"}>
                                            Back to Account
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Typography>
                            <Button onClick={this.handleReset} style={{outline:'none'}}>Reset</Button>
                        </div>
                    ) : (
                        <div>
                            {getStepContent(activeStep)}
                            <div>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={this.handleBack}
                                    className={classes.button}
                                    style={{outline:'none'}}
                                >
                                    Back
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleNext}
                                    className={classes.button}
                                    style={{outline:'none'}}

                                >
                                    Next
                                </Button>
                                {activeStep !== steps.length &&
                                (this.state.completed[this.state.activeStep] ? (
                                    <Typography variant="caption" className={classes.completed}>
                                        Step {activeStep + 1} already completed
                                    </Typography>
                                ) : (
                                    <Button style={{outline:'none'}} variant="contained" color="primary" onClick={this.handleComplete}>
                                        {this.completedSteps() === this.totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

Payment.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(Payment);
