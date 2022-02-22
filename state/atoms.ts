import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/urql';
import { GET_ALL_PLANS, GET_MARKERS_BY_PLAN_ID } from '../graphql/queries';
import {
  PlanEntityResponseCollection,
  MarkerRelationResponseCollection,
  MarkerEntity,
} from '../graphql/types';
import { client } from '../graphql/client';
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
