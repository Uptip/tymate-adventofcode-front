import React, { useState } from 'react';
import styled from 'styled-components';
import { Query, Mutation } from 'react-apollo';
import { GET_CALENDAR, CREATE_ADMIN } from 'queries';
import CalendarContent from 'components/CalendarContent';
import Day from 'components/Day';
import { find, get } from 'lodash';
import {
  Modal,
  ModalCloseButton,
  Buttons,
  Button,
  Title,
  Kicker,
  Input,
} from 'ui';
import { MdClose } from 'react-icons/md';
import logo from 'images/logo.svg';

const Logo = styled.img`
  width: 64px;
  height: 64px;
`;

const Calendar = ({ match }) => {
  const slug = match.params.slug || 'tymate';
  const [email, setEmail] = useState('');
  const [modalIsShown, setModalIsShown] = useState(false);
  const [userToken] = useState(localStorage.getItem('token'));

  return (
    <Query query={GET_CALENDAR} variables={{ slug }}>
      {({ loading, error, data }) => {
        if (loading) {
          return <div>Loading...</div>;
        }

        if (error) {
          return <div>Error</div>;
        }

        const { days } = data.calendar;
        const day = find(days, ({ id }) => id === match.params.dayId);
        const calendarRoute = Boolean(match.params.slug)
          ? `/${match.params.slug}`
          : '';

        return (
          <>
            <div
              style={{
                display: 'flex',
                padding: 16,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Logo src={logo} alt="Tymate" />

              {!userToken && (
                <Button variant="primary" onClick={() => setModalIsShown(true)}>
                  Créer mon calendrier
                </Button>
              )}

              {userToken && (
                <Button variant="primary" to="/mon-calendrier">
                  Modifier mon calendrier
                </Button>
              )}
            </div>

            {modalIsShown && (
              <Modal open>
                <ModalCloseButton
                  onClick={() => setModalIsShown(false)}
                  as="button"
                >
                  <MdClose />
                </ModalCloseButton>

                <Mutation
                  mutation={CREATE_ADMIN}
                  variables={{ input: { email, newsletter: true } }}
                  onError={e => console.error(e)}
                >
                  {(createAdmin, { data, loading }) => {
                    if (get(data, 'createAdmin.user.id')) {
                      return (
                        <div>
                          <Title>Invitation envoyée</Title>
                          <Kicker>
                            Pour terminer la création de votre calendrier, merci
                            de cliquer sur le lien que nous vous avons envoyé
                            par email.
                          </Kicker>
                        </div>
                      );
                    }

                    return (
                      <div>
                        <Title>Mon calendrier</Title>

                        <Kicker>
                          Entrez votre email pour recevoir le lien de votre
                          calendrier par email.
                        </Kicker>

                        <form
                          onSubmit={e => {
                            e.preventDefault();
                            createAdmin();
                          }}
                        >
                          <Input
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                          />
                          <Buttons>
                            <Button
                              isLoading={loading}
                              disabled={loading}
                              variant="primary"
                              type="submit"
                            >
                              Enregistrer
                            </Button>
                          </Buttons>
                        </form>
                      </div>
                    );
                  }}
                </Mutation>
              </Modal>
            )}

            {Boolean(match.params.dayId) && (
              <Day day={day} calendarRoute={calendarRoute} />
            )}

            <CalendarContent days={days} calendarRoute={calendarRoute} />
          </>
        );
      }}
    </Query>
  );
};

export default Calendar;
