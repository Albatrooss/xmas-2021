import { gql } from "graphql-tag";

export const ME_QUERY = gql`
  query Me {
    meXmas {
      name
      gift {
        name
      }
    }
  }
`;