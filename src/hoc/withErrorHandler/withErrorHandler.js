import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../AuxF/Aux';

const withErrorHandler = (WrapperComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            }); // clear error

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
            });
        }

        componentWillUnmount(){
            // run when compoent is not req. no memory leak
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <Aux>
                    <Modal
                        modalClosed={this.errorConfirmedHandler}
                        show={this.state.error}>

                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrapperComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;