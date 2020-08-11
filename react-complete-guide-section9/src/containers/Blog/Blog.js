import React, { Component } from 'react';
// import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

import axios from '../../axios';

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    error: false
  }

    componentDidMount() {
      axios.get('/posts')
        .then(response => {
          const posts = response.data.slice(0, 4);
          const updatedPosts = posts.map(post => {
            return {
              ...post,
              author: 'Max'
            }
          });
          this.setState({
            posts: updatedPosts
          });
          // console.log(response);
        })
        .catch((error) => {
          // console.log(error);
          this.setState({
            error: true
          });
        });
    }

    postClicked = (id) => {
      this.setState({
        selectedPostId: id
      });
    }

    render () {
      let posts = <p style={{textAlign: 'center'}}>Something went wrong</p>;

      if (!this.state.error) {
        posts = this.state.posts.map((post, ind) => {
            return <Post clicked={() => this.postClicked(post.id)} author={post.author} key={post.id} title={post.title} />;
        });
      }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;
