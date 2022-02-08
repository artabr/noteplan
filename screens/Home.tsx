import React, { useState } from 'react';

import { GestureResponderEvent } from 'react-native';
import { View, Text, Column, Box, Image } from 'native-base';
import {
  ReactNativeZoomableView,
  ZoomableViewEvent,
} from '@openspacelabs/react-native-zoomable-view';
import { SelectPlan, PlanMarker } from '../components';

import { planMarkers } from '../config/mockData';

const Home = () => {
  const onSingleTap = (
    event: GestureResponderEvent,
    zoomableViewEventObject: ZoomableViewEvent
  ): void => {
    setLocation({
      x: event.nativeEvent.locationX,
      y: event.nativeEvent.locationY,
    });
  };

  const [location, setLocation] = useState({ x: 0, y: 0 });

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
          <ReactNativeZoomableView
            maxZoom={30}
            onSingleTap={onSingleTap}
            contentWidth={2000}
            contentHeight={1200}
          >
            <Box w="2000px" h="1200px">
              <Box w="2000px" h="1200px">
                {planMarkers.map((planMarker) => {
                  return (
                    <PlanMarker
                      key={planMarker.id}
                      id={planMarker.id}
                      x={planMarker.markerX}
                      y={planMarker.markerY}
                    />
                  );
                })}
              </Box>
              <Image
                w="2000px"
                h="1200px"
                position="absolute"
                zIndex="-1"
                resizeMode="contain"
                alt="The current working plan"
                source={{
                  uri: 'https://i.ibb.co/xqT5726/pixelgrid.png',
                }}
              />
            </Box>
          </ReactNativeZoomableView>
        </View>
      </View>
      <Text>
        X: {location.x} Y: {location.y}
      </Text>
      <Box p="5">
        <SelectPlan defaultValue="Choose or create a plan" />
      </Box>
    </Column>
  );
};

export default Home;
