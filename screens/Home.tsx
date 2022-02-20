import React, { Suspense } from 'react';

import { View, Text, Column, Box, useToast } from 'native-base';
import { SelectPlan, PlanView } from '../components';
import { Location, PlanMarkerData } from '../components/types';

import { markersAtom } from '../state/atoms';
import { useAtom } from 'jotai';

const Home = () => {
  const toast = useToast();

  const [planMarkersData, setPlanMarkersData] = useAtom(markersAtom);

  const onLocation = (loc: Location) => {
    const newMarker: PlanMarkerData = {
      markerX: loc.absX,
      markerY: loc.absY,
      id: Date.now().toString(),
    };
    setPlanMarkersData([...planMarkersData, newMarker]);
    toast.show({
      description: `Local location: X - ${loc.locationX}, Y - ${loc.locationY}\nZoom level: ${loc.zoomLevel}\nAbsolute location: X - ${loc.absX}, Y - ${loc.absY}`,
    });
  };

  const isActivePlan = true;
  return (
    <Column flex="1">
      {!isActivePlan && (
        <View flex="1" justifyContent="center" alignItems="center">
          <Text>There are no plans yet.</Text>
        </View>
      )}
      <View flex="1" justifyContent="center" alignItems="center">
        <View flexShrink="1" w="100%" h="100%">
          <Suspense fallback={<Text>Loading...</Text>}>
            <PlanView
              planMarkersData={planMarkersData}
              onLocation={onLocation}
            />
          </Suspense>
        </View>
      </View>
      <Box p="5">
        <Suspense fallback={<Text>Loading...</Text>}>
          <SelectPlan defaultValue="Choose or create a plan" />
        </Suspense>
      </Box>
    </Column>
  );
};

export default Home;
