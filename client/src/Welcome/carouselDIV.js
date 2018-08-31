import React, { Component } from 'react';
import {
	Carousel,
	CarouselItem,
	CarouselControl,
	CarouselIndicators,
	CarouselCaption,
} from 'reactstrap';
import imageOne from '../Img/Banner1.png';
import imageTwo from '../Img/Banner2.png';
import imageThree from '../Img/Banner3.png';

const items = [
	{
		id: 1,
		src: imageOne,
		altText: ' ',
		caption: ' ',
	},
	{
		id: 2,
		src: imageTwo,
		altText: ' ',
		caption: ' ',
	},
	{
		id: 3,
		src: imageThree,
		altText: ' ',
		caption: ' ',
	},
];

class CarouselDIV extends Component {
	constructor(props) {
		super(props);
		this.state = { activeIndex: 0 };
		this.next = this.next.bind(this);
		this.previous = this.previous.bind(this);
		this.goToIndex = this.goToIndex.bind(this);
		this.onExiting = this.onExiting.bind(this);
		this.onExited = this.onExited.bind(this);
	}

	onExiting() {
		this.animating = true;
	}

	onExited() {
		this.animating = false;
	}

	next() {
		if (this.animating) return;
		const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
		this.setState({ activeIndex: nextIndex });
	}

	previous() {
		if (this.animating) return;
		const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
		this.setState({ activeIndex: nextIndex });
	}

	goToIndex(newIndex) {
		if (this.animating) return;
		this.setState({ activeIndex: newIndex });
	}

	render() {
		const { activeIndex } = this.state;

		const slides = items.map(item => (
			<CarouselItem
				className="custom-tag"
				tag="div"
				key={item.id}
				onExiting={this.onExiting}
				onExited={this.onExited}
			>
				<img style={{ height: '100%', width: '100%' }} src={item.src} alt={item.altText}/>
				<CarouselCaption className="text-danger" captionText={item.caption} captionHeader={item.caption} />
			</CarouselItem>
		));

		return (
			<Carousel
				activeIndex={activeIndex}
				next={this.next}
				previous={this.previous}
			>
				<CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
				{slides}
				<CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
				<CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
			</Carousel>
		);
	}
}

export default CarouselDIV;
