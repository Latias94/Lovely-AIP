import React from 'react';
import './payment.css'
import DetailConfirm from './detailConfirm';
import DeliveryInfor from './deliveryInfor';
import PaymentSelect from './paymentSelect';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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
    backButton: {
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
    return ['Detail Confirmation', 'Delivery Information', 'Payment Select'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return (<DetailConfirm/>);
        case 1:
            return (<DeliveryInfor/>);
        case 2:
            return (<PaymentSelect/>);
        default:
            return 'Unknown step';
    }
}

class Payment extends React.Component {
    state = {
        activeStep: 0,
        completed: new Set(),
        skipped: new Set(),
    };

    totalSteps = () => {
        return getSteps().length;
    };

    isStepOptional = step => {
        return step === 1;
    };

    handleNext = () => {
        let activeStep;

        if (this.isLastStep() && !this.allStepsCompleted()) {
            // It's the last step, but not all steps have been completed
            // find the first step that has been completed
            const steps = getSteps();
            activeStep = steps.findIndex((step, i) => !this.state.completed.has(i));
        } else {
            activeStep = this.state.activeStep + 1;
        }
        this.setState({
            activeStep,
        });
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    handleStep = step => () => {
        this.setState({
            activeStep: step,
        });
    };

    handleComplete = () => {
        // eslint-disable-next-line react/no-access-state-in-setstate
        const completed = new Set(this.state.completed);
        completed.add(this.state.activeStep);
        this.setState({
            completed,
        });

        /**
         * Sigh... it would be much nicer to replace the following if conditional with
         * `if (!this.allStepsComplete())` however state is not set when we do this,
         * thus we have to resort to not being very DRY.
         */
        if (completed.size !== this.totalSteps() - this.skippedSteps()) {
            this.handleNext();
        }
    };

    skippedSteps() {
        return this.state.skipped.size;
    }

    isStepSkipped(step) {
        return this.state.skipped.has(step);
    }

    isStepComplete(step) {
        return this.state.completed.has(step);
    }

    completedSteps() {
        return this.state.completed.size;
    }

    allStepsCompleted() {
        return this.completedSteps() === this.totalSteps() - this.skippedSteps();
    }

    isLastStep() {
        return this.state.activeStep === this.totalSteps() - 1;
    }

    render() {
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;

        return (
            <div className={classes.root}>
                <Stepper alternativeLabel nonLinear activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const props = {};
                        const buttonProps = {};
                        if (this.isStepOptional(index)) {
                            buttonProps.optional = <Typography variant="caption">Optional</Typography>;
                        }
                        if (this.isStepSkipped(index)) {
                            props.completed = false;
                        }
                        return (
                            <Step key={label} {...props}>
                                <StepButton
                                    onClick={this.handleStep(index)}
                                    completed={this.isStepComplete(index)}
                                    {...buttonProps}
                                >
                                    {label}
                                </StepButton>
                            </Step>
                        );
                    })}
                </Stepper>
                <div>
                    {this.allStepsCompleted() ? (
                        <div style={{paddingLeft:'40%'}}>
                            <Typography className={classes.instructions}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.media}
                                        image="http://localhost:3000/image/success.png"
                                        title="Success"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="headline" component="h2">
                                            Success
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary" href={"/account"}>
                                            Back to Account
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Typography>
                        </div>
                    ) : (
                        <div>
                            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                            <div>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={this.handleBack}
                                    className={classes.button}
                                >
                                    Back
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleNext}
                                    className={classes.button}
                                >
                                    Next
                                </Button>
                                {this.isStepOptional(activeStep) &&
                                !this.state.completed.has(this.state.activeStep)}
                                {activeStep !== steps.length &&
                                (this.state.completed.has(this.state.activeStep) ? (
                                    <Typography variant="caption" className={classes.completed}>
                                        Step {activeStep + 1} already completed
                                    </Typography>
                                ) : (
                                    <Button variant="contained" color="primary" onClick={this.handleComplete}>
                                        {this.completedSteps() === this.totalSteps() - 1 ? 'Finish' :'Complete Step'}
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