import React, { Component } from 'react';
import * as style from './welcomePageCss';

const i = [1, 2, 3, 4, 5];
const m = [1, 2, 3, 4, 5];

export default () => {
    return (
        <div style={{ marginTop: '10px', marginBottom: '10px', justifyContent: 'center' }}>
            {m.map(() => (
                <div style={{marginTop:'5px'}}>
                    <h3>Popular Books</h3>
                    <hr/>
                    <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                        {i.map(() => (
                            <div style={style.eachBook}>
                                <div style={{ backgroundColor: 'gray', height: '160px', width: '160px' }}></div>
                                <span>Name</span>
                                <span>Author</span>
                                <span>Rank</span>
                                <span>Price</span>
                            </div>                
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}