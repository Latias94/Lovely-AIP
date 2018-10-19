import React, { Component } from 'react';
import StarEmpty from '@material-ui/icons/StarBorderRounded';
import StarHalfIcon from '@material-ui/icons/StarHalfRounded';
import StarFullIcon from '@material-ui/icons/StarRounded';

const style = size => ({
	color: '#fdd835',
	fontSize: size,
});

export default class rateStar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentStar: 3.11,
			maxStar: 5,
			hoverStar: 3.4,
			size: 20,
		};
		this.selectStar = this.selectStar.bind(this);
		this.setStar = this.setStar.bind(this);
	}

	componentDidMount() {
		this.selectStar(this.props.value);
		!!this.props.size && this.setState({ size: this.props.size });
	}

	setStar() {
		this.setState({ currentStar: this.state.hoverStar });
	}

	selectStar(input) {
		this.setState({ currentStar: input, hoverStar: input });
	}

	render() {
		return (
			this.props.onlyShow
				? (<div onMouseLeave={() => this.setStar()} style={{ width: 'fit-content', display: 'inline' }} >
					{[...Array(this.state.maxStar)].map((v, k) => {
						if (k + 1 <= this.state.currentStar) {
							return (
								<StarFullIcon style={style(this.state.size)} key={k} />
							);
						} if (k + 1 - this.state.currentStar > 0 && k + 1 - this.state.currentStar < 1) {
							return (
								<StarHalfIcon style={style(this.state.size)} key={k}/>
							);
						}
						return (
							<StarEmpty style={style(this.state.size)} key={k} />
						);
					})}
				</div>)
				: (<div onMouseLeave={() => this.setStar()} style={{ width: 'fit-content' }} >
					{[...Array(this.state.maxStar)].map((v, k) => {
						if (k + 1 <= this.state.currentStar) {
							return (
								<StarFullIcon onMouseOver={() => { this.setState({ currentStar: k + 1 }); }} onClick={() => { this.selectStar(k + 1); }} style={{ color: '#fdd835' }} key={k} />
							);
						} if (k + 1 - this.state.currentStar > 0 && k + 1 - this.state.currentStar < 1) {
							return (
								<StarHalfIcon onMouseOver={() => { this.setState({ currentStar: k + 1 }); }} onClick={() => { this.selectStar(k + 1); }} style={{ color: '#fdd835' }} key={k}/>
							);
						}
						return (
							<StarEmpty onMouseOver={() => { this.setState({ currentStar: k + 1 }); }} onClick={() => { this.selectStar(k + 1); }} style={{ color: '#fdd835' }} key={k} />
						);
					})}
				</div>)
		);
	}
}
