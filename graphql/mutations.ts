import { gql } from '@urql/core';

export const CREATE_MARKER = gql`
  mutation CreateMarker($x: Float, $y: Float, $plan: ID) {
    createMarker(data: { x: $x, y: $y, plan: $plan }) {
      data {
        id
        attributes {
          x
          y
          plan {
            data {
              id
            }
          }
        }
      }
    }
  }
`;
