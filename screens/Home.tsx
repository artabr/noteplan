import React, { useState } from 'react';

import { View, Text, Column, Box, useToast } from 'native-base';
import { SelectPlan, PlanView } from '../components';
import { Location, PlanMarkerData } from '../components/types';

import { planMarkers } from '../config/mockData';

const Home = () => {
  const toast = useToast();
  const [location, setLocation] = useState<Location>({
    locationX: 0,
    locationY: 0,
    zoomLevel: 0,
    absX: 0,
    absY: 0,
  });

  const [planMarkersData, setPlanMarkersData] =
    useState<PlanMarkerData[]>(planMarkers);

  const onLocation = (loc: Location) => {
    toast.show({
      description: `Local location: X - ${loc.locationX}, Y - ${loc.locationY}\nZoom level: ${loc.zoomLevel}\nAbsolute location: X - ${loc.absX}, Y - ${loc.absY}`,
    });
    setLocation(loc);
    const newMarker: PlanMarkerData = {
      markerX: loc.absX,
      markerY: loc.absY,
      id: Date.now(),
    };
    setPlanMarkersData([...planMarkersData, newMarker]);
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
          <PlanView planMarkersData={planMarkersData} onLocation={onLocation} />
        </View>
      </View>
      <Box p="5">
        <SelectPlan defaultValue="Choose or create a plan" />
      </Box>
    </Column>
  );
};

export default Home;
