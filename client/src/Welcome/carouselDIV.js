import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
	{
		label: 'best-book-of-2018',
		imgPath:
			'/image/Banner1.png',
	},
	{
		label: 'life-books',
		imgPath:
			'/image/Banner2.png',
	},
	{
		label: 'the-best-book-i-have-ever-read-in-2018',
		imgPath:
			'/image/Banner3.png',
	},
];

const styles = theme => ({
	root: {
		width: '100%',
		flexGrow: 1,
		position: 'relative',
	},
	header: {
		display: 'flex',
		alignItems: 'center',
		height: 50,
		paddingLeft: theme.spacing.unit * 4,
		backgroundColor: theme.palette.background.default,
	},
	img: {
		height: 255,
		display: 'block',
		width: '100%',
		overflow: 'hidden',
	},
	mobileStepper: {
		position: 'absolute',
		top: '0px',
		height: '100%',
		zIndex: '11',
		width: '100%',
		background: 'transparent',
	},
	dots: {
		height: '100%',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'flex-end',
	},
	dot: {
		backgroundColor: 'white',
	},
});

class SwipeableTextMobileStepper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeStep: 0,
		};
		this.handleNext = this.handleNext.bind(this);
		this.handleBack = this.handleBack.bind(this);
		this.handleStepChange = this.handleStepChange.bind(this);
	}


	handleNext() {
		this.setState(prevState => ({
			activeStep: prevState.activeStep + 1,
		}));
	}

	handleBack() {
		this.setState(prevState => ({
			activeStep: prevState.activeStep - 1,
		}));
	}

	handleStepChange(activeStep) {
		this.setState({ activeStep });
	}

	render() {
		const { classes, theme } = this.props;
		const { activeStep } = this.state;
		const maxSteps = tutorialSteps.length;

		return (
			<div className={classes.root}>
				<AutoPlaySwipeableViews
					axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
					index={activeStep}
					onChangeIndex={this.handleStepChange}
					enableMouseEvents
				>
					{tutorialSteps.map((step, index) => (
						<div key={step.label}>
							{Math.abs(activeStep - index) <= 2 ? (
								<img className={classes.img} src={step.imgPath} alt={step.label} />
							) : null}
						</div>
					))}
				</AutoPlaySwipeableViews>
				<MobileStepper
					steps={maxSteps}
					position="static"
					activeStep={activeStep}
					className={classes.mobileStepper}
					classes={{
						dots: classes.dots,
						dot: classes.dot,
					}}
					variant="dots"
					nextButton={
						<Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
							{theme.direction === 'rtl' ? <KeyboardArrowLeft style={{ color: 'white' }} /> : <KeyboardArrowRight style={{ color: 'white' }} />}
						</Button>
					}
					backButton={
						<Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
							{theme.direction === 'rtl' ? <KeyboardArrowRight style={{ color: 'white' }} /> : <KeyboardArrowLeft style={{ color: 'white' }} />}
						</Button>
					}
				/>
			</div>
		);
	}
}

SwipeableTextMobileStepper.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SwipeableTextMobileStepper);
