import React from 'react';


class PageNotFound extends React.Component {
    render(){
        return(
            <div>
                <h1 style={{color:'gray', fontSize:'80px', textAlign: 'center'}}>
                    <p>Oops ^~^</p> <p>The page can not be found.</p>
                    <p 
                    style={{
                        color: 'black', 
                        fontSize: '50px', 
                        cursor:'pointer', 
                        textDecoration: 'underline'}}>
                        <a href="/">To home page</a
                        ></p>
                </h1>
            </div>

        );
    }
}

export default PageNotFound
