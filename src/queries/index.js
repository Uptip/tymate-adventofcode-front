import { gql } from 'apollo-boost';

export const CREATE_ADMIN = gql`
  mutation CreateAdmin($input: CreateAdminInput!) {
    createAdmin(input: $input) {
      user {
        id
      }
    }
  }
`;

export const GET_USER_CALENDAR = gql`
  query UserCalendar($token: String!) {
    admin(token: $token) {
      days {
        id
        number
        contentType
        description
        displayName
        link
      }
      calendar {
        id
        displayName
        slug
      }
    }
  }
`;

export const UPDATE_CALENDAR = gql`
  mutation UpdateUserCalendar($updateCalendar: UpdateCalendarInput!) {
    updateCalendar(input: $updateCalendar) {
      calendar {
        id
      }
    }
  }
`;

export const UPDATE_DAY = gql`
  mutation UpdateDay($updateDay: UpdateDayInput!) {
    updateDay(input: $updateDay) {
      day {
        link
        id
      }
    }
  }
`;

export const GET_CALENDAR = gql`
  query Calendar($slug: String!) {
    calendar(slug: $slug) {
      id
      slug
      displayName
      days {
        id
        number
        contentType
        description
        displayName
        link
      }
    }
  }
`;

export const CREATE_CALENDAR = gql`
  mutation CreateCalendar($input: CreateCalendarInput!) {
    createCalendar(input: $input) {
      calendar {
        id
        displayName
        days {
          id
          number
          contentType
          description
          displayName
          link
        }
      }
    }
  }
`;
