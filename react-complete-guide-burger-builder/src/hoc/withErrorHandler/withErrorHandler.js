import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxilliary';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }

    // what is the proper way to call setState from async ops in the constructor?
    // define a private setState func for these interceptors and resolve it to the normal setState after component mounts?

    // #setStateInitial = (stateObj) => {
    //   this.state = stateObj;
    // };
    //
    // constructor(props) {
    //   super(props);
    //
    //   this.state = {
    //     error: null
    //   };
    //
    //   axios.interceptors.request.use(req => {
    //     console.log("interceptor request");
    //     this.#setStateInitial({ error: null });
    //     return req;
    //   });
    //
    //   axios.interceptors.response.use(res => res, error => {
    //     console.log("interceptor response");
    //     this.#setStateInitial({
    //       error: error
    //     });
    //   });
    // }
    //
    // componentDidMount() {
    //   console.log("component did mount");
    //   this.#setStateInitial = this.setState;
    // }

    componentWillMount() {
      this.requestInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });

      this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({
          error: error
        });
      });
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({error: null});
    }

    render () {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props}/>
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
