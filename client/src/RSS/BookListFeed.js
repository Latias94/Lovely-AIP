import React from 'react';
import Axios from 'axios';
import ReactDOM from 'react-dom';

class BookListFeed extends React.PureComponent {
    componentDidMount() {
        Axios.get('/feed/booklists')
            .then(res => {
                ReactDOM.render(
                    res.data,
                    document.getElementById('root')
                );
            })
    }

    render() {
        return <div></div>
    }
}

export default BookListFeed;
