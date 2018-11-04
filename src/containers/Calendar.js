import React from 'react';
import { Query } from 'react-apollo';
import { GET_CALENDAR } from 'queries';
import CalendarContent from 'components/CalendarContent';

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

        return <CalendarContent days={days} />;
      }}
    </Query>
  );
};

export default Calendar;
