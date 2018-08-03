import React from 'react';
import * as style from './booksPageCss';

export default (props) => {
    return (
        <div style={style.container}>
            <div>
                <ul className="booksClassList">
                    <li>PopularBooks</li>
                    <li>›</li>
                    <li>This Book Name</li>
                </ul>
            </div>
            <h3>ID: {props.id}</h3>
        </div>
    )
}