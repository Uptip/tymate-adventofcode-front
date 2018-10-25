import { gql } from 'apollo-boost';

export const CREATE_ADMIN = gql`
  mutation CreateAdmin($email: String!) {
    createAdmin(input: { email: $email }) {
      user {
        id
        token
      }
    }
  }
`;

export const GET_USER_CALENDAR = gql`
  query GetAdminByToken {
    admin(token: "#bada55") {
      calendar {
        id
      }
    }
  }
`;
