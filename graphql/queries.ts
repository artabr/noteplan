import { gql } from '@urql/core';

export const GET_ALL_PLANS = gql`
  query GetAllPlans {
    plans {
      data {
        id
        attributes {
          title
          planImage {
            data {
              id
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;
