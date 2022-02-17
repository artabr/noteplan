import { atom } from 'jotai';

import { PlanMarkerData } from '../components/types';

import { planMarkers } from '../config/mockData';

export const markersAtom = atom<PlanMarkerData[]>(planMarkers);
