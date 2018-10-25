import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { CREATE_ADMIN, GET_USER_CALENDAR } from 'queries';

class App extends React.Component {
  state = {
    email: '',
  };

  render() {
    const { email } = this.state;

    return (
      <>
        <Mutation
          mutation={CREATE_ADMIN}
          variables={{ email }}
          onCompleted={data => console.log(data)}
        >
          {(createAdmin, { data }) => (
            <>
              <input
                value={email}
                onChange={e => this.setState({ email: e.target.value })}
              />
              <button type="submit" onClick={createAdmin}>
                Add Todo
              </button>
            </>
          )}
        </Mutation>

        <Query query={GET_USER_CALENDAR}>
          {({ loading, error, data }) => {
            if (loading) {
              return <div>Loading...</div>;
            }

            if (error) {
              return <div>Error</div>;
            }

            return <pre>{JSON.stringify(data, null, 2)}</pre>;
          }}
        </Query>
      </>
    );
  }
}

export default App;
