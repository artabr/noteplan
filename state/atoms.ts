import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/urql';
import { GET_ALL_PLANS, GET_MARKERS_BY_PLAN_ID } from '../graphql/queries';
import {
  PlanEntityResponseCollection,
  MarkerRelationResponseCollection,
} from '../graphql/types';
import { createClient } from '@urql/core';
import { MarkerEntity } from '../graphql/types';

const client = createClient({
  url: 'http://0018-77-222-120-243.ngrok.io/graphql',
});

import { PlanMarkerData } from '../components/types';

import { planMarkers } from '../config/mockData';

export const markersAtom = atom<PlanMarkerData[]>(planMarkers);

export const getAllPlansAtom = atomWithQuery<
  {
    plans: PlanEntityResponseCollection;
  },
  {}
>(
  () => ({
    query: GET_ALL_PLANS,
  }),
  () => client
);

export const getMarkersByPlanID = atomWithQuery<
  {
    markers: MarkerRelationResponseCollection;
  },
  {}
>(
  () => ({
    query: GET_MARKERS_BY_PLAN_ID,
    variables: { id: '1' },
  }),
  () => client
);

export const markersByPlanIDAtom = atom<PlanMarkerData[]>((get) =>
  get(getMarkersByPlanID).data.markers.data.map(
    ({ attributes, id }: MarkerEntity) => {
      return {
        id: id,
        markerX: attributes?.x,
        markerY: attributes?.y,
      };
    }
  )
);
