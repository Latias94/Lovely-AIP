import React from 'react';
import ContentComponent from './component';

export default ({match}) => {
    return (
        <ContentComponent id={match.params.id}/>
    )
}