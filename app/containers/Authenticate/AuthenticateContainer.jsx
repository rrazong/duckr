import React from 'react';
import { Authenticate } from '../../components';
import auth from '../../helpers/auth';

class AuthenticateContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      isFetching: false,
    };

    this.handleAuth = this.handleAuth.bind(this);
  }

  handleAuth() {
    this.setState({
      isFetching: true,
    });

    auth()
      .then((user) => {
        this.setState({
          error: '',
          isFetching: false,
        });
      })
      .catch((error) => {
        this.setState({
          error: error.message,
          isFetching: false,
        });
      });
  }

  render() {
    const { error, isFetching } = this.state;

    return (
      <div>
        <Authenticate
          error={error}
          isFetching={isFetching}
          onAuth={this.handleAuth}
        />
      </div>
    );
  }
}

export default AuthenticateContainer;
