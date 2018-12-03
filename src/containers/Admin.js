import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Query, Mutation } from 'react-apollo';
import { Route, Redirect } from 'react-router-dom';
import { GET_USER_CALENDAR, CREATE_CALENDAR } from 'queries';
import { history } from '../';
import { Link } from 'react-router-dom';
import DayForm from './DayForm';
import { find, get } from 'lodash';
import {
  Modal,
  ModalCloseButton,
  ModalOverlay,
  media,
  Button,
  Title,
  Kicker,
  Buttons,
  Input,
  FieldError,
} from 'ui';
import { MdClose, MdEdit } from 'react-icons/md';

const Content = styled.div`
  padding: 1em;
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

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
  flex: 0 0 33.333%;
  padding-left: 1rem;
  padding-top: 1rem;
  box-sizing: border-box;

  ${media.phablet`
    flex: 0 0 25%;
  `};

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
  color: #b31244;
  font-family: 'Abril Fatface', cursive;
  font-size: 1.414rem;

  ${props =>
    props.isFilled &&
    css`
      background-color: #262e47;
      color: #9396a3;
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

const Icon = styled.span`
  font-size: 1.414rem;
  position: absolute;
  top: 6px;
  left: 6px;
`;

const Admin = ({ match }) => {
  const [userToken, setUserToken] = useState(localStorage.getItem('token'));
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    const { token } = match.params;

    if (!token) {
      return;
    }

    setUserToken(token);
    localStorage.setItem('token', token);
    history.push('/mon-calendrier');
  }, []);

  if (!localStorage.getItem('token') && !match.params.token) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Query query={GET_USER_CALENDAR} variables={{ token: userToken }}>
        {({ loading, error, data, refetch }) => {
          if (loading) {
            return <div>Loading…</div>;
          }

          if (error) {
            return (
              <Mutation
                mutation={CREATE_CALENDAR}
                variables={{
                  input: { userToken, displayName },
                }}
              >
                {(createCalendar, { data, loading, error }) => {
                  if (data) {
                    refetch();
                    return <div />;
                  }

                  return (
                    <Modal open>
                      <div>
                        <Title>Création de votre calendrier</Title>
                        <Kicker>
                          Pour commencer la création de votre calendrier,
                          commencez par lui donner un nom.
                        </Kicker>

                        <form
                          onSubmit={e => {
                            e.preventDefault();
                            createCalendar();
                          }}
                        >
                          <Input
                            hasError={get(error, 'message', '')}
                            value={displayName}
                            onChange={e => setDisplayName(e.target.value)}
                          />

                          {get(error, 'message', '').indexOf(
                            "Slug n'est pas disponible",
                          ) > -1 && (
                            <FieldError>
                              Ce nom de calendrier est déjà pris
                            </FieldError>
                          )}

                          <Buttons>
                            <Button variant="primary">Suivant</Button>
                          </Buttons>
                        </form>
                      </div>
                    </Modal>
                  );
                }}
              </Mutation>
            );
          }

          return (
            <>
              <Content>
                <div style={{ color: '#fff' }}>
                  <Title>Mon calendrier</Title>
                  <Kicker>
                    Ajoutez un lien, une image ou une vidéo à chaque jour du
                    calendrier ci-dessous. Si vous n’avez rien à ajouter, seul
                    une animation apparaîtra au clic.
                  </Kicker>
                </div>

                <Days>
                  {data.admin.days.map(day => (
                    <Day key={day.id}>
                      <DayContent
                        to={`/mon-calendrier/jours/${day.id}`}
                        isFilled={isFilled(day)}
                      >
                        {isFilled(day) && (
                          <Icon>
                            <MdEdit />
                          </Icon>
                        )}

                        <DayNumber>{day.number}</DayNumber>
                      </DayContent>
                    </Day>
                  ))}
                </Days>

                {data.admin.calendar.slug && (
                  <Buttons>
                    <Button
                      variant="primary"
                      to={`/${data.admin.calendar.slug}`}
                    >
                      Voir votre calendrier
                    </Button>
                  </Buttons>
                )}
              </Content>

              <Route
                path="/mon-calendrier/jours/:dayId"
                render={({ match }) => {
                  const { dayId } = match.params;
                  const day = find(data.admin.days, ({ id }) => id === dayId);

                  return (
                    <>
                      <Modal open style={{ paddingTop: 150 }}>
                        <ModalCloseButton
                          style={{ fontSize: 32 }}
                          to="/mon-calendrier"
                        >
                          <MdClose />
                        </ModalCloseButton>

                        <DayContent
                          key={day.id}
                          as="div"
                          style={{
                            position: 'absolute',
                            top: 32,
                            width: 100,
                            paddingTop: 100,
                          }}
                        >
                          <DayNumber>{day.number}</DayNumber>
                        </DayContent>

                        <DayForm
                          day={find(data.admin.days, ({ id }) => id === dayId)}
                          onSuccess={refetch}
                        />
                      </Modal>
                      <ModalOverlay to="/mon-calendrier" />
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
