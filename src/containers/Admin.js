import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import { Route } from 'react-router-dom';
import { GET_USER_CALENDAR } from 'queries';
import { history } from '../';
import { Link } from 'react-router-dom';
import DayForm from './DayForm';
import find from 'lodash/find';

const Content = styled.div`
  padding: 3em;
  background: #fff;
  max-width: 45em;
  margin-left: auto;
  margin-right: auto;
`;

const Days = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding-left: 0;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: -1rem;
  margin-top: -1rem;
`;

const Day = styled.li`
  flex: 0 0 12.5%;
  padding-left: 1rem;
  padding-top: 1rem;
  box-sizing: border-box;
`;

const DayContent = styled(Link)`
  display: block;
  color: inherit;
  text-decoration: none;
  background-color: #fff;
  position: relative;
  padding-top: 100%;
  border-radius: 16px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.6);
`;

const DayNumber = styled.h2`
  margin: 0;
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
`;

const isFilled = ({ contentType, description, image, link }) =>
  Boolean(contentType) ||
  Boolean(description) ||
  Boolean(image) ||
  Boolean(link);

const Admin = ({ match }) => {
  const [userToken, setUserToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const { token } = match.params;

    if (!token) {
      return;
    }

    setUserToken(token);
    localStorage.setItem('token', token);
    history.push('/admin');
  }, []);

  return (
    <>
      <Query query={GET_USER_CALENDAR} variables={{ token: userToken }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <div>Loading…</div>;
          }

          if (error) {
            return <div>Error</div>;
          }

          return (
            <>
              <Content>
                <Days>
                  {data.admin.days.map(day => (
                    <Day key={day.id} isFilled={isFilled(day)}>
                      <DayContent to={`/admin/jours/${day.id}`}>
                        <DayNumber>{day.number}</DayNumber>
                      </DayContent>
                    </Day>
                  ))}
                </Days>
              </Content>
              {console.log(data.admin.days)}
              <Route
                path="/admin/jours/:dayId"
                render={dayProps => (
                  <DayForm
                    day={find(
                      data.admin.days,
                      ({ id }) => id === dayProps.match.params.dayId,
                    )}
                  />
                )}
              />
            </>
          );
        }}
      </Query>

      {/* <Mutation
        mutation={CREATE_ADMIN}
        variables={{ input: { email, newsletter: false } }}
        onCompleted={({ createAdmin }) => console.log(createAdmin)}
        onError={e => console.error(e)}
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
      </Mutation> */}
    </>
  );
};

export default Admin;
