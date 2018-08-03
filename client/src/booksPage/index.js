import React from 'react';

export default ({match}) => {
    return (
        <div>
            <h3>ID: {match.params.id}</h3>
        </div>
    )
}