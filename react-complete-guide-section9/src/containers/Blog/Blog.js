import React, { Component, Suspense } from 'react';
// import axios from 'axios';

import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts';

//import NewPost from './NewPost/NewPost';

import asyncComponent from '../../hoc/asyncComponent';

import axios from '../../axios';

// const NewPost = React.lazy(() => {
//   return import("./NewPost/NewPost");
// });

const AsyncNewPost = asyncComponent(() => {
  return import("./NewPost/NewPost");
});

class Blog extends Component {
  state = {
    auth: true
  }

    render () {
        return (
            <div>
                <header className="Blog">
                  <nav>
                    <ul>
                      <li><NavLink
                        to="/posts/"
                        exact
                        activeClassName="active">Home</NavLink></li>
                      <li><NavLink to={{
                        pathname: '/new-post',
                        hash: "#submit",
                        search: '?quick-submit=true'
                      }}>New Post</NavLink></li>
                    </ul>
                  </nav>
                </header>
                <Switch>
                  {
                    this.state.auth ?
                      (<Route path="/new-post" component={AsyncNewPost}/>) :
                      null
                  }
                  <Route path="/posts" component={Posts} />
                  <Route render={() => <h1>Not found</h1>} />
                  {/*<Redirect from="/" to="/posts" />*/}
                </Switch>
            </div>
        );
    }
}

export default Blog;
