import React, { Component } from 'react';
import axios from '../../../axios';

import './FullPost.css';

class FullPost extends Component {
  state = {
    loadedPost: null
  };

  loadData () {
    const postId = this.props.match.params.id;
    if (postId) {
        if (!this.state.loadedPost ||
          parseInt(postId) !== this.state.loadedPost.id) {

          axios.get('/posts/' + postId)
            .then((response) => {
              this.setState({
                loadedPost: response.data
              });
            });
        }
    }
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate() {
    this.loadData();
  }

  deletePostHandler = () => {
    axios.delete('/posts/' + this.props.match.params.id)
      .then((response) => {
        console.log(response);
      });
  }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;

        if (this.props.match.params.id) {
          post = <p style={{textAlign: 'center'}}>Loading</p>;
        }

        if (this.state.loadedPost) {
          post = (
              <div className="FullPost">
                  <h1>{this.state.loadedPost.title}</h1>
                  <p>{this.state.loadedPost.body}</p>
                  <div className="Edit">
                      <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                  </div>
              </div>
          );
        }

        return post;
    }
}

export default FullPost;
