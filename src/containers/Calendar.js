import React from 'react';
import { Query } from 'react-apollo';
import { GET_CALENDAR } from 'queries';
import CalendarContent from 'components/CalendarContent';
import Day from 'components/Day';
import find from 'lodash/find';

const Calendar = ({ match }) => {
  const slug = match.params.slug || 'tymate';

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
