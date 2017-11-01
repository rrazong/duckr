import React from 'react';
import { Authenticate } from '../../components';
import auth from '../../helpers/auth';

class AuthenticateContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      isFetching: false,
      user: {},
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
          user,
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
    const { error, isFetching, user } = this.state;

    return (
      <div>
        <Authenticate
          error={error}
          isFetching={isFetching}
          onAuth={this.handleAuth}
        />
        {
          user.uid &&
            <div>
              <p>{user.uid}</p>
              <p>{user.name}</p>
              <p>{user.avatar}</p>
            </div>
        }
      </div>
    );
  }
}

export default AuthenticateContainer;
