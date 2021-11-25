import { gql } from "graphql-tag";

export const LOGIN_MUTATION = gql`
   mutation Login($name: String!, $password: String!) {
    loginXmas(name: $name, password: $password) {
      errors {
        field
        message
      }
      user {
        name
        gift {
          name
        }
      }
    }
  }
`;