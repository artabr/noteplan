import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/urql';
import { GET_ALL_PLANS } from '../graphql/queries';
import { PlanEntityResponseCollection } from '../graphql/types';
import { createClient } from '@urql/core';

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
