import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Query } from 'react-apollo';
import { Route } from 'react-router-dom';
import { GET_USER_CALENDAR } from 'queries';
import { history } from '../';
import { Link } from 'react-router-dom';
import DayForm from './DayForm';
import find from 'lodash/find';
import { Modal, ModalCloseButton, ModalOverlay, media, Button } from 'ui';
import { MdClose } from 'react-icons/md';

const Content = styled.div`
  padding: 1em;

  ${media.tablet`padding: 2em;`};
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
  flex: 0 0 25%;
  padding-left: 1rem;
  padding-top: 1rem;
  box-sizing: border-box;

  ${media.tablet`
    flex: 0 0 16.666%;
  `};

  ${media.desktop`
    flex: 0 0 12.5%;
  `};
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

  ${props =>
    props.isFilled &&
    css`
      background-color: #262e47
      color: #9396a3
    `};
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
                Ajoutez un lien, une image ou une vidéo à chaque jour du
                calendrier ci-dessous. Si vous n’avez rien à ajouter, seul une
                animation apparaîtra au clic.
                <Days>
                  {data.admin.days.map(day => (
                    <Day key={day.id}>
                      <DayContent
                        to={`/admin/jours/${day.id}`}
                        isFilled={isFilled(day)}
                      >
                        <DayNumber>{day.number}</DayNumber>
                      </DayContent>
                    </Day>
                  ))}
                </Days>
              </Content>

              <Route
                path="/admin/jours/:dayId"
                render={({ match }) => {
                  const { dayId } = match.params;
                  const day = find(data.admin.days, ({ id }) => id === dayId);

                  return (
                    <>
                      <Modal
                        open
                        style={{ marginTop: 50, padding: '100px 50px' }}
                      >
                        <ModalCloseButton style={{ fontSize: 32 }} to="/admin">
                          <MdClose />
                        </ModalCloseButton>

                        <DayContent
                          key={day.id}
                          as="div"
                          style={{
                            position: 'absolute',
                            top: -50,
                            width: 100,
                            paddingTop: 100,
                          }}
                        >
                          <DayNumber>{day.number}</DayNumber>
                        </DayContent>

                        <DayForm
                          day={find(data.admin.days, ({ id }) => id === dayId)}
                        />
                      </Modal>
                      <ModalOverlay to="/admin" />
                    </>
                  );
                }}
              />
            </>
          );
        }}
      </Query>
    </>
  );
};

export default Admin;
