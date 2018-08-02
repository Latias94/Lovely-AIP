import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { UncontrolledCarousel } from 'reactstrap';
import * as style from './welcomePageCss';
import CarouselDIV from './carouselDIV';
import PopularBooks from './popularBooks';

export default () => {
    return (
        <div style={{height:'auto', width:'80%', marginLeft:'10%', marginTop:'10px'}}>
            <CarouselDIV/>
            <PopularBooks/>
        </div>
    )
}