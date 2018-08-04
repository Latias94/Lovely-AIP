import React, { Component } from 'react';
import * as style from './welcomePageCss';
import { Link } from 'react-router-dom';

const i = [1, 2, 3, 4, 5];
const m = [1, 2, 3, 4, 5];

export default (props) => {
    return (
        <div style={{ marginTop: '10px', marginBottom: '10px', justifyContent: 'center' }}>
            {props.bookList.map((index) => (
                <div key={index} style={{marginTop:'5px'}}>
                    <h3>Popular Books</h3>
                    <hr/>
                    <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                        {props.categoriesList.map((index) => (
                            <Link to={'/book/'+index} key={index} replace><div style={style.eachBook}>
                                <div style={{ backgroundColor: 'gray', height: '160px', width: '160px' }}></div>
                                <span>Name</span>
                                <span>Author</span>
                                <span>Rank</span>
                                <span>Price</span>
                            </div></Link>                
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}