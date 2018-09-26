import React from 'react';
import Axios from 'axios';

class BookListFeed extends React.PureComponent {
    state = {
        feed:''
    };

    componentDidMount() {
        Axios.get('/feed/booklists')
            .then(res => {
                this.setState({
                    feed: res.data
                });
            })
            // .catch(err => (console.log(err)));
    }

    render() {
        return <div>{this.state.feed}</div>
    }
}

export default BookListFeed;
