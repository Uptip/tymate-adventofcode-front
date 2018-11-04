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
        image
        link
      }
      calendar {
        id
        displayName
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
        image
        id
      }
    }
  }
`;

export const GET_CALENDAR = gql`
  query Calendar($slug: String!) {
    calendar(slug: $slug) {
      id
      days {
        id
        contentType
        displayName
        link
        number
      }
    }
  }
`;

export const FOO = gql`
  query uploads {
    uploads {
      id
      filename
      mimetype
      path
    }
  }
`;
