import React, { Component } from 'react';
import ContentComponent from './component';
import { selectBookNumberAction } from './actions';
import { connect } from 'react-redux';



class BooksPage extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        const { booknumber, onbookNumberChange } = this.props;
        return (
            <ContentComponent
                id={this.props.match.params.id}
                categaryName={this.props.match.params.id}
                bookName='Book1'
                bookImagePath='#'
                bookAuthor="me"
                bookRate={3}
                bookReviews={100}
                description="This is the description of book"
                bookPrice={100}
                bookSelectNumber={booknumber}
                onbookNumberChange={onbookNumberChange}
                stockNumber={0}
            />
        )
    }
}



// const BooksPage = ({ match }) => {
//     return (
//         <ContentComponent
//             id={match.params.id}
//             categaryName='PopularBook'
//             bookName='Book1'
//             bookImagePath='#'
//             bookAuthor="me"
//             bookRate={3}
//             bookReviews={100}
//             description="ssssssssss"
//             bookPrice={100}
//             bookSelectNumber={booknumber}
//             onbookNumberChange={onbookNumberChange}
//         />
//     )
// }

function mapStateToProps(state) {
    return {
        booknumber: state.bookNumber,
    }
  }

function mapDispatchToProps(dispatch) {
    return {
        onbookNumberChange: (number) => {dispatch(selectBookNumberAction(number))},
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(BooksPage);