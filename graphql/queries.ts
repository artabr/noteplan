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

export const GET_MARKERS_BY_PLAN_ID = gql`
  query GetMarkersByPlanID($id: ID!) {
    markers(filters: { plan: { id: { eq: $id } } }) {
      data {
        id
        attributes {
          x
          y
          title
          note
        }
      }
    }
  }
`;
