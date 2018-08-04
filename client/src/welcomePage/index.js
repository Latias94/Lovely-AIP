import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { UncontrolledCarousel } from 'reactstrap';
import * as style from './welcomePageCss';
import CarouselDIV from './carouselDIV';
import PopularBooks from './popularBooks';

const i = [1, 2, 3, 4, 5];
const m = [1, 2, 3, 4, 5];


export default () => {
    return (
        <div style={{height:'auto', width:'80%', marginLeft:'10%', marginTop:'10px'}}>
            <CarouselDIV/>
            <PopularBooks
                bookList= {i}
                categoriesList= {m} 
            />
        </div>
    )
}