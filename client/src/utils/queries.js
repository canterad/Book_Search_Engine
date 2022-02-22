import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    _id
    username
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: ID!) {
    singleUser(userId: $userId) {
      _id
      username
      savedBooks {
        bookId    
        title
      }
    }
  }
`;







