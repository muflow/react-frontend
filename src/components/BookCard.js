import React from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../lib/apiClient';

import './BookCard.css'
// import book from '../imgs/new-book.png'

class BookCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fav: false
    }
  }

  componentDidMount = async() => {
    try {
      const user = await apiClient.getUsersFavBooksIds();
      console.log(user.favBooks.includes(this.props.book._id))
      if (user.favBooks.includes(this.props.book._id)){
        this.setState({
          fav: true
        })
      };
      console.log(user.favBooks, this.props.book._id)
      console.log(this.state)
    } catch(error){
      console.log(error)
    }
  }

  addToFavs = async (event) => {
    event.preventDefault();
    try {
      const data = await apiClient.addToFavs(this.props.book._id);
      this.setState({
        fav: true
      })
      console.log(data)
      }
      catch (error) {
        console.log(error)
      }  
    }
  
    render() {
    const { title, author, category, imgUrl, _id } = this.props.book;
    return (
      <div className="card-container">
        <div className="book-img-container">
          <img src={imgUrl} alt="new book" />
        </div>
        <div className="book-data">
          <h4><Link to={`/books/${_id}`} style={{ textDecoration: 'none', color: '#000' }}>{title}</Link></h4>
          <p>by {author}</p>
          <p>{category}</p>
          {this.state.fav === false ? <button className="add-favs-btn" onClick={this.addToFavs}>Add to Favorite</button> : <p>Book is on favourite list.</p>}
        </div>
      </div>
    );
  }
}

export default BookCard;